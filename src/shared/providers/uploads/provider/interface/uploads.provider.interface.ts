import { IUploadFile } from 'src/lib/common/domain/interfaces/providers/uploads/upload-file.interface';

export interface IUploadsProvider {
  uploadFile(file: IUploadFile, folderPath: string): Promise<string>;
}
