import { IEvaluator } from "./evaluator.types";
import { probability } from './utils/probability';


export class Evaluator implements IEvaluator {

  private sessionStorage: string[] = []

  constructor() {
    this.sessionStorage = []
    this.calculate = this.calculate.bind(this);
  }

  private storeEvaluation(expression: string, value?: number) {
    if(!!value && !isNaN(value))
      this.sessionStorage = [
        ...this.sessionStorage,
        `${expression}=${value}`
      ]
  }


  private evaluateFirstPass(equation: string[]) {
    const firstPass = [];
  
    for (let i = 0; i < equation.length; i++) {
      if (/\*|\//.test(equation[i])) {
        const toCompute = [];
        
        for (let j = i - 1; j < equation.length; j++, i++) {
          /*eslint-disable */
          if (/^\+|\-$/.test(equation[j])) break;
          /*eslint-enable */
          toCompute.push(equation[j]);
        }
        
        let result = +toCompute[0];
        
        for (let j = 1; j < toCompute.length; j++) {
          if ("*" === toCompute[j]) {
            result *= +toCompute[++j];
          }
          else if ("/" === toCompute[j]) {
            const rhs = +toCompute[++j];
            
            if (rhs == 0) return false;
            
            result = Math.floor(result / rhs);
          }
        }
        
        firstPass[firstPass.length-1] = result;
        i -= 2;
      }
      else {
        firstPass.push(equation[i]);
      }
    }
    
    return firstPass;
  }

  private mergeSubtractionSigns(equation:string[]) {
    const res = [];
  
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] === "-") {
        if (/\d/.test(equation[i-1])) {
          res.push("+", "0", "-");
          i++
        }
        else {
          equation[++i] = "" + -+equation[i];
        }
      }
      
      res.push(equation[i]);
    }
    
    return res;
  }

  public calculate(expression: string): Promise<number | undefined> {
    const firstPass = this.evaluateFirstPass(
      this.mergeSubtractionSigns(expression.match(/\d+|\D/g) || [])
    );
    let result: number;
    
    if (firstPass) {
      result = +firstPass[0];
      
      for (let i = 1; i < firstPass.length; i++) {
        result += (firstPass[i] === "+" ? 1 : -1) * +firstPass[++i];
      }
    }

    
    return new Promise<number>((resolve, reject) => {
      const passes = probability(.75);
      if(passes) {
        this.storeEvaluation(expression, result);
        return resolve(result)
      }
      const error = new Error('whoops')
      return reject(error);
    })
    
  }

  public generateHistory():Promise<string[]> {
    return new Promise((resolve) => {
      return resolve(this.sessionStorage)
    });
  }

}