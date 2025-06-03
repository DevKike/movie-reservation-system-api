import { IUploadFile } from './upload-file.interface';

export interface IUploadsService {
  uploadFile(file: IUploadFile, folderPath: string): Promise<string>;
}
