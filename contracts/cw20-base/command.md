# Complile contract to optimized web assembly
RUSTFLAGS='-C link-arg=-s' cargo wasm
cp ../../target/wasm32-unknown-unknown/release/cw20_base.wasm .

# Upload contract code 
terrad tx wasm store cw20_base.wasm --from test1 --chain-id=localterra --gas=auto --fees=100000uluna --broadcast-mode=block
terrad query wasm code [<CODE>]

# Creating the contract
terrad tx wasm instantiate [<CODE>] '{"name":"OODLZ","symbol":"OODLZ","decimals":10,"initial_balances":[{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","amount":"1000000"}],"mint":{"minter":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","cap":"1000000"},"marketing":{}}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
terrad query wasm contract [<ADDRESS>]

terrad tx wasm instantiate 9 '{"name":"OODLZ","symbol":"OODL","decimals":10,"initial_balances":[{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","amount":"1000000"}],"mint":{"minter":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","cap":"1000000"},"marketing":{"description":"Adaptive utility and rewards token (OODL) as an added reward to any cashback users receive from their spend","marketing":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","project":"oodlz.io","logo":{"url":"https://www.oodlz.io/wp-content/uploads/oodlz-300.png"}}}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
terrad query wasm contract terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3

# Interacting with the contract
## Query
### Get account balance
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"balance":{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}'
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"balance":{"address":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}'
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"balance":{"address":"terra1l09lzlktar3m0hth59z3se86fsyz084map2yln"}}'

terrad query wasm contract-store terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"balance":{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}'

### Get token info
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"token_info":{}}'
terrad query wasm contract-store terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"token_info":{}}'

### Get minters
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"minter":{}}'

### Get allowances
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"allowance":{"owner":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","spender":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}'

### Get all allowances
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"all_allowances":{"owner":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}'

### Get all account
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"all_accounts": {}}'

### Get marketing info
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"marketing_info":{}}'
terrad query wasm contract-store terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"marketing_info":{}}'

### Get logo
terrad query wasm contract-store terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"download_logo":{}}'
terrad query wasm contract-store terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"download_logo":{}}'

## Execution
### Transfer token to another account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"transfer":{"amount":"1000","recipient":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Burn token in the sender account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"burn":{"amount":"1"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Send token to a contract (unsolved)
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"send":{"amount":"10000", "contract": "terra13aktep558cx6lny74c8st5qwt0jj66zgr7yz93", "msg": "eyJyZXNldCI6eyJjb3VudCI6NX19"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Mint token to an account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"mint":{"amount":"1","recipient":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Increase allowance for an account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"increase_allowance":{"amount":"1000","spender":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Decrease allowance for an account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"decrease_allowance":{"amount":"1","spender":"terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Transfer from owner to a recipent
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"transfer_from":{"amount":"200","owner":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8", "recipient": "terra1xrhhsfefvayxcnm9tpxz60rl3d9n2smekaupjg"}}' --from test2 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Burn from owner account
terrad tx wasm execute terra1l09lzlktar3m0hth59z3se86fsyz084map2yln '{"burn_from":{"amount":"200","owner":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}' --from test2 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Update marketing info
terrad tx wasm execute terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"update_marketing":{"description":"Adaptive utility and rewards token as an added reward to any cashback users receive from their spend","marketing":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","project":"oodlz.io"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
### Update logo
terrad tx wasm execute terra1qjrvlf27upqhqnrqmmu2y205ed2c3tc87dnku3 '{"upload_logo": {"url": "https://www.oodlz.io/wp-content/uploads/sotatek-42-b.png"}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block