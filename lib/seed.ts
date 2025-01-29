import { ID } from "react-native-appwrite";

import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";
import { config } from "@/config/app.config";
import Appwrite from "./appwrite";

const COLLECTIONS = {
  AGENT: config.AGENT_COLLECTION_ID,
  REVIEWS: config.REVIEWS_COLLECTION_ID,
  GALLERY: config.GALLERIES_COLLECTION_ID,
  PROPERTY: config.PROPERTIES_COLLECTION_ID,
};

const propertyTypes = [
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Studio",
  "Villa",
  "Appartment",
  "Other",
];

const facilities = ["Laundry", "Parking", "Gym", "Wifi", "Pet-friendly"];

class Seed extends Appwrite {
  constructor() {
    super();
    this.getRandomSubset = this.getRandomSubset.bind(this);
    this.seed = this.seed.bind(this);
  }

  getRandomSubset<T>(array: T[], minItems: number, maxItems: number): T[] {
    if (minItems > maxItems) {
      throw new Error("minItems cannot be greater than maxItems");
    }
    if (minItems < 0 || maxItems > array.length) {
      throw new Error(
        "minItems or maxItems are out of valid range for the array"
      );
    }

    // Generate a random size for the subset within the range [minItems, maxItems]
    const subsetSize =
      Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

    // Create a copy of the array to avoid modifying the original
    const arrayCopy = [...array];

    // Shuffle the array copy using Fisher-Yates algorithm
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex],
        arrayCopy[i],
      ];
    }

    // Return the first `subsetSize` elements of the shuffled array
    return arrayCopy.slice(0, subsetSize);
  }

  async seed() {
    try {
      // Clear existing data from all collections
      for (const key in COLLECTIONS) {
        const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
        const documents = await this.databases.listDocuments(
          config.DATABASE_ID!,
          collectionId!
        );
        for (const doc of documents.documents) {
          await this.databases.deleteDocument(
            config.DATABASE_ID!,
            collectionId!,
            doc.$id
          );
        }
      }

      console.log("Cleared all existing data.");

      // Seed Agents
      const agents = [];
      for (let i = 1; i <= 5; i++) {
        const agent = await this.databases.createDocument(
          config.DATABASE_ID!,
          COLLECTIONS.AGENT!,
          ID.unique(),
          {
            name: `Agent ${i}`,
            email: `agent${i}@example.com`,
            avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
          }
        );
        agents.push(agent);
      }
      console.log(`Seeded ${agents.length} agents.`);

      // Seed Reviews
      const reviews = [];
      for (let i = 1; i <= 20; i++) {
        const review = await this.databases.createDocument(
          config.DATABASE_ID!,
          COLLECTIONS.REVIEWS!,
          ID.unique(),
          {
            name: `Reviewer ${i}`,
            avatar:
              reviewImages[Math.floor(Math.random() * reviewImages.length)],
            review: `This is a review by Reviewer ${i}.`,
            rating: Math.floor(Math.random() * 5) + 1, // Rating between 1 and 5
          }
        );
        reviews.push(review);
      }
      console.log(`Seeded ${reviews.length} reviews.`);

      // Seed Galleries
      const galleries = [];
      for (const image of galleryImages) {
        const gallery = await this.databases.createDocument(
          config.DATABASE_ID!,
          COLLECTIONS.GALLERY!,
          ID.unique(),
          { image }
        );
        galleries.push(gallery);
      }

      console.log(`Seeded ${galleries.length} galleries.`);

      // Seed Properties
      for (let i = 1; i <= 20; i++) {
        const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

        const assignedReviews = this.getRandomSubset(reviews, 5, 7); // 5 to 7 reviews
        const assignedGalleries = this.getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

        const selectedFacilities = facilities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * facilities.length) + 1);

        const image =
          propertiesImages.length - 1 >= i
            ? propertiesImages[i]
            : propertiesImages[
                Math.floor(Math.random() * propertiesImages.length)
              ];

        const property = await this.databases.createDocument(
          config.DATABASE_ID!,
          COLLECTIONS.PROPERTY!,
          ID.unique(),
          {
            name: `Property ${i}`,
            type: propertyTypes[
              Math.floor(Math.random() * propertyTypes.length)
            ],
            description: `This is the description for Property ${i}.`,
            address: `123 Property Street, City ${i}`,
            geolocation: `192.168.1.${i}, 192.168.1.${i}`,
            price: Math.floor(Math.random() * 9000) + 1000,
            area: Math.floor(Math.random() * 3000) + 500,
            bedrooms: Math.floor(Math.random() * 5) + 1,
            bathrooms: Math.floor(Math.random() * 5) + 1,
            rating: Math.floor(Math.random() * 5) + 1,
            facilities: selectedFacilities,
            image: image,
            agent: assignedAgent.$id,
            reviews: assignedReviews.map((review) => review.$id),
            galleries: assignedGalleries.map((gallery) => gallery.$id),
          }
        );

        console.log(`Seeded property: ${property.name}`);
      }

      console.log("Data seeding completed.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }
}

export default new Seed();
