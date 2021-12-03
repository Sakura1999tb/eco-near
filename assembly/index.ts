import { context } from "near-sdk-as";
import * as contractController from "./controller/contract.controller";
import { SaleContract } from "./models/SaleContract.model";
import { ContractInfomation } from "./models/ContractInfomation.model";

export function createContract(
  contractInfomation: ContractInfomation,
  createdAt: u64
): u64 {
  return contractController.createContract(contractInfomation, createdAt);
}

export function getMyContracts(user: string): Array<SaleContract> {
  return contractController.getMyContracts(user);
}

export function getExchanges(): Array<SaleContract> {
  return contractController.getExchanges();
}

export function getAll(): Array<SaleContract> {
  return contractController.getAll();
}

export function buyAccount(id: string, closedAt: u64): u64 {
  return contractController.buyAccount(id, closedAt);
}

export function deleteContracts(): u64 {
  return contractController.deleteContracts();
}

export function deleteContract(id: string): u64 {
  return contractController.deleteContract(context.sender, id);
}
