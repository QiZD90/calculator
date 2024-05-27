import { BackspaceIcon } from '@/components/icons/BackspaceIcon';
import { DivideIcon } from '@/components/icons/DivideIcon';
import { MultiplyIcon } from '@/components/icons/MultiplyIcon';
import { PlusMinusIcon } from '@/components/icons/PlusMinusIcon';
import { RoundBracketsIcon } from '@/components/icons/RoundBracketsIcon';
import { useState } from 'react';
import {
  Token,
  Operator,
  expressionToString,
  isOperator,
  isBracket,
  isNumber,
  noUnclosedBrackets,
  closeUnclosedBrackets,
} from '@/lib/tokens';

function History({ history }: { history: string }) {
  return (
    <div className='flex justify-end items-center text-white text-3xl'>
      {history}
    </div>
  );
}

function Expression({ expression }: { expression: Token[] }) {
  return (
    <div className='flex justify-end items-center text-white text-7xl'>
      {expressionToString(expression)}
    </div>
  );
}

enum KeyColor {
  Low = 'bg-low',
  High = 'bg-high',
  Accent = 'bg-accent',
}

function Key({
  display,
  color,
  action,
}: {
  display: any;
  color: KeyColor;
  action: any;
}) {
  return (
    <div
      className={
        'flex flex-col justify-center items-center h-18 text-4xl text-white rounded-3xl ' +
        color +
        ' active:bg-white transition-colors duration-300 ease-out'
      }
      onClick={action}
    >
      {display}
    </div>
  );
}

function Keyboard({
  setCurrentExpression,
  setHistory,
}: {
  setCurrentExpression: React.Dispatch<React.SetStateAction<Token[]>>;
  setHistory: React.Dispatch<React.SetStateAction<string>>;
}) {
  let clear = () => {
    setCurrentExpression(['0']);
    setHistory('');
  };

  let calculate = () => {
    setCurrentExpression((prev) => {
      let expr = closeUnclosedBrackets(prev);

      let result = eval(expressionToString(expr)); // TODO: heck no, eval is evil
      setHistory(expressionToString(expr) + ' = ' + result);

      return [result];
    });
  };

  let addDigit = (n: string) => {
    return () => {
      setCurrentExpression((prev) => {
        if (prev.length <= 0) {
          return prev;
        }

        let last = prev[prev.length - 1];
        if (last == Operator.BracketClose) {
          return [...prev, Operator.Multiply, n];
        }
        if (isOperator(last)) {
          return [...prev, n];
        }

        if (last == '0') {
          return [...prev.slice(0, -1), n];
        }

        return [...prev.slice(0, -1), last + n];
      });
    };
  };

  let addBracket = () => {
    setCurrentExpression((prev) => {
      if (prev.length <= 0) {
        return [Operator.BracketOpen];
      }

      let last = prev[prev.length - 1];
      if (last === '0' && prev.length == 1) {
        return [Operator.BracketOpen];
      }

      if (last == Operator.BracketOpen) {
        return [...prev, Operator.BracketOpen];
      }

      if (
        noUnclosedBrackets(prev) &&
        (last === Operator.BracketClose || (isNumber(last) && last != '0'))
      ) {
        return [...prev, Operator.Multiply, Operator.BracketOpen];
      }

      if (isOperator(last) && !isBracket(last)) {
        return [...prev, Operator.BracketOpen];
      }

      return [...prev, Operator.BracketClose];
    });
  };

  let addDot = () => {
    setCurrentExpression((prev) => {
      if (prev.length <= 0) {
        return prev;
      }

      let last = prev[prev.length - 1];
      if (last.toString().includes('.')) {
        return prev;
      }

      return [...prev.slice(0, -1), last + '.'];
    });
  };

  let addOperator = (o: Operator) => {
    return () => {
      setCurrentExpression((prev) => {
        if (prev.length <= 0) {
          return prev;
        }

        let last = prev[prev.length - 1];
        if (isOperator(last) || last[last.length - 1] == '.') {
          return prev;
        }

        return [...prev, o];
      });
    };
  };

  let addUnaryMinus = () => {
    setCurrentExpression((prev) => {
      if (prev.length <= 0) {
        return prev;
      }

      let last = prev[prev.length - 1];
      if (isNumber(last)) {
        if (
          prev.length >= 3 &&
          prev[prev.length - 2] == Operator.UnaryMinus &&
          prev[prev.length - 3] == Operator.BracketOpen
        ) {
          return [...prev.slice(0, -3), last];
        }

        if (prev.length >= 2 && prev[prev.length - 2] == Operator.UnaryMinus) {
          // TODO: when proper eval is implemented, negative numbers should be UNARY MINUS + number
          return [...prev.slice(0, -2), last];
        }

        return [
          ...prev.slice(0, -1),
          Operator.BracketOpen,
          Operator.UnaryMinus,
          last,
        ];
      }

      if (last == Operator.BracketClose) {
        return [
          ...prev,
          Operator.Multiply,
          Operator.BracketOpen,
          Operator.UnaryMinus,
        ];
      }

      if (
        prev.length >= 2 &&
        prev[prev.length - 1] == Operator.UnaryMinus &&
        prev[prev.length - 2] == Operator.BracketOpen
      ) {
        return [...prev.slice(0, -2)];
      }

      return [...prev, Operator.BracketOpen, Operator.UnaryMinus];
    });
  };

  let backspace = () => {
    setCurrentExpression((prev) => {
      if (prev.length <= 0) {
        return ['0'];
      }

      let last = prev[prev.length - 1];
      if (isOperator(last)) {
        return [...prev.slice(0, -1)];
      }

      if (last.length == 1) {
        if (prev.length == 1) {
          return ['0'];
        }

        return [...prev.slice(0, -1)];
      }

      return [...prev.slice(0, -1), last.slice(0, -1)];
    });
  };

  let keys = [
    { display: 'C', color: KeyColor.High, action: clear },
    { display: <PlusMinusIcon />, color: KeyColor.High, action: addUnaryMinus },
    {
      display: <RoundBracketsIcon />,
      color: KeyColor.High,
      action: addBracket,
    },
    {
      display: <DivideIcon />,
      color: KeyColor.High,
      action: addOperator(Operator.Divide),
    },

    { display: '7', color: KeyColor.Low, action: addDigit('7') },
    { display: '8', color: KeyColor.Low, action: addDigit('8') },
    { display: '9', color: KeyColor.Low, action: addDigit('9') },
    {
      display: <MultiplyIcon />,
      color: KeyColor.Accent,
      action: addOperator(Operator.Multiply),
    },

    { display: '4', color: KeyColor.Low, action: addDigit('4') },
    { display: '5', color: KeyColor.Low, action: addDigit('5') },
    { display: '6', color: KeyColor.Low, action: addDigit('6') },
    {
      display: '-',
      color: KeyColor.Accent,
      action: addOperator(Operator.Minus),
    },

    { display: '1', color: KeyColor.Low, action: addDigit('1') },
    { display: '2', color: KeyColor.Low, action: addDigit('2') },
    { display: '3', color: KeyColor.Low, action: addDigit('3') },
    {
      display: '+',
      color: KeyColor.Accent,
      action: addOperator(Operator.Plus),
    },

    { display: '.', color: KeyColor.Low, action: addDot },
    { display: '0', color: KeyColor.Low, action: addDigit('0') },
    { display: <BackspaceIcon />, color: KeyColor.Low, action: backspace },
    { display: '=', color: KeyColor.Accent, action: calculate },
  ];

  return (
    <div className='grid grid-cols-4 gap-4'>
      {keys.map((x, i) => (
        <Key
          display={x.display}
          color={x.color}
          action={x.action}
          key={i}
        />
      ))}
    </div>
  );
}

export default () => {
  let [currentExpression, setCurrentExpression] = useState(['0'] as Token[]);
  let [history, setHistory] = useState('');

  return (
    <div className='flex w-svw h-svh justify-center'>
      <div className='flex flex-col w-full lg:w-1/2 h-full px-10 py-10'>
        <div className='flex-1'></div>
        <div className='flex-shrink-0 flex flex-col gap-y-4'>
          <History history={history} />
          <Expression expression={currentExpression} />
          <Keyboard
            setCurrentExpression={setCurrentExpression}
            setHistory={setHistory}
          />
        </div>
      </div>
    </div>
  );
};
