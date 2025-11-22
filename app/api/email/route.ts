
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const { email } = await request.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev', // Replace with your email
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
