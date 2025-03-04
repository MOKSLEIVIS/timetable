'use client';

import './style.css';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { login } from '@/app/lib/actions';

export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <form action={loginAction}>
            {state?.errors?.userDoesntExist && (
                <p className='error-text'>{state.errors.userDoesntExist}</p>
            )}
            {state?.errors?.userWrong && (
                <p className='error-text'>{state.errors.userWrong}</p>
            )}
            <div className='username-field'>
                <input id='username' name='username' placeholder='Naudotojo vardas' type='text' />
            </div>
            {state?.errors?.username && (
                <p className='error-text'>{state.errors.username}</p>
            )}
            <div className='password-field'>
                <input id='password' name='password' placeholder='Slaptažodis' type='password' />
            </div>
            {state?.errors?.password && (
                <p className='error-text'>{state.errors.password}</p>
            )}
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
        <button className='submit-button' disabled={pending} type='submit'>Prisijungti</button>
    );
}