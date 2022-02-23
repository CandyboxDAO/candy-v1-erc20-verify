const dotenv = require('dotenv');

require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('hardhat-deploy-ethers');

dotenv.config();

const defaultNetwork = 'localhost';
const infuraId = process.env.INFURA_ID;

function mnemonic() {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim();
  } catch (e) {
    if (defaultNetwork !== 'localhost') {
      console.log('☢️ WARNING: No mnemonic file created for a deploy account.');
    }
  }
  return '';
}

function privatekeys(network){
  network = network || defaultNetwork;
  let accounts = [process.env.LOCAL_DEPLOYER_PRIVATE_KEY, process.env.LOCAL_CALLER_PRIVATE_KEY];
  switch(network) {
      case "bsc":
      case "avalanche":
      case "aurora":
      case "mainnet":
        accounts = [process.env.DEPLOYER_PRIVATE_KEY, process.env.CALLER_PRIVATE_KEY];
        break;
      case "bscTestnet":
      case "avalancheFujiTestnet":
      case "auroraTestnet":
      case "rinkeby":
        accounts = [process.env.TEST_DEPLOYER_PRIVATE_KEY, process.env.TEST_CALLER_PRIVATE_KEY];
        break;
      default:
        break;
  }
  return accounts;
}

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      blockGasLimit: 10000000,
      gas: 10000000,
      network_id: '*', // eslint-disable-line camelcase
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
      gasPrice: 160000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
     // bsc network
     bsc: {
      url: 'https://bsc-dataseed1.binance.org',
      accounts: privatekeys("bsc"),
      gasPrice: 5000000000,
      network_id: 56
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: privatekeys("bscTestnet"),
      network_id: 97,
      gas: 10000000
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
    apiKey: process.env.BSCSCAN_API_KEY,

    verify_axiosDefaultConfig: {
      proxy: true,
      httpsAgentUrl: "http://127.0.0.1:19180"
    }
  },
};
