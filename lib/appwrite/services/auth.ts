import { OAuthProvider } from "react-native-appwrite";
import Appwrite from "..";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

class Auth extends Appwrite {
  constructor() {
    super();

    this.getUser = this.getUser.bind(this);
  }

  async login() {
    try {
      const redirectUri = Linking.createURL("/");

      const response = await this.account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );

      if (!response) throw new Error("Failed to Login");

      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );

      if (browserResult.type !== "success") throw new Error("Failed to login");
      const url = new URL(browserResult.url);

      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();

      if (!userId || !secret) throw new Error("Failed to login");

      const session = await this.account.createSession(userId, secret);

      if (!session) throw new Error("Failed to create a session ");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getUser() {
    try {
      const response = await this.account.get();
      if (response.$id) {
        const userAvatar = this.avatar.getInitials(response.name);
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

export default new Auth();
