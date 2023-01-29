export interface IEvaluator  {
  calculate: (expression: string) => Promise<number | undefined>
  generateHistory: () => Promise<string[]>;
}