import { IUploadFile } from 'src/lib/common/domain/providers/interfaces/uploads/upload-file.interface';

export interface IUploadsProvider {
  uploadFile(file: IUploadFile, folderPath: string): Promise<string>;
}
