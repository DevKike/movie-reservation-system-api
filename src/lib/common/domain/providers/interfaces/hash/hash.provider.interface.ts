export interface IHashProvider {
  hash(data: string): Promise<string>;
  compareHash(data: string, hashed: string): Promise<boolean>;
}
