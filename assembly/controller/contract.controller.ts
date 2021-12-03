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

export function createContract(
  contractInfomation: ContractInfomation,
  createdAt: u64
): u64 {
  if (contractInfomation.price) {
    const account: Account = contractInfomation.account;
    const accountProfile: AccountProfile = account.accountProfile;
    const accountAuthen: AccountAuthen = account.accountAuthen;
    const _account: Account | null = gameCenter.getAccount(
      accountAuthen.username,
      accountAuthen.password
    );

    const saleContracts = storage.getAll();

    for (let i = 0; i < saleContracts.length; i++) {
      const saleContract = saleContracts[i];
      if (
        saleContract.isComplete == 0 &&
        saleContract.contractInfomation.account.accountAuthen.username ==
          contractInfomation.account.accountAuthen.username
      ) {
        logging.log("exist")
        return 0;
      }
    }

    if (_account) {
      const _accountProfile: AccountProfile = _account.accountProfile;
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
        );
        const contract: SaleContract = new SaleContract(contractInf, createdAt);
        storage.push(contract);
        return 1;
      }
      return 0;
    }

    return 0;
  }
  return 0;
}

export function getMyContracts(user: string): Array<SaleContract> {
  return storage.getByUser(user);
}

export function getAll(): Array<SaleContract> {
  return storage.getAll();
}

export function getExchanges(): Array<SaleContract> {
  return storage.getExchanges();
}

export function deleteContracts(): u64 {
  return storage.deleteContracts();
}

export function deleteContract(user: string, idContract: string): u64 {
  return storage.deleteContract(user, idContract);
}

export function buyAccount(id: string, closedAt: u64): u64 {
  const contract: SaleContract | null = storage.get(id);
  logging.log("id: " + id);
  if (contract) {
    const attach: u128 = context.attachedDeposit;
    logging.log("price: " + contract.contractInfomation.price.toString());
    if (attach != asYocto(contract.contractInfomation.price)) {
      ContractPromiseBatch.create(context.sender).transfer(
        u128.from(context.attachedDeposit)
      );
      return 0;
    } else {
      contract.isComplete = 1;
      contract.buyer = context.sender;
      contract.closedAt = closedAt;
      logging.log("closedAt: " + closedAt.toString());
      ContractPromiseBatch.create(contract.seller).transfer(
        u128.from(asYocto(contract.contractInfomation.price))
      );
      storage.update(contract);
      return 1;
    }
  }
  ContractPromiseBatch.create(context.sender).transfer(
    u128.from(context.attachedDeposit)
  );
  return 0;
}
