import { Greeter } from './index';

describe('Greeter', () => {
  it('should greet', () => {
    const greetings = Greeter('John');
    expect(greetings).toEqual('Hello John');
  })
})