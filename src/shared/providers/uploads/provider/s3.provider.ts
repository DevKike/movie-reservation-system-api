import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import uploadsConfig from '../config/uploads.config';
import { Inject, RequestTimeoutException } from '@nestjs/common';
import * as path from 'path';
import { IUploadFile } from 'src/lib/common/domain/interfaces/providers/uploads/upload-file.interface';
import { IUploadsProvider } from './interface/uploads.provider.interface';

export class S3Provider implements IUploadsProvider {
  private readonly _s3Client: S3Client;

  constructor(
    @Inject(uploadsConfig.KEY)
    private readonly _uploadsConfig: ConfigType<typeof uploadsConfig>,
  ) {
    this._s3Client = new S3Client({
      region: this._uploadsConfig.region,
      credentials: {
        accessKeyId: this._uploadsConfig.credentials!.accessKeyId as string,
        secretAccessKey: this._uploadsConfig.credentials!
          .secretAccessKey as string,
      },
    });
  }

  async uploadFile(file: IUploadFile, folderPath: string): Promise<string> {
    try {
      const filePath = this.generateFilePath(file);

      await this._s3Client.send(
        new PutObjectCommand({
          Bucket: this._uploadsConfig.bucketName,
          Body: file.buffer,
          Key: `${folderPath}/${filePath}`,
          ContentType: file.mimetype,
        }),
      );

      return this.getUrl(filePath, folderPath);
    } catch {
      throw new RequestTimeoutException();
    }
  }

  private generateFilePath = (file: IUploadFile): string => {
    const name = file.originalname.split('.')[0];

    name.replace(/\s/g, '').trim();

    const extension = path.extname(file.originalname);

    const timestamp = new Date().getTime().toString().trim();

    return `${name}-${timestamp}${extension}`;
  };

  private getUrl(filePath: string, folderPath: string): string {
    return encodeURI(
      `https://${this._uploadsConfig.bucketName}.s3.${this._uploadsConfig.region}.amazonaws.com/${folderPath}/${filePath}`,
    );
  }
}
