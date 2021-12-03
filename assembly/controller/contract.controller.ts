import { storage } from "../storages/contract.storage";
import { ContractInfomation } from "../models/ContractInfomation.model";
import { SaleContract } from "../models/SaleContract.model";
import {
  Account,
  AccountAuthen,
  AccountProfile,
} from "../models/Account.model";
import { context, ContractPromiseBatch, logging, u128 } from "near-sdk-core";
import { asYocto } from "../utils";
import gameCenter from "../mock/gameCenter";

// create a Contract by contractInfomation and timestamp
export function createContract(
  contractInfomation: ContractInfomation,
  createdAt: u64
): u64 {
  if (contractInfomation.price) { // check price of account ? valid or invalid
    const account: Account = contractInfomation.account;
    const accountProfile: AccountProfile = account.accountProfile;
    const accountAuthen: AccountAuthen = account.accountAuthen;
    const _account: Account | null = gameCenter.getAccount(
      accountAuthen.username,
      accountAuthen.password
    ); // get account by username and password by gameCenter to check

    const saleContracts = storage.getAll(); // get all SaleContracts to check account is saling or not

    for (let i = 0; i < saleContracts.length; i++) {
      const saleContract = saleContracts[i];
      if (
        saleContract.isComplete == 0 &&
        saleContract.contractInfomation.account.accountAuthen.username ==
          contractInfomation.account.accountAuthen.username
      ) {
        logging.log("exist") // account is saling, invalid
        return 0;
      }
    }

    // _account exist -> check profile or not exist -> error
    if (_account) {
      const _accountProfile: AccountProfile = _account.accountProfile; // checking account profile if _account exist
      if (
        accountProfile.id &&
        accountProfile.level &&
        accountProfile.wallet &&
        accountProfile.champions &&
        accountProfile.skins &&
        _accountProfile.id == accountProfile.id &&
        _accountProfile.champions == accountProfile.champions &&
        _accountProfile.level == accountProfile.level &&
        _accountProfile.skins == accountProfile.skins &&
        _accountProfile.wallet == accountProfile.wallet
      ) {
        contractInfomation.account.accountProfile.image = _accountProfile.image;
        const contractInf: ContractInfomation = new ContractInfomation(
          contractInfomation.price,
          contractInfomation.account
        ); // create new ContractInfomation
        const contract: SaleContract = new SaleContract(contractInf, createdAt); // create new SaleContract
        storage.push(contract);
        return 1;
      }
      return 0;
    }

    return 0;
  }
  return 0;
}

// get All Contracts of a user
export function getMyContracts(user: string): Array<SaleContract> {
  return storage.getByUser(user);
}

// get All Contracts -> test
export function getAll(): Array<SaleContract> {
  return storage.getAll();
}

// get All Contracts are Saling
export function getExchanges(): Array<SaleContract> {
  return storage.getExchanges();
}

// delete All Contract -> test
export function deleteContracts(): u64 {
  return storage.deleteContracts();
}

// delete a Contract -> test
export function deleteContract(user: string, idContract: string): u64 {
  return storage.deleteContract(user, idContract);
}

// buy a Account
export function buyAccount(id: string, closedAt: u64): u64 {
  const contract: SaleContract | null = storage.get(id); // get SaleContract by id
  if (contract) { // contract exist
    const attach: u128 = context.attachedDeposit; // get attachedDeposit
    if (attach != asYocto(contract.contractInfomation.price) || contract.isComplete == 1) { // check attach and status of contract. if False
      ContractPromiseBatch.create(context.sender).transfer(
        u128.from(context.attachedDeposit)
      ); // transfer back to buyer
      return 0;
    } else {
      contract.isComplete = 1; // set status of SaleContract is true. Mean complete !
      contract.buyer = context.sender; // set buyer of SaleContract
      contract.closedAt = closedAt; // set closeAt of SaleContract
      ContractPromiseBatch.create(contract.seller).transfer(
        u128.from(asYocto(contract.contractInfomation.price))
      ); // transfer to seller
      storage.update(contract); // update
      return 1;
    }
  }
  ContractPromiseBatch.create(context.sender).transfer(
    u128.from(context.attachedDeposit)
  ); // transfer back to buyer
  return 0;
}
