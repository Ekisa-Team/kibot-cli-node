import { db } from "../../../database/database";
import { HttpService } from "../../../utils/http-service";
import {
  checkHttpStatus,
  HTTPResponseError,
} from "../../../utils/http-utilities";
import { Logger } from "../../../utils/logger";

const NAMESPACE = "[Quiron|appointments]";

/**
 * List appointments from ChatbotCitas table
 * @param opts command options
 */
const listAppointments = async (opts: { format: "json" | "table" }) => {
  Logger.info(`${NAMESPACE} :: (list) => Listing appointments`);

  try {
    const conn = await db.connection.open();

    const query = await conn.query(`SELECT * FROM ChatBotCitas`);

    if (opts.format === "table") {
      Logger.table(query.recordset);
    } else {
      Logger.log(query.recordset);
    }

    conn.close();
  } catch (err) {
    Logger.error(err);
  }
};

const prepareAppointments = async () => {
  Logger.info(`${NAMESPACE} :: (prepare) => Preparing appointments`);

  try {
    const conn = await db.connection.open();

    const query = await conn.query(`exec SpGrabarCitasChatBot`);
    Logger.log(`Rows affected: ${query.rowsAffected}`);

    conn.close();
  } catch (err) {
    Logger.error(err);
  }
};

const uploadAppointments = async () => {
  Logger.info(`${NAMESPACE} :: (upload) => Uploading appointments`);

  try {
    const conn = await db.connection.open();

    // Fetch appointments
    const query = await conn.query(`SELECT * FROM ChatBotCitas`);
    const appointments = query.recordset;
    conn.close();

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      Logger.log("No appointments were found");
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

    Logger.log(await response.json());
  } catch (err) {
    if (err instanceof HTTPResponseError) {
      Logger.error(err.response.text());
    } else {
      Logger.error(err);
    }
  }
};

export { listAppointments, prepareAppointments, uploadAppointments };
