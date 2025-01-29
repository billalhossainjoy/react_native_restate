import { config } from "@/config/app.config";
import Appwrite from "..";
import { Query } from "react-native-appwrite";

class Features extends Appwrite {
  constructor() {
    super();
    this.getLatestProperties = this.getLatestProperties.bind(this)
    this.getProperties = this.getProperties.bind(this)
  }

  async getLatestProperties() {

    try {
      const result = await this.databases.listDocuments(
        config.DATABASE_ID,
        config.PROPERTIES_COLLECTION_ID,
        [Query.orderAsc("$createdAt"), Query.limit(5)]
      );

      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getProperties({
    filter,
    query,
    limit,
  }: {
    filter: string;
    query: string;
    limit: number;
  }) {
    try {
      const buildQuery = [Query.orderDesc("$createdAt")];

      if (filter && filter !== "All")
        buildQuery.push(Query.equal("type", filter));

      if (query)
        buildQuery.push(
          Query.or([
            Query.search("name", query),
            Query.search("address", query),
            Query.search("type", query),
          ])
        );

      const result = await this.databases.listDocuments(
        config.DATABASE_ID,
        config.PROPERTIES_COLLECTION_ID,
        buildQuery
      );

      console.log(result)

      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new Features();
