const dotenv = require('dotenv');

require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('hardhat-gas-reporter');

dotenv.config();

const defaultNetwork = 'localhost';
const infuraId = process.env.INFURA_ID;

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + infuraId,
      gasPrice: 50000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/' + infuraId,
      gasPrice: 50000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    feeCollector: {
      default: 0,
    },
  },
  // WARNING: Do not change //
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
    // End Warning /////////////
  },
  mocha: {
    bail: true,
    timeout: 6000,
  },
  gasReporter: {
    currency: 'USD',
    // gasPrice: 21,
    enabled: !!process.env.REPORT_GAS,
    showTimeSpent: true,
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
};
