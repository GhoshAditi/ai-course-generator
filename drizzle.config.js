/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/configs/*",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
    }
  };