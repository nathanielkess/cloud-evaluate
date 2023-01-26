export interface IEvaluator  {
  calculate: (expression: string) => number | undefined;
  generateHistory: () => string[]
}