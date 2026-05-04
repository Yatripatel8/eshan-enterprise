'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'admin_session';

function makeToken() {
  const secret = process.env.SESSION_SECRET ?? 'eshan-enterprise-admin-2025';
  return Buffer.from(`${secret}:authenticated`).toString('base64');
}

export async function login(prevState: { error?: string } | null, formData: FormData) {
  const email = (formData.get('email') as string ?? '').trim();
  const password = (formData.get('password') as string ?? '').trim();


  const validEmail = process.env.ADMIN_EMAIL ?? 'patelvinod408@gmail.com';
  const validPassword = process.env.ADMIN_PASSWORD ?? 'PatelVinod54321';

  if (email !== validEmail || password !== validPassword) {
    return { error: 'Invalid email or password.' };
  }

  const store = await cookies();
  store.set(COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  redirect('/admin');
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect('/admin/login');
}
