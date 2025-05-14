export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string | undefined;
  password: string | undefined;
  database: string;
  entities: Record<string, any>[];
  synchronize: boolean;
}
