This project contains a smart contract ''CounterContract.sol' which contains methods :
1) increment() : To increment the value of incVar by 1
2) reset() : To reset the value of incVar to 0 
3) fetchCurrentValue : To fetch the current value of incVar.

It uses OpenZeppelin Truffle Upgrades to upgrade the contract.

To deploy contract :
npx truffle migrate
o/p :
BLR52143805MAC:UI conduent$ npx truffle migrate

sample output :
Compiling your contracts...
===========================
> Compiling ./contracts/CounterContract.sol
> Compiling ./contracts/CounterContractV2.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/conduent/tempfortoday/CounterContract/CounterContract/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x9d139fe3a08b89c0316b6e33f2b16aa8e2215e78ce74594de2dd106a6520765d
   > Blocks: 0            Seconds: 0
   > contract address:    0x534d63d4b9e5cA173fF11326998ABea2517C0E11
   > block number:        1
   > block timestamp:     1617737413
   > account:             0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A
   > balance:             99.9955689
   > gas used:            221555 (0x36173)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0044311 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0044311 ETH


5_deploy_contract.js
====================

   Deploying 'CounterContract'
   ---------------------------
   > transaction hash:    0xd0366c8a302289286f53fc19b5fce06e4b580ae558655ddeafe3a706ff0f9fc3
   > Blocks: 0            Seconds: 0
   > contract address:    0xc717092d19E7B4D7035809216f57837bb7ED38b3
   > block number:        3
   > block timestamp:     1617737414
   > account:             0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A
   > balance:             99.99113876
   > gas used:            179509 (0x2bd35)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00359018 ETH


   Deploying 'ProxyAdmin'
   ----------------------
   > transaction hash:    0x7b61ce35560f72e7b3b0bd8907e7fc42831fbad343cf8877fbe0aefd68cd1faf
   > Blocks: 0            Seconds: 0
   > contract address:    0xE3378F6fbB6EE0B39d26f29acc89d53d0d603F46
   > block number:        4
   > block timestamp:     1617737414
   > account:             0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A
   > balance:             99.97806226
   > gas used:            653825 (0x9fa01)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0130765 ETH


   Deploying 'AdminUpgradeabilityProxy'
   ------------------------------------
   > transaction hash:    0xb4fd1ed63f6e33f750bb5bf8a521c25dfb01e2669edf325e65c34c8638dd2caa
   > Blocks: 0            Seconds: 0
   > contract address:    0x69ff9805bD7B3EC51dc01Dc94dfcd57390b6Cb06
   > block number:        5
   > block timestamp:     1617737414
   > account:             0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A
   > balance:             99.96643598
   > gas used:            581314 (0x8dec2)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01162628 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02829296 ETH


6_upgrade_contract.js
=====================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   4
> Final cost:          0.03272406 ETH

To deploy contract post upgrade : 
Suppose your upgraded contract is 'CounterContractV2'and you want to upgrade from CounterContract,createa a .js file under 'migrations' folder[See '6_upgrade_contract.js' under 'migrations' folder for the reference] , and then execute  'npx truffle migrate'.

To create API, express js has been used.
APIs:
/increment : To call increment() of smart contract using web3
/curValue :  To call fetchCurrentValue() of smart contract using web3
/resetValue : To call reset() of smart contract using web3

Web3.js library:
It is used to call the smart contract function.

Tools/framework/libraries used to develop DApp :
Truffle framework
ganache
web3.js
express.js
jQuery[in UI to call express.js APIs]
OpenZeppelin Truffle Upgrades [npm i --save-dev @openzeppelin/truffle-upgrades]

UI:
UI is in plain html.

How the environment was setup while initiating the development:
under the project's root folder
npm init -y
npm i --save-dev truffle
npx truffle init
npm i --save-dev @openzeppelin/truffle-upgrades
npm install --save express
npm install --save mongodb
npm install --save web3

**NOTE** : Instead of PostgresSQL, this DApp uses MongoDB to log the value changes.
