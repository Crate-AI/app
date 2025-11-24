import { jsx, jsxs } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { c as cn } from './router-1d_kQrZ6.js';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check, ChevronUp } from 'lucide-react';
const labelVariants = cva(
  'text-sm font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);
const Label = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(LabelPrimitive.Root, {
    ref,
    className: cn(labelVariants(), className),
    ...props,
  }),
);
Label.displayName = LabelPrimitive.Root.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) =>
    /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
      ref,
      className: cn(
        'flex h-10 w-full items-center text-text dark:text-darkText bg-white dark:bg-darkBg justify-between rounded-base border-2 border-border dark:border-darkBorder px-3 py-2 text-sm font-base ring-offset-white placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
          asChild: true,
          children: /* @__PURE__ */ jsx(ChevronDown, { className: 'h-4 w-4' }),
        }),
      ],
    }),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
    ref,
    className: cn(
      'flex cursor-default text-text items-center justify-center py-1',
      className,
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: 'h-4 w-4' }),
  }),
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) =>
    /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
      ref,
      className: cn(
        'flex cursor-default text-text items-center justify-center py-1 font-base',
        className,
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDown, { className: 'h-4 w-4' }),
    }),
);
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(
  ({ className, children, position = 'popper', ...props }, ref) =>
    /* @__PURE__ */ jsx(SelectPrimitive.Portal, {
      children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
        ref,
        className: cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-base border-2 border-border dark:border-darkBorder bg-main font-base text-text data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        ),
        position,
        ...props,
        children: [
          /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
          /* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
            className: cn(
              'p-1',
              position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            ),
            children,
          }),
          /* @__PURE__ */ jsx(SelectScrollDownButton, {}),
        ],
      }),
    }),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(SelectPrimitive.Label, {
    ref,
    className: cn(
      'border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base text-black/80',
      className,
    ),
    ...props,
  }),
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
    ref,
    className: cn(
      'relative flex w-full text-text cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base outline-none focus:border-border dark:focus:border-darkBorder data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx('span', {
        className:
          'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, {
          children: /* @__PURE__ */ jsx(Check, { className: 'h-4 w-4' }),
        }),
      }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children }),
    ],
  }),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
    ref,
    className: cn(
      '-mx-1 my-1 h-px bg-border dark:border-darkBorder',
      className,
    ),
    ...props,
  }),
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export {
  Label as L,
  Select as S,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectItem as d,
};
