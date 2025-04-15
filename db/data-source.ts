import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: ['dist/**/*.entity.js'],
  database: process.env.DB_NAME,
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
