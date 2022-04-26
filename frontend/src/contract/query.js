import { LCDClient } from '@terra-money/terra.js'
import { contractAdress } from './address'

export const getBalance = async (wallet, address) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  })
  return lcd.wasm.contractQuery(contractAdress(wallet), { balance: {"address": address} })
}

export const getMarketingInfo = async (wallet) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  })
  return lcd.wasm.contractQuery(contractAdress(wallet), {"marketing_info":{}})
}

export const getAllowance = async (wallet, owner, spender) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  })
  return lcd.wasm.contractQuery(contractAdress(wallet), {"allowance":{"owner": owner,"spender": spender}})
}

export const getAllAllowance = async (wallet, owner) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  })
  return lcd.wasm.contractQuery(contractAdress(wallet), {"all_allowances":{"owner": owner}})
}