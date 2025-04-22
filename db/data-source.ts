import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (process.env.NODE_ENV === 'develop') {
  console.log('got it', process.env.NODE_ENV);
}

export const dataSourceOptions: DataSourceOptions = {
  ssl: isProduction,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: ['dist/**/*.entity.js'],
  database: process.env.DB_NAME,
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
  logging: true,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
