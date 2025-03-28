export interface IUsersUseCase<T, K = void> {
  execute(input: K): Promise<T>;
}
