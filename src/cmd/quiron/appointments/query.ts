import { db } from "../../../database/database";
import { HttpService } from "../../../utils/http-service";
import {
  checkHttpStatus,
  HTTPResponseError,
} from "../../../utils/http-utilities";

const NAMESPACE = "[Quiron|appointments]";

/**
 * List appointments from ChatbotCitas table
 * @param opts command options
 */
const listAppointments = async (opts: { format: "json" | "table" }) => {
  console.log(`${NAMESPACE} :: (list) => Listing appointments`);

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

const prepareAppointments = async () => {
  console.log(`${NAMESPACE} :: (prepare) => Preparing appointments`);

  try {
    const conn = await db.connection.open();

    const query = await conn.query(`exec SpGrabarCitasChatBot`);
    console.log(`Rows affected: ${query.rowsAffected}`);

    conn.close();
  } catch (err) {
    console.log(err);
  }
};

const uploadAppointments = async () => {
  console.log(`${NAMESPACE} :: (upload) => Uploading appointments`);

  try {
    const conn = await db.connection.open();

    // Fetch appointments
    const query = await conn.query(`SELECT * FROM ChatBotCitas`);
    const appointments = query.recordset;
    conn.close();

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      console.log("No appointments were found");
      return;
    }

    // Generate appointment payload
    const payload = {
      Citas: appointments,
      IdCliente: 32, // TODO: must read from config
    };

    // Call HTTP service to upload appointments
    // TODO: must read from config,
    const response = await HttpService.post(
      "https://kibot-quiron-middleware.azurewebsites.net/api/chatbotcita/create",
      payload
    );

    checkHttpStatus(response);

    console.log(await response.json());
  } catch (err) {
    if (err instanceof HTTPResponseError) {
      console.error(err.response.text());
    } else {
      console.error(err);
    }
  }
};

export { listAppointments, prepareAppointments, uploadAppointments };
