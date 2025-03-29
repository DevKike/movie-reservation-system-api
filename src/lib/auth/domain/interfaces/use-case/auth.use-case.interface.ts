export interface IAuthUseCase<TOutput, TInput = void> {
  execute(input: TInput): Promise<TOutput>;
}
