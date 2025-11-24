import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { c as cn } from './router-1d_kQrZ6.js';
const Input = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx('input', {
    className: cn(
      'block w-full rounded-base border border-border dark:border-darkBorder bg-background dark:bg-darkBg px-4 py-2 text-text dark:text-darkText shadow-light dark:shadow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 transition-transform duration-300',
      className,
    ),
    ref,
    ...props,
  });
});
Input.displayName = 'Input';
export { Input as I };
