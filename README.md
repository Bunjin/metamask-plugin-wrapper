# METAMASK PLUGIN WRAPPER

Implements the app key api for the plugin's domain
Loads the plugin's script and interface
Passes parameters and the provider to the plugin's

## Metamask Plugins

* [Read here about Plugins](docs/PLUGINS.md)


* [Read here about App Keys](https://github.com/bunjin/appKeys/)

## Setup

Follow app Keys setup

but use `appKeys-plugin` branch of metamask-extension

also clone the develop of:
* metamask-plugin-wrapper

run `nvm use v8.13` in each folder
run `npm i` in each folder

run `npm link` or manage properly forlder structure

`npm run start` in metamask-extension

## Notes

[ ] Check consistency between functions code's params and interface param declaration
[ ] sha3 of code ?

## Notes on SES
I use SES at 3 places:

to instanciate the plugin functions
https://github.com/Bunjin/metamask-plugin-wrapper/blob/develop/index.js#L120
for the ui:
https://github.com/MetaMask/metamask-extension/blob/07a1b9035d95a034028e864ba447b03a6ae470a0/ui/app/components/app/plugin-view/plugin-view.component.js#L71
for the background persistant script:
https://github.com/MetaMask/metamask-extension/blob/appKeys-plugins/app/scripts/metamask-controller.js#L1797

and here is the remote hosted plugin code:
https://github.com/Bunjin/metamask-plugin-wrapper/tree/develop/examples/dummy-remote-plugin
