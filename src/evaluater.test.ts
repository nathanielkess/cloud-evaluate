import { Evaluator } from './evaluator';


describe('Evaluator', () => {
  describe('calculate()', () => {
    const evaluator = new Evaluator();
  
    it('handles addition in a string expression or randomly throws an error', async () => {
      try {
        const result = await evaluator.calculate('2+2');
        expect(result).toEqual(4);
      } catch (error) {
        const e = error as Error;
        expect(e.message).toEqual('whoops')
      }
    })
    it('handles subtraction in a string expression or randomly throws an error', async () => {
      try {
        const result = await evaluator.calculate('6-3');
        expect(result).toEqual(3);
      } catch (error) {
        const e = error as Error;
        expect(e.message).toEqual('whoops')
      }
    })
    it('handles multiplication in a string expression or randomly throws an error', async () => {
      try {
        const result = await evaluator.calculate('2*5');
        expect(result).toEqual(10);
      } catch (error) {
        const e = error as Error;
        expect(e.message).toEqual('whoops')
      }
    })
    it('handles division in a string expression or randomly throws an error', async () => {
      try {
        const result = await evaluator.calculate('4/2');
        expect(result).toEqual(2);
      } catch (error) {
        const e = error as Error;
        expect(e.message).toEqual('whoops')
      }
    })
  })

  describe('generateHistory', () => {
    const evaluator = new Evaluator();
    
    it('should return a list of successfully calculated expressions and their values', async () => {

      const sessionHistory: string[] = [];
      
      await evaluator.calculate('2+2')
        .then((result) => history.push(`2+2=${result}`))
        .catch(() => { /*ignore*/ })

      await evaluator.calculate('6-3')
        .then((result) => history.push(`6-3=${result}`))
        .catch(() => { /*ignore*/ })

      const history:string[] = await evaluator.generateHistory();
      expect(history).toEqual(expect.arrayContaining(sessionHistory))
    })
  })

})