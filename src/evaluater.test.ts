import { Evaluator} from './evaluator';


describe('evaluate', () => {

  const evaluator = new Evaluator();

  it('handles addition in a string expression', () => {
    const result = evaluator.calculate('2+2');
    expect(result).toEqual(4);
  })
  it('handles subtraction in a string expression', () => {
    const result = evaluator.calculate('6-3');
    expect(result).toEqual(3);
  })
})