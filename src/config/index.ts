import dotenv from 'dotenv';
import jsonData from './config.json';

dotenv.config();

export const config = {
    ...jsonData,
    port: process.env['PORT'],
    postgres: {
        ...jsonData.postgres, username: process.env['PG_USERNAME'],
        password: process.env['PG_PASSWORD'],
    },
};