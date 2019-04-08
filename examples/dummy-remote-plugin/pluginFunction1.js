function pluginFunction1(hdSubPath){
  provider.sendAsync(
    {
      method: "appKey_eth_getPublicKey",
      params: hdSubPath,
    }, function(err, result){
      console.log(result)
      return result
    })
}

