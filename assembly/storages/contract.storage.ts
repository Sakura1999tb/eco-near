import { SaleContract } from "../models/SaleContract.model";
import { PersistentVector, logging } from "near-sdk-as";

class Storage {
  public store: PersistentVector<SaleContract>;

  constructor() {
    this.store = new PersistentVector<SaleContract>("e"); // database
  }

  // get All SaleContracts
  getAll(): Array<SaleContract> {
    let result = new Array<SaleContract>(); // choose a unique prefix per collection
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      result.push(contract);
    }
    return result;
  }

  // get All SaleContracts by User
  getByUser(user: string): Array<SaleContract> {
    let result = new Array<SaleContract>(); // choose a unique prefix per collection
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      if (contract.seller == user || contract.buyer == user) {
        result.push(contract);
      }
    }
    return result;
  }

  // get All SaleContracts are saling
  getExchanges(): Array<SaleContract> {
    let result = new Array<SaleContract>();
    for (let i = 0; i < this.store.length; i++) {
      const contract: SaleContract = this.store[i];
      if (!contract.isComplete) {
        result.push(contract);
      }
    }

    return result;
  }

  // get a SaleContract by id
  get(id: string): SaleContract | null {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].id == id) {
        return this.store[i];
      }
    }
    return null;
  }

  // update a SaleContract
  update(contract: SaleContract): void {
    for (let i = 0; i < this.store.length; i++) {
      const _contract: SaleContract = this.store[i];
      if (contract.id == _contract.id) {
        this.store.replace(i, contract);
      }
    }
  }

  // add a SaleContract
  push(contract: SaleContract): void {
    this.store.pushBack(contract);
  }

  // delete All SaleContracts -> test
  deleteContracts(): u64 {
    while (!this.store.isEmpty) {
      this.store.pop();
    }
    return 1;
  }

  // delete a SaleContract 
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
