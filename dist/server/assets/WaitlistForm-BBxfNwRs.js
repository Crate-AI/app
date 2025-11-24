import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { B as Button } from './router-1d_kQrZ6.js';
import { I as Input } from './input-BtHci9LN.js';
import {
  w as waitlistSchema,
  F as Form,
  a as FormField,
  b as FormItem,
  c as FormLabel,
  d as FormControl,
  e as FormMessage,
} from './waitlist-BrYeGkcF.js';
import {
  S as Select,
  a as SelectTrigger,
  b as SelectValue,
  c as SelectContent,
  d as SelectItem,
} from './select-CScHJYD6.js';
import '@tanstack/react-router';
import 'sonner';
import 'zustand';
import 'zustand/middleware';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@supabase/supabase-js';
import 'lucide-react';
import '@radix-ui/react-avatar';
import '@radix-ui/react-slot';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-icons';
import '@unpic/react';
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
import 'zod';
import '@radix-ui/react-label';
import '@radix-ui/react-select';
const WaitListForm = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const form = useForm({
    resolver: zodResolver(waitlistSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      user_type: 'DJ',
    },
  });
  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setMessage('Successfully added to waitlist!');
      setError(null);
      setTimeout(() => setMessage(null), 3e3);
      form.reset();
    } catch (error2) {
      setMessage(null);
      setError('Failed to add to waitlist');
      console.error('Error submitting form', error2);
      setTimeout(() => setError(null), 3e3);
    }
  };
  return /* @__PURE__ */ jsx('div', {
    className: 'max-w-lg mx-auto p-8 bg-white text-black rounded-lg',
    style: {
      backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
      backgroundSize: '10px 10px',
    },
    children: /* @__PURE__ */ jsx(Form, {
      ...form,
      children: /* @__PURE__ */ jsxs('form', {
        onSubmit: form.handleSubmit(handleSubmit),
        className: 'space-y-6',
        children: [
          /* @__PURE__ */ jsx(FormField, {
            control: form.control,
            name: 'email',
            render: ({ field }) =>
              /* @__PURE__ */ jsxs(FormItem, {
                children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: 'Email' }),
                  /* @__PURE__ */ jsx(FormControl, {
                    children: /* @__PURE__ */ jsx(Input, {
                      type: 'email',
                      placeholder: 'Enter your email',
                      ...field,
                      required: true,
                      className: 'w-full',
                    }),
                  }),
                  /* @__PURE__ */ jsx(FormMessage, {}),
                ],
              }),
          }),
          /* @__PURE__ */ jsx(FormField, {
            control: form.control,
            name: 'user_type',
            render: ({ field }) =>
              /* @__PURE__ */ jsxs(FormItem, {
                children: [
                  /* @__PURE__ */ jsx(FormLabel, {
                    children: 'What kind of digger are you?',
                  }),
                  /* @__PURE__ */ jsx(FormControl, {
                    children: /* @__PURE__ */ jsx(Controller, {
                      name: 'user_type',
                      control: form.control,
                      render: ({ field: field2 }) =>
                        /* @__PURE__ */ jsxs(Select, {
                          onValueChange: (value) => field2.onChange(value),
                          value: field2.value,
                          children: [
                            /* @__PURE__ */ jsx(SelectTrigger, {
                              className: 'w-full',
                              children: /* @__PURE__ */ jsx(SelectValue, {
                                placeholder: 'Select your role',
                              }),
                            }),
                            /* @__PURE__ */ jsxs(SelectContent, {
                              children: [
                                /* @__PURE__ */ jsx(SelectItem, {
                                  value: 'DJ',
                                  children: 'DJ',
                                }),
                                /* @__PURE__ */ jsx(SelectItem, {
                                  value: 'Record Store',
                                  children: 'Record Store',
                                }),
                                /* @__PURE__ */ jsx(SelectItem, {
                                  value: 'Record Collector',
                                  children: 'Record Collector',
                                }),
                                /* @__PURE__ */ jsx(SelectItem, {
                                  value: 'Other',
                                  children: 'Other',
                                }),
                              ],
                            }),
                          ],
                        }),
                    }),
                  }),
                  /* @__PURE__ */ jsx(FormMessage, {}),
                ],
              }),
          }),
          /* @__PURE__ */ jsx(Button, {
            type: 'submit',
            variant: 'default',
            className: 'w-full font-mono text-small-title',
            disabled: !form.formState.isValid,
            children: 'Join Waitlist',
          }),
          message &&
            /* @__PURE__ */ jsxs('div', {
              className:
                'text-center text-green-600 mt-4 animate-pulse font-mono text-small-subtitle',
              children: [
                /* @__PURE__ */ jsx('p', { children: message }),
                /* @__PURE__ */ jsx('img', {
                  src: '/Brut164.svg',
                  alt: 'Success Icon',
                  width: 50,
                  height: 50,
                  className: 'mx-auto mt-2',
                }),
              ],
            }),
          error &&
            /* @__PURE__ */ jsx('p', {
              className:
                'text-center text-red-600 mt-4 animate-pulse font-mono text-small-subtitle',
              children: error,
            }),
        ],
      }),
    }),
  });
};
export { WaitListForm as default };
