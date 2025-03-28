export interface IUsersUseCase<TOutput, TId = void, TInput = void> {
  execute(id: TId, input: TInput): Promise<TOutput>;
}
