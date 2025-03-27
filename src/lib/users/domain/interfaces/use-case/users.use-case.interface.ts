export interface IUsersUseCase<T> {
  execute(): Promise<T>;
}
