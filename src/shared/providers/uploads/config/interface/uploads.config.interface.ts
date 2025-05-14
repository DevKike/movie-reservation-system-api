import { ProviderType } from '../types/uploads.config.types';

export interface IUploadsConfig {
  provider: ProviderType;
  bucketName: string;
  region?: string;
  baseUrl?: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
    [key: string]: string | undefined;
  };
}
