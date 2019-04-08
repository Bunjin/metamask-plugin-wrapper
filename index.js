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


    console.log("PROVIDER")
    console.log(this.provider)
    this.getPluginScript = this.getPluginScript.bind(this)


  }

  async startPluginScript() {


    const script = await this.getPluginScript()
    //AGORIC
    
    const s = SES.makeSESRootRealm({consoleMode: 'allow', errorStackMode: 'allow', mathRandomMode: 'allow'});
    // //NOTE: errorStackMode enables confinement breach, do not leave on in production

    
    // TODO:
    // provider should be modified here to impose the parameters for the app keys origin HD path
    // Also, pb when doing 2 sendAsync, because id is undefined? async gets mixed up
    
    // Option 1
    // pass only provider 
    // origin: MetaMask
    // console.log("SES DEBUG  DEBUG", s.evaluate(script, {provider: this.provider}))


    
    // Option 2
    // pass api functions and not provider
    // origin: MetaMask
//    console.log("SES DEBUG  DEBUG", s.evaluate("appKey_eth_getPublicKey('2'), appKey_eth_getAddress('0')"// ,
					       // {appKey_eth_getPublicKey: this.appKey_eth_getPublicKey.bind(this),
					       // 	appKey_eth_getAddress: this.appKey_eth_getAddress.bind(this),
					       // }))



    
    // Option 3
    // pass nothing but force this writing
    // define functions in script using references from wrapper

    // however like that it may be a security pb
    // also make sure this is not the case in other options (that $ can be used)
    // and should be called from wrapper

    // WARNING:
    // How is this not a potential attack vector, even when using the other cases??
    // Plugin dev can call the functions that way ???
    // no because they need to be defined here locally like below?

    // function appKey_eth_getPublicKey(...args){
    //   this.appKey_eth_getPublicKey(args)
    // }

//    const ses_appKey_eth_getPublickKey = s.evaluate(`(${appKey_eth_getPublicKey})`)
    //ses_appKey_eth_getPublickKey.bind(this)(2)
    //ses_appKey_eth_getPublickKey.bind(this)(3)    


    // Option 4
    // same as 3 but define functions in script
    // pass provider
    
    // const ses_appKey_eth_getPublickKey = s.evaluate(
    //   `(function test(){
    //       provider.sendAsync(
    // 	{
    // 	  method: "appKey_eth_getPublicKey",
    // 	  params: "2",
    // 	}, function(err, result){
    // 	  console.log("dummy plugin received answer", err, result)
    // 	  return result
    // 	})
    //   })`, {provider: this.provider})
    
    // ses_appKey_eth_getPublickKey()
    
  }

  
  async getPluginScript() {
    const url = this.plugin.scriptUrl + "interface.js"
    const pluginScript = JSON.parse(await this.getPluginFile(url))


    // try to populate it with the ses functions
    const s = SES.makeSESRootRealm({consoleMode: 'allow', errorStackMode: 'allow', mathRandomMode: 'allow'});

    // option A
    // get function code in JSON itself
    // let scriptFunction = scriptInterface.actions[0].call
    
    // option B, fetch it from a specific file (using path from JSON)
    if (pluginScript.actions.length > 0) {
      for (let k = 0; k < pluginScript.actions.length; k++){
	let scriptFunction = await this.getPluginFile("http://localhost:8001/"+ pluginScript.actions[k].url)


	//modify provider here to include correct origin depending on plugin's parameters and uid
	scriptFunction = s.evaluate( "("+ scriptFunction + ")", {provider: this.provider})
	
	pluginScript.actions[k].call = scriptFunction
      }
    }

    // prepare plugin functions as an api JSON by name
    let pluginFunctions = {}    
    if (pluginScript.actions.length > 0) {
      for (let k = 0; k < pluginScript.actions.length; k++){
	pluginFunctions[pluginScript.actions[k].name] = pluginScript.actions[k].call
      }
    }

    pluginScript.pluginApi = pluginFunctions

    // prepare background script that will be launched in plugin-list and metamask controller
    let scriptBackground = await this.getPluginFile("http://localhost:8001/"+ pluginScript.background.url)    
    pluginScript.background.call = scriptBackground
    // prepare ui script
    let scriptUi = await this.getPluginFile("http://localhost:8001/"+ pluginScript.ui.url)    
    pluginScript.ui.html = scriptUi

    
    return pluginScript
  }

  async getPluginFile(scriptUrl) {
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
  
}

module.exports = PluginWrapper
