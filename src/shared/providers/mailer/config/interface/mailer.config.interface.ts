export interface IMailerConfig {
  host: string;
  port: number;
  isSecure: boolean;
  credentials: {
    user: string;
    password: string;
  };
  fromName: string;
  fromAddress: string;
}
