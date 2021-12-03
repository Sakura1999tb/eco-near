@nearBindgen
export class AccountProfile {
  public id: u64;
  public level: u64;
  public wallet: u64;
  public champions: u64;
  public skins: u64;
  public image: string;

  constructor(
    id: u64,
    level: u64,
    wallet: u64,
    champions: u64,
    skins: u64,
    image: string
  ) {
    this.id = id;
    this.level = level;
    this.wallet = wallet;
    this.champions = champions;
    this.skins = skins;
    this.image = image;
  }
}

@nearBindgen
export class AccountAuthen {
  public username: string;
  public password: string;

  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}

@nearBindgen
export class Account {
  public accountAuthen: AccountAuthen;
  public accountProfile: AccountProfile;
  constructor(accountAuthen: AccountAuthen, accountProfile: AccountProfile) {
    this.accountAuthen = accountAuthen;
    this.accountProfile = accountProfile;
  }
}
