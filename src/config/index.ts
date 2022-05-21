import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, LOG_FORMAT, LOG_DIR, DB_CONNECTION_STRING } = process.env;
