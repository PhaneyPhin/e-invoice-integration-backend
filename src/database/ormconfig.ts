import { DataSourceOptions } from "typeorm"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config"
import { join } from "path"

const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    join(__dirname, '../entities/*.entity.{ts,js}'),
  ],
  migrations: [
    join(__dirname, '../database/migrations/*.{ts,js}'),
  ],
  synchronize: true,
}

export default dataSourceOption