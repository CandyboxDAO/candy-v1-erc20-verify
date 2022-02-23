# candy-v1-erc20-verify

"It ain't much, but it's honest work"

This is a utility to verify ERC-20 tokens from Candybox V1. 

Steps:
1.  Clone the repository:
    ```bash
    git clone https://github.com/candyboxdao/candy-v1-erc20-verify.git
    ```
2.  Create a `./env` file mirroring `./example.env`. You will need Infura and Etherscan secrets.
3.  Run the following:
    ```bash
    npx hardhat verify --network $NETWORK $ERC20_ADDRESS $ERC20_NAME $ERC20_SYMBOL
    ```

    For example:
    ```bash
    addr="0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71"
    npx hardhat verify --network mainnet $addr "ConstitutionDAO" "PEOPLE"
    ```
