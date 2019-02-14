# App Keys

Introducing a new level of accounts security.

More permissive security because they are not the main accounts that hold most of your cryptocurrencies

Allows to give more power and flexibility to the crypto apps developers. This should allow to improve a lot the UX of crypto dapps.

Can allow to easily implement several of the features that where requested to MetaMask but that where incompatible with the level of security we were requesting for main accounts:
* offline signing without broadcasting of txes
* be able to sign without prompting the user
* be able to use throwable keys to improve anonymity
* be able to use different keys / accounts for each apps

While being fully restorable using the user's mnemonic or hardware wallet and the HD Path determined uniquely by the app's ens name.

# HD Paths of App keys:

Being compatible with BIP 32, BIP 39

## HD Paths:
### Proposal 1 (use their own paths):

[Standard beginning of Hd Path] / [Domain Specific Hd Path] / [App controlled HD subPath] / [Account index]


Standard beginning:
m/44/60 is eth
but we won't be using bip44 here since not a crypto
and we don't want app keys to be ETH specific

### Proposal 2 (make them subsets of ETH main accounts)
[Hd Path of an Eth main Account] / [Domain Specific Hd subPath] / [App controlled HD subPath] / [Account index]

pros:
allows to use isolated app paths for the same app using the same mnemonic.
can have several accounts fully separated to use the same domain without the domain knowing I'm the same individual. All this with the same mnemonic, I would just use 2 different mainAccounts.
One question though is how do you handle apps/plugin that would like to interact with several "main accounts", accounts outside of their control? Not sure if this use case really exists tho and we could have.
Also how does this applies to the plugins if metamask doesn't have a "selected account anymore"? Logging into plugins in the same way as in websites, EIP1102?

cons: 
makes this a subset of an ETH account?
or could be generalised to non ETH main accounts?


key types (selected on installation):

for cryptocurrencies' plugins: bip44 extension (eth not allowed)
m / purpose' / coin_type' / account' / change / address_index

or 

for apps/plugins derivation key
m / pluginUniqueId / coin_type' / account' / change / address_index

App keys and not plugin keys
(by domain)
implement in keyring these specific account separetely



I currently assign the first path of the hdPath using the keccak of the name and the I let the plugin's code add any extra subPath to this. and then he can add an account index.
So for example it would be:
37a9 6265 2fcb 752a e373 feb0 22dd 2882 a934 8b79
`m/14249/25189/12235/29994/58227/65200/8925/10370/43316/35705/index_customisable_by_plugin/index_customisable_by_plugin/index_customisable_by_plugin.../index_customisable_by_plugin/ account index`

the `index_customisable_by_plugin/.../index_customisable_by_plugin` part is just a string but it needs to follow the same rules as bip32



## Elements of these HD Paths
### Domain specific HD subPaths

ENS Name: vitalik.buterin.eth
Ens name hash eg. : 
e4a10c258c7b68c38df1cf0caf03ce2e34b5ec02e5abdd3ef18f0703f317c62a

see here to see how an ENS name hash is computed

### App controlled HD subPath

allows to use other parameters for under the app control
ex: version, username, ...

### Account index

# Notes:
- In Hd Paths, Merge app controlled subset and account index ?


- XPubKeys, how do we introduce them? How do we isolate them such that we don't leak a single XPubKey for the whole mnemonic, which would be a big privacy concern and would also remove the benefit of proposal 2 for hd path isolation per main account.


json rpc method middleware
private RPC methods for app keys

# API


* **getPubKey(string hdPath, uint index)** returns bytes:
hdPath: customise the app key path (and can use several), should be formatted as uint/uint/uint (can be extended as much as one likes)
with uint under 0x80000000
can also be hardened using '
Derive an new account for the plugin (along some specific derivation path) and get public key

Should we allow to specify alternative derivation types and path ?
we use BIP32 and BIP44 and some custom path



* **getXPubKey() returns bytes**:
returns the extended public key of the keyring

the same extendedPublicKey using ethereumjs-wallet/hdkey, no matter the path I choose
one mnemonic = one extended public key for all hdPaths
that means some privacy will be leaked accross plugins
as long as one can guess the hdPath used by the other plugins, one can track the accounts of an user

* **signWithPluginAccount(uint index, bytes dataToSign, string signMethodType) returns bytes**:
Sign with a plugin’s account
this is eth sign ? we should support alternative signing / encryption methods ?


* **persistInMetaMaskDb(key, data)**:
Store in MetaMask localdb, specific store for plugin

* **readInMetaMaskDb(key) returns data**:

* **communicateWithPlugin(pluginUniqueId, data)**:
Communicate with another plugin

* **encrypt(uint index, data) return bytes**
Request Encryption

* **decrypt(uint index, bytes) return data**
Request Decryption