import './App.css'

import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'

function App() {
  const [updating, setUpdating] = useState(true)
  const [balanceAddress, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [marketingOwner, setMarketingOwner] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [ownerAllowance, setOwnerAllowance] = useState("")
  const [spenderAllowance, setSpenderAllowance] = useState("")
  const [allAllowanceAddress, setAllAllowanceAddress] = useState("")
  const [logo, setLogo] = useState("")

  const [amount, setAmount] = useState(0)
  const [recipent, setRecipent] = useState("")
  const [increaseSpender, setIncreaseSpender] = useState("")
  const [increaseAmount, setIncreaseAmount] = useState("")
  const [decreaseSpender, setDecreaseSpender] = useState("")
  const [decreaseAmount, setDecreaseAmount] = useState("")
  const [mintAddress, setMintAddress] = useState("")
  const [mintAmount, setMintAmount] = useState("")
  const [burnAddress, setBurnAddress] = useState("")
  const [burnAmount, setBurnAmount] = useState("")
  const [ownBurnAmount, setOwnBurnAmount] = useState("")
  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [transferAmount, setTransferAmount] = useState("")

  const { status } = useWallet()
  const connectedWallet = useConnectedWallet()

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        let info = await query.getMarketingInfo(connectedWallet);
        setLogo(info.logo.url);
        setDescription(info.description);
        setMarketingOwner(info.marketing);
        setProjectLink(info.project);
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const onClickCheckBalance = async () => {
    let result = (await query.getBalance(connectedWallet, balanceAddress)).balance
    Swal.fire(
      `Balance: ${result}`,
      `Address: ${balanceAddress}`,
      'success'
    )
  }

  const onClickAllowance = async () => {
    let result = (await query.getAllowance(connectedWallet, ownerAllowance, spenderAllowance)).allowance
    Swal.fire(
      `Allowance: ${result}`,
      `Owner Address: ${ownerAllowance} \n Spender Address: ${spenderAllowance}`,
      'success'
    )
  }

  const onClickAllAllowance = async () => {
    let result = (await query.getAllAllowance(connectedWallet, allAllowanceAddress)).allowances
    console.log(result);
    let spenderLists = ''
    for (let item of result) {
      spenderLists += item.spender + ": " + item.allowance + "\n"
    }
    Swal.fire(
      `Total Allowances: ${result.length}`,
      spenderLists,
      'success'
    )
  }

  const onClickIncreaseAllowance = async () => {
    setUpdating(true)
    let result = await execute.increaseAllowance(connectedWallet, increaseAmount, increaseSpender)
    if (result) {
      Swal.fire(
        `Increased Allowance: ${increaseAmount}`,
        `Spender: ${increaseSpender}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  const onClickDecreaseAllowance = async () => {
    setUpdating(true)
    let result = await execute.decreaseAllowance(connectedWallet, decreaseAmount, decreaseSpender)
    if (result) {
      Swal.fire(
        `Decreased Allowance: ${decreaseAmount}`,
        `Spender: ${decreaseSpender}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  const onClickTransfer = async () => {
    setUpdating(true)
    await execute.transfer(connectedWallet, amount, recipent)
    setUpdating(false)
  }

  const onClickMint = async () => {
    setUpdating(true)
    let result = await execute.mint(connectedWallet, mintAmount, mintAddress);
    console.log(result);
    if (result) {
      Swal.fire(
        `Minted ${mintAmount} token`,
        `Tx hash:\n${result.txhash}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  const onClickBurn = async () => {
    setUpdating(true)
    let result = await execute.burn(connectedWallet, ownBurnAmount);
    console.log(result);
    if (result) {
      Swal.fire(
        `Burnt ${ownBurnAmount} token`,
        `Tx hash:\n${result.txhash}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  const onClickBurnFrom = async () => {
    setUpdating(true)
    let result = await execute.burnFrom(connectedWallet, burnAmount, burnAddress);
    console.log(result);
    if (result) {
      Swal.fire(
        `Burnt ${burnAmount} token`,
        `Tx hash:\n${result.txhash}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  const onClickTransferFrom = async () => {
    setUpdating(true)
    let result = await execute.transferFrom(connectedWallet, transferAmount, sender, receiver);
    console.log(result);
    if (result) {
      Swal.fire(
        `Transfered ${transferAmount} token`,
        `From:\n${sender}\nTo:\n${receiver}\nTx hash:\n${result.txhash}`,
        'success'
      )
    }
    else {
      Swal.fire(
        `Error`,
        `Some error occurred`,
        `error`
      )
    }
    setUpdating(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        {status === WalletStatus.WALLET_CONNECTED && (
          <div className="row">

            <div className="col">
              <div className='checkBalance'>
                <h2>BALANCE</h2>
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Address" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setAddress(e.target.value)}
                    value={balanceAddress}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickCheckBalance}>
                      CHECK BALANCE
                    </button>
                  </div>
                </div>
              </div>

              <div className="checkAllowance">
                <h2>ALLOWANCE</h2>
                <input 
                  type="text" className="form-control" placeholder="Owner" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setOwnerAllowance(e.target.value)}
                  value={ownerAllowance}
                />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Spender" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setSpenderAllowance(e.target.value)}
                    value={spenderAllowance}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickAllowance}>
                      CHECK ALLOWANCE
                    </button>
                  </div>
                </div>
              </div>

              <div className="checkAllAllowances">
                <h2>ALL ALLOWANCES</h2>
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Owner Address" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setAllAllowanceAddress(e.target.value)}
                    value={allAllowanceAddress}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickAllAllowance}>
                      CHECK ALLOWANCES
                    </button>
                  </div>
                </div>
              </div>

              <div className="marketing-info">
                <h2>MARKETING INFO</h2>
                <label>Description:</label><p>{' '}{description}</p><br></br>
                <label>Marketing Owner:</label><p>{' '}{marketingOwner}</p><br></br>
                <label>Project link:</label><p>{' '}{projectLink}</p><br></br>

                <h2>LOGO</h2>
                <img src={logo} alt="Project logo"></img>
              </div>
            </div>

            <div className="col">
              <div className='increase-allowance'>
              <h2>INCREASE ALLOWANCE</h2>
                <input 
                  type="text" className="form-control" placeholder="Spender" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setIncreaseSpender(e.target.value)}
                  value={increaseSpender}
                />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setIncreaseAmount(e.target.value)}
                    value={increaseAmount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickIncreaseAllowance}>
                      INCREASE
                    </button>
                  </div>
                </div>
              </div>
              
              <div className='decrease-allowance'>
                <h2>DECREASE ALLOWANCE</h2>
                <input 
                  type="text" className="form-control" placeholder="Spender" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setDecreaseSpender(e.target.value)}
                  value={decreaseSpender}
                />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setDecreaseAmount(e.target.value)}
                    value={decreaseAmount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickDecreaseAllowance}>
                      DECREASE
                    </button>
                  </div>
                </div>
              </div>

              <h2>TRANSFER FROM</h2>
              <input 
                type="text" className="form-control" placeholder="Address" 
                aria-label="Address" aria-describedby="basic-addon2"
                onChange={(e) => setSender(e.target.value)}
                value={sender}
              />
              <input 
                type="text" className="form-control" placeholder="Address" 
                aria-label="Address" aria-describedby="basic-addon2"
                onChange={(e) => setReceiver(e.target.value)}
                value={receiver}
              />
              <div className="input-group mb-3">
                <input 
                  type="text" className="form-control" placeholder="Address" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setTransferAmount(e.target.value)}
                  value={transferAmount}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-secondary" type="button"
                    onClick={onClickTransferFrom}>
                    TRANSFER
                  </button>
                </div>
              </div>

              <div className="burn-from">
                <h2>BURN FROM</h2>
                <input 
                  type="text" className="form-control" placeholder="Owner Address" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setBurnAddress(e.target.value)}
                  value={burnAddress}
                />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setBurnAmount(e.target.value)}
                    value={burnAmount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickBurnFrom}>
                      BURN
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="col">
              <div className='transfer'>
                <h2>TRANSFER TOKEN</h2>
                <input 
                  type="text" className="form-control" placeholder="Recipent Address" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setRecipent(e.target.value)}
                  value={recipent}
                />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickTransfer}>
                      TRANSFER
                    </button>
                  </div>
                </div>
              </div>

              <div className="mint">
                <h2>MINT</h2>
                <input 
                    type="text" className="form-control" placeholder="Address" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setMintAddress(e.target.value)}
                    value={mintAddress}
                  />
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setMintAmount(e.target.value)}
                    value={mintAmount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickMint}>
                      MINT
                    </button>
                  </div>
                </div>
              </div>

              <div className='burn'>
                <h2>BURN</h2>
                <div className="input-group mb-3">
                  <input 
                    type="text" className="form-control" placeholder="Amount" 
                    aria-label="Address" aria-describedby="basic-addon2"
                    onChange={(e) => setOwnBurnAmount(e.target.value)}
                    value={ownBurnAmount}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary" type="button"
                      onClick={onClickBurn}>
                      BURN
                    </button>
                  </div>
                </div>
              </div>

              <h2>UPDATE MARKETING INFO</h2>
              <input 
                type="text" className="form-control" placeholder="Address" 
                aria-label="Address" aria-describedby="basic-addon2"
                onChange={(e) => setAmount(e.target.value)}
                value={balanceAddress}
              />
              <input 
                type="text" className="form-control" placeholder="Address" 
                aria-label="Address" aria-describedby="basic-addon2"
                onChange={(e) => setAmount(e.target.value)}
                value={balanceAddress}
              />
              <div className="input-group mb-3">
                <input 
                  type="text" className="form-control" placeholder="Address" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setRecipent(e.target.value)}
                  value={balanceAddress}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-secondary" type="button"
                    onClick={onClickTransfer}>
                    UPDATE
                  </button>
                </div>
              </div>

              <h2>UPDATE LOGO</h2>
              <div className="input-group mb-3">
                <input 
                  type="text" className="form-control" placeholder="Address" 
                  aria-label="Address" aria-describedby="basic-addon2"
                  onChange={(e) => setRecipent(e.target.value)}
                  value={balanceAddress}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-secondary" type="button"
                    onClick={onClickTransfer}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
        </div>
        )}
        <ConnectWallet />
      </header>
    </div>
  )
}

export default App
