type Expression = string

export interface IEvaluator  {
  calculate: (expression: string) => number | undefined;
  generateHistory: () => Expression[]
}