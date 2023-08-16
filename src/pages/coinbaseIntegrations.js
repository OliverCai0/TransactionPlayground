// TypeScript
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const APP_NAME = 'My Awesome App'
const APP_LOGO_URL = 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = 'https://polygon-mumbai.g.alchemy.com/v2/QfpBPxtEbxDG24RS2lSWGu7IwWoIc56H'
const DEFAULT_CHAIN_ID = 1



// Initialize Coinbase Wallet SDK
export const coinbaseWallet = CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})

// Initialize a Web3 Provider object
export const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

export const web3 = new Web3(ethereum)