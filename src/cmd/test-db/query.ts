import { db } from "../../database/database";

const testDatabaseConnection = async () => {
  console.log("Testing database connection");

  try {
    const conn = await db.connection.open();
    console.log(`Database connection status: ${conn.connected}`);
    conn.close();
  } catch (err) {
    console.log(err);
  }
};

export { testDatabaseConnection };
