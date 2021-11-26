import { SaleContract } from "../models/SaleContract.model";
import { PersistentVector, logging } from "near-sdk-as";

const LIMITED = 10;

class Storage {
  public store: PersistentVector<SaleContract>;

  constructor() {
    this.store = new PersistentVector<SaleContract>("e");
  }

  getAll(): Array<SaleContract> {
    let result = new Array<SaleContract>(); // choose a unique prefix per collection
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      result.push(contract);
    }
    return result;
  }

  getByUser(user: string, page: u32): Array<SaleContract> {
    let result = new Array<SaleContract>(); // choose a unique prefix per collection
    let count: u32 = 0;
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      if (result.length == LIMITED) {
        break;
      }

      if (contract.seller == user || contract.buyer == user) {
        count++;
        if (count >= (page - 1) * LIMITED) {
          result.push(contract);
        }
      }
    }
    return result;
  }

  getExchanges(page: u32): Array<SaleContract> {
    let result = new Array<SaleContract>();
    let count: u32 = 0;
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      if (result.length == LIMITED) {
        break;
      }
      if (!contract.isComplete) {
        count++;
        if (count >= (page - 1) * LIMITED) {
          result.push(contract);
        }
      }
    }

    return result;
  }

  get(id: string): SaleContract | null {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].id == id) {
        return this.store[i];
      }
    }
    return null;
  }

  update(contract: SaleContract): void {
    for (let i = 0; i < this.store.length; i++) {
      const _contract: SaleContract = this.store[i];
      if (contract.id == _contract.id) {
        this.store.replace(i, contract);
      }
    }
  }

  push(contract: SaleContract): void {
    this.store.pushBack(contract);
  }

  deleteContracts(): u64 {
    while (!this.store.isEmpty) {
      this.store.pop();
    }
    return 1;
  }

  deleteContract(user: string, id: string): u64 {
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      if (
        contract.isComplete == 0 &&
        contract.seller == user &&
        contract.id == id
      ) {
        this.store.swap_remove(i);
        return 1;
      }
    }
    return 0;
  }
}

export const storage = new Storage();
