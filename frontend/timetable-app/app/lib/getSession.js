'use server';

import { cookies } from 'next/headers'
import { decrypt } from './session';


export const getSession = async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    const resp = {
        userId: session?.userId,
        username: session?.username
    }

    return resp;
}