import { connect } from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

//import { CloudDB_URL } from "./constans.js";

export default async function mongooseInit() {
  try {
    await connect(process.env.CLOUD_DB_URL, { dbName: "CookingTogether" });

    console.log("Successfully connect to cloud DB!");
  } catch (error) {
    console.log("Failed to connect to cloud DB!");
    console.log(error.message);
  }
}
