import { context } from "near-sdk-as";
import * as contractController from "./controller/contract.controller";
import { SaleContract } from "./models/SaleContract.model";
import { ContractInfomation } from "./models/ContractInfomation.model";

// create new SaleContract
export function createContract(
  contractInfomation: ContractInfomation,
  createdAt: u64
): u64 {
  return contractController.createContract(contractInfomation, createdAt);
}

// get All Contracts of a user
export function getMyContracts(user: string): Array<SaleContract> {
  return contractController.getMyContracts(user);
}

// get All Contracts are Saling
export function getExchanges(): Array<SaleContract> {
  return contractController.getExchanges();
}

// get All Contracts -> test
export function getAll(): Array<SaleContract> {
  return contractController.getAll();
}

// buy a Account
export function buyAccount(id: string, closedAt: u64): u64 {
  return contractController.buyAccount(id, closedAt);
}

// delete All Contract -> test
export function deleteContracts(): u64 {
  return contractController.deleteContracts();
}

// delete a Contract -> test
export function deleteContract(id: string): u64 {
  return contractController.deleteContract(context.sender, id);
}
