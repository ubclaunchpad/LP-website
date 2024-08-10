'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  

  const { token, record: model } = await pb
    .collection('users')
    .authWithPassword(email, password);

  const cookie = JSON.stringify({ token, model });

  cookies().set('pb_auth', cookie, {
    secure: true,
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
  });

  console.log('Logged in');
  redirect('/portal/applications');
}

export async function logout() {
  cookies().delete('pb_auth');
  redirect('/');
}