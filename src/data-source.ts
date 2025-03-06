import { DataSource } from 'typeorm';
import { NewsProvider } from './database/entities/news-provider.entity';
import { NewsPattern } from './database/entities/news-pattern.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [NewsProvider, NewsPattern],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
});
