import { connect } from "mongoose";

import { CloudDB_URL } from "./constans.js";

export default async function mongooseInit() {
  try {
    await connect(CloudDB_URL, { dbName: "CookingTogether" });

    console.log("Successfully connect to cloud DB!");
  } catch (error) {
    console.log("Failed to connect to cloud DB!");
    console.log(error.message);
  }
}
