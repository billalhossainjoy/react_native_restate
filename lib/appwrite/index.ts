import { config } from "@/config/app.config";
import { Account, Avatars, Client } from "react-native-appwrite";

class Appwrite {
  client = new Client();
  avatar: Avatars;
  account: Account;
  constructor() {
    this.client
      .setProject(config.projectId)
      .setEndpoint(config.endpoint)
      .setPlatform(config.platform);

    this.avatar = new Avatars(this.client);
    this.account = new Account(this.client);
  }

  async getCurrentUser() {
    try {
      const response = await this.account.get();
      if (response.$id) {
        const userAvatar = this.avatar.getInitials(response.name);
        console.log(response);
        return {
          ...response,
          avatar: userAvatar,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default Appwrite;
