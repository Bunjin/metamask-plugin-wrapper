//import test from "./test.js"

function dummyPublicFunction1(){
  provider.sendAsync(
    {
      method: "appKey_eth_getPublicKey",
      params: "2",
    }, function(err, result){
      console.log("dummy plugin received answer", err, result)
      return result
    })
}

