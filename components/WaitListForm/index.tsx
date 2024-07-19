"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { waitlistSchema } from '@/app/schemas/waitlistSchema';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const WaitListForm: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(waitlistSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      user_type: 'DJ',
    },
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
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

      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage(null);
      setError('Failed to add to waitlist');
      console.error('Error submitting form', error);

      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white bg-white/90 text-gray-900 placeholder-gray-500 transition-transform duration-300 hover:scale-105"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What kind of digger are you?</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white bg-white/90 text-gray-900 placeholder-gray-500 transition-transform duration-300 hover:scale-105">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DJ">DJ</SelectItem>
                      <SelectItem value="Vinyl Collector">Vinyl Collector</SelectItem>
                      <SelectItem value="Record Store">Record Store</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg text-white font-semibold transition-transform duration-300 hover:scale-105 disabled:bg-gray-400"
            disabled={!form.formState.isValid}
          >
            Join Waitlist
          </Button>
          {message && <p className="text-center text-green-200 mt-4 animate-pulse">{message}</p>}
          {error && <p className="text-center text-red-200 mt-4 animate-pulse">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default WaitListForm;
