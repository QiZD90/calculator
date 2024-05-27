export enum Operator {
  Plus = '+',
  Minus = '-',
  UnaryMinus = '--',
  Divide = '/',
  Multiply = '*',
  BracketOpen = '(',
  BracketClose = ')',
}

export type TokenNumber = string;

export type Token = TokenNumber | Operator;

export function isOperator(t: Token): boolean {
  return Object.values(Operator)
    .map((o) => o.toString())
    .includes(t);
}

export function isBracket(t: Token): boolean {
  return t == Operator.BracketClose || t == Operator.BracketOpen;
}

export function isNumber(t: Token): boolean {
  return !isOperator(t);
}

export function noUnclosedBrackets(expression: Token[]): boolean {
  let brackets = 0;

  for (let t of expression) {
    if (t == Operator.BracketOpen) {
      brackets++;
    } else if (t == Operator.BracketClose) {
      brackets--;
    }
  }

  return brackets <= 0;
}

export function closeUnclosedBrackets(expression: Token[]): Token[] {
  let brackets = 0;

  for (let t of expression) {
    if (t == Operator.BracketOpen) {
      brackets++;
    } else if (t == Operator.BracketClose) {
      brackets--;
    }
  }

  let newExpression = [...expression];
  for (let i = 0; i < brackets; i++) {
    newExpression.push(Operator.BracketClose);
  }

  return newExpression;
}

export function expressionToString(expression: Token[]): string {
  let expressionStr = '';
  for (let t of expression) {
    if (isNumber(t)) {
      expressionStr += String(t);
    } else if (isBracket(t)) {
      expressionStr += String(t);
    } else if (t == Operator.UnaryMinus) {
      expressionStr += '-';
    } else if (isOperator(t)) {
      expressionStr += ' ' + String(t) + ' ';
    }
  }

  return expressionStr;
}
