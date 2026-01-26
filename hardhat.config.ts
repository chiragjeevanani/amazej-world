import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-viem";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-ignition";
// import "@nomicfoundation/hardhat-foundry";
import "hardhat-abi-exporter";
import "@typechain/hardhat";
import { vars } from "hardhat/config.js";

const PRIVATE_KEY = vars.get('PRGS_PRIVATE_KEY');
/** @type HardhatUserConfig */
export default {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        runs: 4000,
        enabled: true,
      },
      viaIR: true
    }
  },
  allowUnlimitedContractSize: true,
  etherscan: {
    apiKey: {
      bsc: ''
    }
  },
  gasReporter: {
    currency: 'USD',
    L1: "binance",
  },
  abiExporter: [
    {
      path: './abi',
      runOnCompile: true,
      pretty: false,
      clear: true,
    },
  ],
  typechain: {
    outDir: './typechain',
  },
  networks: {
    hardhat: {
      accounts: { count: 60 }, // more funded accounts
    },
    anvil: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
      launch: false, // if set to `true`, it will spawn a new instance if the plugin is initialized, if set to `false` it expects an already running anvil instance
    },
    localhost: {
      chainId: 31337,
      url: 'http://localhost:8545',
      accounts: ['']
    },
    chaple: {
      url: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      chainId: 97,
      accounts: [PRIVATE_KEY],
      gasPrice: 1000000000,
      ignition: {
        // maxFeePerGasLimit: 1000000000n, // 50 gwei
      },

    },
    bsc: {
      url: 'https://bsc-dataseed.bnbchain.org',
      chainId: 56,
      accounts: ['']
    },
  }
};
