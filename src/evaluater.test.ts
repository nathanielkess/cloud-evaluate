import { Evaluator} from './evaluator';


describe('evaluate', () => {
  describe('calculate()', () => {
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

  describe('generateHistory', () => {
    const evaluator = new Evaluator();
    evaluator.calculate('2+2');
    evaluator.calculate('6-3');
    
    it('should return a list of expressions and their values', () => {
      const history:string[] = evaluator.generateHistory();
      expect(history).toEqual(expect.arrayContaining(['2+2=4', '6-3=3']))
    })
  })

})