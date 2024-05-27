import React from 'react';
import type { SVGProps } from 'react';

export function MultiplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 56 56'
      {...props}
    >
      <path
        fill='currentColor'
        d='M13.012 40.012c-.797.797-.82 2.156 0 2.976c.797.82 2.156.797 2.976 0l12-12.023l12.024 12.023c.797.797 2.156.82 2.953 0c.844-.82.82-2.18 0-2.976l-12-12.024l12-12c.82-.797.844-2.18 0-2.976c-.797-.82-2.156-.797-2.953 0L27.988 25.035l-12-12.023c-.82-.797-2.18-.82-2.976 0c-.82.797-.797 2.18 0 2.976l12 12Z'
      ></path>
    </svg>
  );
}
