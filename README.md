# Simple Interface For Smart Contract Execution

A simple React interface to input smart contract address and parameters using the Coinbase Wallet, with some additional features. Designed
mainly to QA the Coinbase transaction preview service on the mobile simulator. Currently hosted at [transaction-playground.com](https://transaction-playground.com/) with AWS EC2, Cloudflare, and Nginx.

## Main Interface
[transaction-playground.com](https://transaction-playground.com/)

<img width="1261" alt="Screenshot 2024-02-18 at 6 16 02 PM" src="https://github.com/OliverCai0/TransactionPlayground/assets/47547771/98623bc2-1a35-4579-b172-4355e98a2f85">

## Deployed Add-Ons
[transaction-playground.com/not-a-scam](https://transaction-playground.com/not-a-scam)

An additional page to demo the dangers of cryptocurrency phishing scams. One button fires an unlimited USDC approval call. The other attempts to drain all the AAVE in your account.
<img width="1259" alt="Screenshot 2024-02-18 at 6 17 00 PM" src="https://github.com/OliverCai0/TransactionPlayground/assets/47547771/ecd71e32-7701-422d-afa1-c3b483bcff11">

## Features Not Currently Deployed
- Multicall form
- Permit2 Form
- Generalized ERC20 Form

## Dependencies
- @coinbase/wallet-sdk: "^3.7.1",
- ethers: "^6.7.1",
- abi-coder: "^5.0.0",
