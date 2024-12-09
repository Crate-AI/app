import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Define the POST handler
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { email, user_type } = data;

    if (!email || !user_type) {
      return NextResponse.json(
        { error: 'Email and user type are required' },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, user_type }]);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 },
    );
  }
}
