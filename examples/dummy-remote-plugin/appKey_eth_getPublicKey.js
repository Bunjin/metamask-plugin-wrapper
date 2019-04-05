function test(){
          provider.sendAsync(
	{
	  method: "appKey_eth_getPublicKey",
	  params: "2",
	}, function(err, result){
	  console.log("dummy plugin received answer", err, result)
	  return result
	})
}

