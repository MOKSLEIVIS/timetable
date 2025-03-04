import './style.css';

import { Header } from '@/app/components/Header/Header';
import { LoginForm } from '@/app/components/LoginForm/LoginForm';

export default function Page() {
    return (
        <>
            <Header />
            <main>
                <div className='login-form-wrapper'>
                    <LoginForm />
                </div>
            </main>
        </>
    );
}