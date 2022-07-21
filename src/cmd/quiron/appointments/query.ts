import chalk from 'chalk';
import { getConnection } from '../../../database/connection';
import { readGlobalConfig } from '../../../utils/config';
import { HttpService } from '../../../utils/http-service';
import { checkHttpStatus, HTTPResponseError } from '../../../utils/http-utilities';
import { Logger } from '../../../utils/logger';

/**
 * List appointments from ChatbotCitas table
 * @param options command options
 */
const listAppointments = async (options: { format: 'json' | 'table' }) => {
  try {
    const pool = await getConnection();
    const query = await pool.request().query(`exec ObtenerChatBotCitas`);
    const appointments = query.recordset;

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      Logger.log('No appointments were found');
      process.exit(0);
    }

    // Validate display format
    if (options.format === 'table') {
      Logger.table(appointments);
    } else {
      Logger.json(appointments);
    }
  } catch (error) {
    Logger.error(error as string);
  }

  process.exit(0);
};

const prepareAppointments = async () => {
  try {
    const pool = await getConnection();
    const query = await pool.request().query(`exec SpGrabarCitasChatBot`);
    Logger.log(`Rows affected: ${query.rowsAffected}`);
  } catch (error) {
    Logger.error(error as string);
  }

  process.exit(0);
};

const uploadAppointments = async () => {
  const quironConfig = readGlobalConfig()?.apps?.quiron;
  const { client, webhooks } = quironConfig || {};

  if (!client) {
    Logger.error('Client config was not found');
  }

  if (!webhooks) {
    Logger.error('Webhook config was not found');
  }

  try {
    const pool = await getConnection();

    // Fetch appointments
    const query = await pool.query(`exec ObtenerChatBotCitas`);
    const appointments = query.recordset;

    // Validate if there are any appointments to upload
    if (appointments.length === 0) {
      Logger.warn('No appointments were found. Make sure to prepare them first.');
      process.exit(0);
    }

    // Generate appointment payload
    const payload = {
      Citas: appointments,
      IdCliente: client,
    };

    // Call HTTP service to upload appointments
    const response = await HttpService.post(webhooks!.uploadAppointments!, payload);

    checkHttpStatus(response);

    // Update appointments status
    const { isSuccess, result } = await response.json();
    if (isSuccess) {
      for (const appointment of result?.responseSend?.result) {
        const stmt = `
          UPDATE ChatBotCitas
          SET Enviado = $1, FechaHoraEnvio = '$2'
          WHERE NumeroCita = $3 AND IdPaciente = $4`
          .replace('$1', Boolean(appointment.enviado) ? '1' : '0')
          .replace('$2', new Date(appointment.fechaHoraEnvio).toISOString())
          .replace('$3', appointment.numeroCita)
          .replace('$4', appointment.idPaciente);

        const updateQuery = await pool.query(stmt);

        Logger.log(
          'Appointment:',
          appointment.numeroCita,

          'Pacient:',
          `${appointment.nombresPaciente} (${appointment.celular})`,

          '->',

          updateQuery.rowsAffected[0] > 0
            ? chalk.green.bold('SUCCEEDED')
            : chalk.red.bold('FAILED'),
        );
      }
    }
  } catch (error) {
    if (error instanceof HTTPResponseError) {
      Logger.error(await error.response.text());
    } else {
      Logger.error(error as string);
    }
  }

  process.exit(0);
};

export { listAppointments, prepareAppointments, uploadAppointments };
