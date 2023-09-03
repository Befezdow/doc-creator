import { DataSource } from "typeorm";
import {config} from "../config";

export const DataSourceInstance = new DataSource({
    type: "postgres",
    host: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.database,
    synchronize: true, // TODO don't use for production
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
});