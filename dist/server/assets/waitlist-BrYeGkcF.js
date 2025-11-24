import { jsxs, jsx } from 'react/jsx-runtime';
import { Github, X } from 'lucide-react';
import * as React from 'react';
import React__default from 'react';
import '@hookform/resolvers/zod';
import { c as cn } from './router-1d_kQrZ6.js';
import './input-BtHci9LN.js';
import { Slot } from '@radix-ui/react-slot';
import { FormProvider, Controller, useFormContext } from 'react-hook-form';
import { L as Label } from './select-CScHJYD6.js';
import { z } from 'zod';
const Waitlist = () => {
  return /* @__PURE__ */ jsxs('div', {
    children: [
      /* @__PURE__ */ jsxs('header', {
        className:
          'bg-white text-black p-6 flex justify-between items-center shadow-lg',
        style: {
          backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        },
        children: [
          /* @__PURE__ */ jsx('div', {
            className: 'flex items-center',
            children: /* @__PURE__ */ jsx('img', {
              src: '/logo.svg',
              alt: 'Crate Logo',
              width: 64,
              height: 64,
              className: 'w-16 h-16',
            }),
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center space-x-4',
            children: [
              /* @__PURE__ */ jsx('a', {
                href: 'https://github.com/orgs/Crate-AI/repositories',
                className: 'transition-transform duration-300 hover:scale-110',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: /* @__PURE__ */ jsx('div', {
                  className:
                    'p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark',
                  children: /* @__PURE__ */ jsx(Github, {
                    className: 'w-8 h-8',
                  }),
                }),
              }),
              /* @__PURE__ */ jsx('a', {
                href: 'https://x.com/zpaprikaf',
                className: 'transition-transform duration-300 hover:scale-110',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: /* @__PURE__ */ jsx('div', {
                  className:
                    'p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark',
                  children: /* @__PURE__ */ jsx(X, { className: 'w-8 h-8' }),
                }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(HeroSection, {}),
    ],
  });
};
const Form = FormProvider;
const FormFieldContext = React.createContext({});
const FormField = ({ ...props }) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, {
    value: { name: props.name },
    children: /* @__PURE__ */ jsx(Controller, { ...props }),
  });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
const FormItemContext = React.createContext({});
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, {
    value: { id },
    children: /* @__PURE__ */ jsx('div', {
      ref,
      className: cn('space-y-2', className),
      ...props,
    }),
  });
});
FormItem.displayName = 'FormItem';
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(Label, {
    ref,
    className: cn(
      'font-mono text-medium-title',
      error && 'text-red-500',
      className,
    ),
    htmlFor: formItemId,
    ...props,
  });
});
FormLabel.displayName = 'FormLabel';
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return /* @__PURE__ */ jsx(Slot, {
    ref,
    id: formItemId,
    'aria-describedby': !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    'aria-invalid': !!error,
    className: 'font-mono text-small-title',
    ...props,
  });
});
FormControl.displayName = 'FormControl';
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx('p', {
    ref,
    id: formDescriptionId,
    className: cn(
      'text-small-subtitle font-mono text-text dark:text-darkText',
      className,
    ),
    ...props,
  });
});
FormDescription.displayName = 'FormDescription';
const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ jsx('p', {
      ref,
      id: formMessageId,
      className: cn('text-small-subtitle font-mono text-red-500', className),
      ...props,
      children: body,
    });
  },
);
FormMessage.displayName = 'FormMessage';
const waitlistSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  user_type: z.enum(['DJ', 'Record Store', 'Record Collector', 'Other']),
});
const WaitlistForm = React__default.lazy(
  () => import('./WaitlistForm-BBxfNwRs.js'),
);
const HeroSection = () => {
  return /* @__PURE__ */ jsx('div', {
    className:
      'relative w-full h-screen flex flex-col justify-center items-center bg-white text-black',
    style: {
      backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
      backgroundSize: '10px 10px',
    },
    children: /* @__PURE__ */ jsxs('div', {
      className: 'flex flex-col items-center mt-10',
      children: [
        ' ',
        /* @__PURE__ */ jsx('h1', {
          className:
            'text-large-title font-mono font-bold mb-4 drop-shadow-lg transition-transform duration-300 hover:scale-110',
          children: 'Crate',
        }),
        /* @__PURE__ */ jsxs('p', {
          className:
            'text-medium-title font-mono mb-6 drop-shadow-lg inline-flex items-center',
          children: [
            'Beta under construction, join our waitlist for early access',
            /* @__PURE__ */ jsx('img', {
              src: '/Smile.svg',
              alt: 'Smile',
              width: 27,
              height: 27,
              className: 'ml-2',
            }),
          ],
        }),
        /* @__PURE__ */ jsx('div', {
          className:
            'w-full max-w-lg px-8 py-6 text-black shadow-xs rounded-lg transition-transform duration-300 hover:scale-105',
          children: /* @__PURE__ */ jsx(React__default.Suspense, {
            fallback: /* @__PURE__ */ jsx('div', {
              children: 'Loading form...',
            }),
            children: /* @__PURE__ */ jsx(WaitlistForm, {}),
          }),
        }),
      ],
    }),
  });
};
function WaitlistPage() {
  return /* @__PURE__ */ jsx('div', {
    children: /* @__PURE__ */ jsx('main', {
      children: /* @__PURE__ */ jsx(Waitlist, {}),
    }),
  });
}
const waitlist = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      component: WaitlistPage,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  Form as F,
  FormField as a,
  FormItem as b,
  FormLabel as c,
  FormControl as d,
  FormMessage as e,
  waitlist as f,
  waitlistSchema as w,
};
