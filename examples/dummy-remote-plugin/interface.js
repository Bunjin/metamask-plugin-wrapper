{"actions":[{"name": "appKey_eth_getPublicKey",
    	     "call":"function(){provider.sendAsync({ method: \"appKey_eth_getPublicKey\", params: \"2\", }, function(err, result){ return result})}",
    	     "params":[{"name": "subHdPath",
			"type": "string"}
		      ]
    	    },
	    {"name": "appKey_eth_getAddress",
    	     "call":"appKey_eth_getAddress",
    	     "params":[{"name": "subHdPath",
			"type": "string"}
    		      ]
    	    },
	    {"name": "appKey_eth_sendTransaction",
    	     "call":"appKey_eth_signTransaction",
    	     "params":[{"name": "subHdPath",
    			"type": "string"},
		       {"name": "to",
			"type": "string"},
		       {"name": "value",
    			"type": "uint"}			  
    		      ]
    	    }]
}
