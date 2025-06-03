import { IUploadsService } from 'src/lib/common/domain/providers/interfaces/uploads/uploads.service.interface';
import { RequestTimeoutException } from '@nestjs/common';
import { IUploadFile } from 'src/lib/common/domain/providers/interfaces/uploads/upload-file.interface';
import { IUploadsProvider } from './provider/interface/uploads.provider.interface';

export class UploadsService implements IUploadsService {
  constructor(private readonly _uploadsProvider: IUploadsProvider) {}

  async uploadFile(file: IUploadFile, folderPath: string): Promise<string> {
    try {
      return await this._uploadsProvider.uploadFile(file, folderPath);
    } catch {
      throw new RequestTimeoutException();
    }
  }
}
