import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'store',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_MIGRATIONS_SYNC === 'true',
  migrationsRun: false,
  logging: process.env.DB_LOGGING === 'true',
  useUTC: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
