export interface IHashService {
  hash(data: string): Promise<string>;
  compareHash(data: string, hashed: string): Promise<boolean>;
}
