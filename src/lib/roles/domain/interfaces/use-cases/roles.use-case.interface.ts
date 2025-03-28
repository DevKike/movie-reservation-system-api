export interface IRolesUseCase<TOutput> {
  execute(): Promise<TOutput>;
}
