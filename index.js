//const PluginRegistrar = require('eth-plugin-registrar')

//const Component = require('react').Component
//const DummyPluginScript = require('./examples/dummy-plugin/index')
//const CfPluginScript = require('./examples/cf-plugin/index')


const SES = require('ses');

class PluginWrapper {

  constructor (opts = {}){
    console.log("PLUGIN WRAPPER OPTS", opts)
    console.log("constructing plugin wrapper for: ", opts.plugin)

    //Currently we only construct a fresh provider as a stream (to pages) but we should factor out the reused parts for passing the API to a module, too: https://github.com/MetaMask/metamask-extension/blob/capabilities-middleware-example/app/scripts/metamask-controller.js#L1483
// app/scripts/metamask-controller.js:1483
//     ```engine.push(createProviderMiddleware({ provider }))```
// MetaMask/metamask-extensionAdded by GitHub

// Dan Finlay   [7 minutes ago]
// There should be a version of this function that takes an origin, and returns a provider, and it could be used within this function: https://github.com/MetaMask/metamask-extension/blob/capabilities-middleware-example/app/scripts/metamask-controller.js#L1459
// app/scripts/metamask-controller.js:1459
//     ```setupProviderConnection (outStream, origin) {```

    this.selectedAccount = opts.userAddress
    this.provider = opts.provider
    this.personaPath = opts.personaPath
    this.plugin = opts.plugin


    // TEMPORARY
    this.plugin.scriptUrl = "http://localhost:8001/bundle-ses.js"

    
    
    // Currently script is loaded here and also in metamask-extension plugin-list.js


    // DEPRECATED
    
    //actually with this api we don't need to pass the provider directly to the plugins
    // or if we do we should restricts so that the plugins can't call directly the api's rpc methods, nor some others

    // With this api provider sendAsync calls will be from origin metamask
    // this.api = {
    //   appKey_eth_getPublicKey: this.appKey_eth_getPublicKey.bind(this),
    //   appKey_eth_getAddress: this.appKey_eth_getAddress.bind(this),
    //   appKey_eth_signTransaction: this.appKey_eth_signTransaction.bind(this),
    //   appKey_eth_signTypedMessage: this.appKey_eth_signTypedMessage.bind(this),
    // }

    // Todo: create a new provider here for the plugin
    // const pluginProvider = this.provider
    // const pluginOptions = {
    // 	provider: pluginProvider,
    // 	personaPath: this.personaPath,
    // 	api: this.api,
    // 	selectedAccount: this.selectedAccount
    // }

    // this.pluginScript = new CfPluginScript(pluginOptions)
    this.getPluginScript = this.getPluginScript.bind(this)

    this.startPluginScript()

    console.log("END CONSTRUCTOR")

    

    // start plugin script background process
    // however for now this seems to run in window only
    //this.pluginScript.mainProcess()

  }

  async startPluginScript() {


    const script = await this.getPluginScript()
    //AGORIC
    
    const s = SES.makeSESRootRealm({consoleMode: 'allow', errorStackMode: 'allow'});
    // //NOTE: errorStackMode enables confinement breach, do not leave on in production
    // console.log("SES DEBUG  DEBUG", s.evaluate('1+2')) // returns 3
    console.log("SES DEBUG  DEBUG", s.evaluate(script, {provider: this.provider})) // returns 3    
    // s.evaluate('1+a', {a: 3}); // returns 4
    // function double(a) {
    //   return a*2;
    // ]
    // const doubler = s.evaluate(`(${double})`);
    // doubler(3);

    // Simple eval
    //eval(script)
    
  }

  
  async getPluginScript() {

    const scriptUrl = this.plugin.scriptUrl
    return new Promise(async function(resolve, reject) {
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", scriptUrl, false);
      xmlhttp.send();
      if (xmlhttp.status==200) {
	result = xmlhttp.responseText;
      }
      return resolve(result)
    })
  }

  appKey_eth_getPublicKey(params){
    console.log("dummy plugin getPublicKey", params)
    const provider = this.provider
    const hdPath = params[0]
    const newParams = hdPath
    const xPub = new Promise(function(resolve, reject) {
      provider.sendAsync(
	{
	  method: "appKey_eth_getPublicKey",
	  params: newParams,
	}, function(err, result){
	  console.log("dummy plugin received answer", err, result)
	  resolve(result)
	}
      )
    })
    return xPub
  }
  
  appKey_eth_getAddress(params){
    console.log("dummy plugin getAddress", params)
    // there is a limit on index values, var HARDENED_OFFSET = 0x80000000
    // for the index derived from the authorAddress we need to find a way to split it
    const hdPath = params[0]
    const newParams = hdPath
    console.log(newParams)
    const provider = this.provider
    const appKeyAddress = new Promise(function(resolve, reject){
      provider.sendAsync(
	{
	  method: "appKey_eth_getAddress",
	  params: newParams,
	}, function(err, result){
	  console.log("dummy plugin received answer getAppKeyAddress", err, result)
	  resolve(result)
	}
      )
    })
    return appKeyAddress
  }

  appKey_eth_signTransaction(params){
    console.log("dummy plugin signTx Appkey", params)
    const from = params[0]
    const to = params[1]
    const value = params[2]
    let txParams = {
      "from": from,
      "to": to,
      "gas": "0x76c0", // 30400
      "gasPrice": "0x9184e72a", 
      "value": value,
      "data": "0x"
    }
    const provider = this.provider
    const signedTx = new Promise(function(resolve, reject) {
      provider.sendAsync(
	{
	  method: "appKey_eth_signTransaction",
	  params: [txParams.from, txParams],
	}, function(err, result){
	  console.log("dummy plugin received answer signTxAppKey", err, result)
	  resolve(result)
	}
      )
    })
    return signedTx
  }


  appKey_eth_signTypedMessage(params){
    console.log("dummy plugin signTypedMessage Appkey", params)
    const from = params[0]
    const message = params[1]
    const provider = this.provider
    const signedTypedMessage = new Promise(function(resolve, reject) {
      provider.sendAsync(
	{
	  method: "appKey_eth_signTypedMessage",
	  params: [from, message],
	}, function(err, result){
	  console.log("dummy plugin received answer eth_signTypedMessage", err, result)
	  resolve(result)
	}
      )
    })
    return signedTypedMessage
  }
  
}

module.exports = PluginWrapper
