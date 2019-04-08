# METAMASK PLUGINS

## Plugins:

Add plugin feature in MetaMask
users inputs plugin ens name

A plugin can:
* running a persistant script in background page (using provider (including app keys))
* showing an ui in MetaMask through an iframe
* instanciate pluginApi functions that can be called from:
  ** metamask dummy plugin ui
  ** website where this is injected
  ** in the plugin's metamask iframe


## Plugin data:

User Input:
* plugin ens name

Resolved plugin's metadata (through ENS):
* author eth address (can be used to authenticate messages from plugin)
* plugin script url
* plugin symbol
* plugin image

Other potential metadata fields
* plugin key types:
  * app keys
  * bip44 keys (also indicate the bip44 code, 60 is reserved for ETH, MetaMask main accounts)
* plugin eth address/gateway contract (if we 

## Plugin script:

interface.js
background.js
iframe.html
functions urls and js files





