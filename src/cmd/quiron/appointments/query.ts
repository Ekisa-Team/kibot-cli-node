import { getConnection } from "../../../database/connection";
import { readGlobalConfig } from "../../../utils/config";
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
    const pool = await getConnection();
    const query = await pool.request().query(`SELECT * FROM ChatBotCitas`);
    const appointments = query.recordset;

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      Logger.log("No appointments were found");
      process.exit(0);
    }

    // Validate display format
    if (opts.format === "table") {
      Logger.table(query.recordset);
    } else {
      Logger.log(query.recordset);
    }
  } catch (err) {
    Logger.error(err);
  }
};

const prepareAppointments = async () => {
  Logger.info(`${NAMESPACE} :: (prepare) => Preparing appointments`);

  try {
    const pool = await getConnection();
    const query = await pool.request().query(`exec SpGrabarCitasChatBot`);
    Logger.log(`Rows affected: ${query.rowsAffected}`);
  } catch (err) {
    Logger.error(err);
  }
};

const uploadAppointments = async () => {
  const quironConfig = readGlobalConfig()?.apps?.quiron;
  const { client, webhooks } = quironConfig || {};

  if (!client) {
    Logger.error("Client config was not found");
  }

  if (!webhooks) {
    Logger.error("Webhook config was not found");
  }

  Logger.info(`${NAMESPACE} :: (upload) => Uploading appointments`);

  try {
    const pool = await getConnection();

    // Fetch appointments
    const query = await pool.query(`SELECT * FROM ChatBotCitas`);
    const appointments = query.recordset;

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      Logger.warn(
        "No appointments were found. Make sure to prepare them first."
      );
      process.exit(0);
    }

    // Generate appointment payload
    const payload = {
      Citas: appointments,
      IdCliente: client,
    };

    // Call HTTP service to upload appointments
    const response = await HttpService.post(
      webhooks!.uploadAppointments!,
      payload
    );

    checkHttpStatus(response);

    const responseBody = JSON.stringify(await response.json(), null, 2);
    Logger.log(responseBody);
  } catch (err) {
    if (err instanceof HTTPResponseError) {
      Logger.error(err.response.text());
    } else {
      Logger.error(err);
    }
  }
};

export { listAppointments, prepareAppointments, uploadAppointments };
