import { ConnectionOptions } from 'typeorm';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'store',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: process.env.DB_LOGGING === 'true',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

Logger.log(config);

fs.writeFile('ormconfig.json', JSON.stringify({
  type: config.type,
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: config.entities,
  migrations: config.migrations,
  synchronize: false,
  logging: config.logger,
  cli: config.cli,
}), (err) => {
  if (err) throw err;
});

export = config;