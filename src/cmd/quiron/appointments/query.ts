import { db } from "../../../database/database";

const listAppointments = async (opts: { format: "json" | "table" }) => {
  console.log("[Quiron] :: Listing appointments");

  try {
    const conn = await db.connection.open();

    const query = await conn.query(`SELECT * FROM ChatBotCitas`);

    if (opts.format === "table") {
      console.table(query.recordset);
    } else {
      console.log(query.recordset);
    }

    conn.close();
  } catch (err) {
    console.log(err);
  }
};

export { listAppointments };
