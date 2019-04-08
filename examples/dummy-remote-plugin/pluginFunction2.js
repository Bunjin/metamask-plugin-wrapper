function pluginFunction2(hdSubPath, dummyParam){
  console.log("DUMMY PARAM")
  console.log(dummyParam)
  provider.sendAsync(
    {
      method: "appKey_eth_getAddress",
      params: hdSubPath,
    }, function(err, result){
      console.log(result)
      return result
    })
}

