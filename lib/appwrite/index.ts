import { config } from "@/config/app.config";
import { Account, Avatars, Client } from "react-native-appwrite";

class Appwrite {
  protected client = new Client();
  protected avatar: Avatars;
  protected account: Account;
  constructor() {
    this.client
      .setProject(config.projectId)
      .setEndpoint(config.endpoint)
      .setPlatform(config.platform);

    this.avatar = new Avatars(this.client);
    this.account = new Account(this.client);
  }
}

export default Appwrite;
