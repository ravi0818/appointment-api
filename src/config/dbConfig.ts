// src/config/dbConfig.ts
export const dbConfig = {
  uri: process.env.MONGO_URI || "mongodb://localhost:27017/appointments",
};
