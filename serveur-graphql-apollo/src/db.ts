import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "./db.sqlite3",
  synchronize: true,
  entities: ["./src/models/*.ts"],
  logging: ['query', 'error'],
});
