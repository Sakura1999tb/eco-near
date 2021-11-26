import { Account } from "./Account.model";

@nearBindgen
export class ContractInfomation {
  public price: u64;
  public account: Account;

  constructor(price: u64, account: Account) {
    this.price = price;
    this.account = account;
  }
}
