import { evaluate } from './evaluate';


describe('evaluate', () => {
  it('handles addition in a string expression', () => {
    const result = evaluate('2+2');
    expect(result).toEqual(4);
  })
  it('handles subtraction in a string expression', () => {
    const result = evaluate('6-3');
    expect(result).toEqual(3);
  })
})