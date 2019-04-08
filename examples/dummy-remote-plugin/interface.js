{"actions":[{"name": "pluginFunction1",
    	     "call": "",
	     "url":"pluginFunction1.js",
    	     "params":[{"name": "subHdPath",
			"type": "string"}
		      ]
    	    },
	    {"name": "pluginFunction2",
    	     "call": "",
	     "url": "pluginFunction2.js",
    	     "params":[{"name": "subHdPath",
			"type": "string"},
		       {"name": "dummyParam",
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
    	    }],
 "background":{"url":"background.js",
	       "call":""}
}
