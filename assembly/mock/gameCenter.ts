import {
  Account,
  AccountAuthen,
  AccountProfile,
} from "../models/Account.model";

class gameCenter {
  public data: Array<Account>;

  constructor() {
    this.data = new Array<Account>();
    this.init();
  }

  init(): void {
    this.data.push(
      new Account(
        new AccountAuthen("mock1", "mock1"),
        new AccountProfile(
          1610909727,
          30,
          68342,
          147,
          1137,
          "https://acclienminh24h.com/uploads/image_lmht/1610909727/0.jpg"
        )
      )
    );

    this.data.push(
      new Account(
        new AccountAuthen("mock2", "mock2"),
        new AccountProfile(
          1609058409,
          30,
          37326,
          145,
          1102,
          "https://acclienminh24h.com/uploads/image_lmht/1609058409/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock3", "mock3"),
        new AccountProfile(
          1274812,
          30,
          123421,
          147,
          1130,
          "https://acclienminh24h.com/uploads/image_lmht/1609058720/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock4", "mock4"),
        new AccountProfile(
          1609058422,
          30,
          231428,
          144,
          1109,
          "https://acclienminh24h.com/uploads/image_lmht/1609058422/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock5", "mock5"),
        new AccountProfile(
          1609059108,
          30,
          47623,
          148,
          1130,
          "https://acclienminh24h.com/uploads/image_lmht/1609059108/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock6", "mock6"),
        new AccountProfile(
          1609059125,
          30,
          123123,
          146,
          1060,
          "https://acclienminh24h.com/uploads/image_lmht/1609059125/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock7", "mock7"),
        new AccountProfile(
          1609059162,
          30,
          123412,
          148,
          1029,
          "https://acclienminh24h.com/uploads/image_lmht/1609059162/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock8", "mock8"),
        new AccountProfile(
          1609059152,
          30,
          68342,
          148,
          1042,
          "https://acclienminh24h.com/uploads/image_lmht/1609059152/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock9", "mock9"),
        new AccountProfile(
          1609059173,
          30,
          58734,
          147,
          955,
          "https://acclienminh24h.com/uploads/image_lmht/1609059173/0.jpg"
        )
      )
    );

    this.data.push(
      new Account(
        new AccountAuthen("mock10", "mock10"),
        new AccountProfile(
          1609090327,
          30,
          654645,
          145,
          908,
          "https://acclienminh24h.com/uploads/image_lmht/1609090327/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock11", "mock11"),
        new AccountProfile(
          1609090335,
          30,
          88888,
          146,
          969,
          "https://acclienminh24h.com/uploads/image_lmht/1609090335/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock12", "mock12"),
        new AccountProfile(
          1609087157,
          30,
          47592,
          147,
          592,
          "https://acclienminh24h.com/uploads/image_lmht/1609087157/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock13", "mock13"),
        new AccountProfile(
          1609090403,
          30,
          68734,
          137,
          543,
          "https://acclienminh24h.com/uploads/image_lmht/1609090403/0.jpg"
        )
      )
    );
    this.data.push(
      new Account(
        new AccountAuthen("mock14", "mock14"),
        new AccountProfile(
          1609059499,
          30,
          53464,
          146,
          212,
          "https://acclienminh24h.com/uploads/image_lmht/1609059499/0.jpg"
        )
      )
    );

    // demo
    this.data.push(
      new Account(
        new AccountAuthen("mock15", "mock15"),
        new AccountProfile(
          1609059339,
          30,
          69584,
          147,
          842,
          "https://acclienminh24h.com/uploads/image_lmht/1609059339/0.jpg"
        )
      )
    );
  }

  getAccount(username: string, password: string): Account | null {
    for (let i = 0; i < this.data.length; i++) {
      const acc: Account = this.data[i];
      if (
        acc.accountAuthen.password == password &&
        acc.accountAuthen.username == username
      ) {
        return acc;
      }
    }
    return null;
  }
}

const game = new gameCenter();

export default game;
