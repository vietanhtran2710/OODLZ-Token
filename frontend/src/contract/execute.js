import { LCDClient, MsgExecuteContract, Fee } from "@terra-money/terra.js";
import { contractAdress } from "./address";

// ==== utils ====

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const _exec =
  (msg, fee = new Fee(200000, { uluna: 1000000 })) =>
  async (wallet) => {
    const lcd = new LCDClient({
      URL: wallet.network.lcd,
      chainID: wallet.network.chainID,
    });

    const { result } = await wallet.post({
      fee,
      msgs: [
        new MsgExecuteContract(
          wallet.walletAddress,
          contractAdress(wallet),
          msg
        ),
      ],
    });

    while (true) {
      try {
        return await lcd.tx.txInfo(result.txhash);
      } catch (e) {
        if (Date.now() < untilInterval) {
          await sleep(500);
        } else if (Date.now() < until) {
          await sleep(1000 * 10);
        } else {
          throw new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
          );
        }
      }
    }
  };

// ==== execute contract ====

export const transfer = async (wallet, amount, recipent) =>
  _exec({ transfer: { amount: amount, recipient: recipent } })(wallet);

export const increaseAllowance = async (wallet, amount, spender) =>
_exec({ increase_allowance: { amount: amount, spender: spender } })(wallet);

export const decreaseAllowance = async (wallet, amount, spender) =>
_exec({ decrease_allowance: { amount: amount, spender: spender } })(wallet);

export const mint = async (wallet, amount, recipient) =>
_exec({ mint: { amount: amount, recipient: recipient } })(wallet);

export const burn = async (wallet, amount) =>
_exec({ burn: { amount: amount } })(wallet);

export const updateMarketing = async (wallet, amount, spender) =>
_exec({ decrease_allowance: { amount: amount, spender: spender } })(wallet);

export const updateLogo = async (wallet, amount, spender) =>
_exec({ decrease_allowance: { amount: amount, spender: spender } })(wallet);

export const transferFrom = async (wallet, amount, owner, recipient) =>
_exec({ transfer_from: { amount: amount, owner: owner, recipient: recipient } })(wallet);

export const burnFrom = async (wallet, amount, owner) =>
_exec({ burn_from: { amount: amount, owner: owner } })(wallet);