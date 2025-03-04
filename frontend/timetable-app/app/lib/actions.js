'use server';

import { permanentRedirect, redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from './session';

const loginSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Slapyvardis turi būti bent 3 raidžių.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Slaptažodis turi būti bent 8 raidžių.' })
        .trim(),
});

export async function login(prevState, formData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { username, password } = result.data;

    const isRegisteredResponse = await fetch(`http://localhost:3000/api/checkRegisteredUser?username=${username}`);

    const isRegisteredRespResult = await isRegisteredResponse.json();

    if (isRegisteredRespResult.registered) {
        const response = await fetch(`http://localhost:3000/api/getUserPassword?username=${username}`);

        const respResult = await response.json();

        const passwordMatching = await bcrypt.compare(password, respResult.password);

        if (passwordMatching) {
            await createSession(respResult.user_id, username);

            permanentRedirect('/dashboard');
        } else {
            return {
                errors: { userWrong: ['Slapyvardis arba slaptažodis yra neteisingas!'] }
            }
        }
    } else {
        return {
            errors: { userDoesntExist: ['Paskyra su šiuo slapyvardžiu neegzistuoja!'] }
        }
    }
}

export async function logout() {
    await deleteSession();

    redirect('/login');
}