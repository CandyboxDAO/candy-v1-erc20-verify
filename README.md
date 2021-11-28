# juice-v1-erc20-verify

"It ain't much, but it's honest work"

This is a utility to verify ERC-20 tokens from Juicebox V1. 

Steps:
1.  Create a `./env` file mirroring the `./example.env` file. You will need Infura and Etherscan secrets.
2.  Run the following:
    ```bash
    npx hardhat verify --network $NETWORK $ERC20_ADDRESS $ERC20_NAME $ERC20_SYMBOL
    ```

    For example:
    ```bash
    npx hardhat verify --network mainnet \
      0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71 "ConstitutionDAO" "PEOPLE"
    ```
