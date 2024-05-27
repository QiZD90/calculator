import React from 'react';
import type { SVGProps } from 'react';

export function BackspaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M19 21H9c-1.436 0-3.145-.88-3.977-2.046l-2.619-3.667l-1.188-1.661c-.246-.344-.249-.894-.008-1.241l1.204-1.686L5.02 7.046C5.855 5.879 7.566 5 9 5h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3M3.229 12.999l.806 1.125l2.618 3.667C7.104 18.424 8.223 19 9.001 19h10c.552 0 1-.45 1-1.001V8c0-.551-.448-1-1-1h-10c-.776 0-1.897.576-2.351 1.209l-2.608 3.652zM13.707 13l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L13 12.293l-2.646-2.646a.5.5 0 0 0-.707.707L12.293 13l-2.646 2.646a.5.5 0 0 0 .707.708L13 13.707l2.646 2.646a.5.5 0 1 0 .708-.706z'
      ></path>
    </svg>
  );
}
