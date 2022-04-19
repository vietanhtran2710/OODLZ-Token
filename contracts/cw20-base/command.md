# Complile contract to optimized web assembly
RUSTFLAGS='-C link-arg=-s' cargo wasm
cp ../../target/wasm32-unknown-unknown/release/cw20_base.wasm .

# Upload contract code 
terrad tx wasm store cw20_base.wasm --from test1 --chain-id=localterra --gas=auto --fees=100000uluna --broadcast-mode=block
terrad query wasm code [<CODE>]

# Creating the contract
terrad tx wasm instantiate [<CODE>] '{"name":"OODLZ","symbol":"OODLZ","decimals":10,"initial_balances":[{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","amount":"1000000"}],"mint":{"minter":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","cap":"1000000"},"marketing":{}}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
terrad query wasm contract [<ADDRESS>]

# Executing/Interacting with the contract
## Get account balance
terrad tx wasm execute terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"balance":{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}' --from test1 --chain-id=localterra --fees=1000000uluna --gas=auto --broadcast-mode=block