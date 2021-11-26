import { Context } from "near-sdk-as";
import { ContractInfomation } from "./ContractInfomation.model";
//this is required if using a local .env file for private key
@nearBindgen
export class SaleContract {
  public seller: string;
  public buyer: string;
  public contractInfomation: ContractInfomation;
  public id: string;
  public isComplete: u64;
  public createdAt: u64;
  public closedAt: u64;
  constructor(contractInfomation: ContractInfomation, createdAt: u64) {
    this.seller = Context.sender;
    this.id = Context.blockTimestamp.toString();
    this.isComplete = 0;
    this.contractInfomation = contractInfomation;
    this.createdAt = createdAt;
  }
  // constructor(contractInfomation: ContractInfomation) {
  //   this.seller = Context.sender;
  //   this.id = Context.blockTimestamp.toString();
  //   this.isComplete = 0;
  //   this.contractInfomation = contractInfomation;
  // }
}
