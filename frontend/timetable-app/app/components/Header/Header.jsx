'use client';

import './style.css';

import { getSession } from '@/app/lib/getSession';
import { useState, useEffect } from 'react';
import { logout } from '@/app/lib/actions';

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState();

    const [isUserCardClicked, setUserCardClicked] = useState();

    useEffect(() => {
        async function checkLogin() {
            const loggedIn = await getSession();

            if (loggedIn.userId) {
                setIsLoggedIn(loggedIn);
            }
        }
        checkLogin();
    }, []);

    function handleCardClick() {
        if (!isUserCardClicked) {
            setUserCardClicked(true);
        } else {
            setUserCardClicked(false);
        }
    }

    return (
        <header>
            <div className='logo'>
                <a href='https://kitm.lt'>
                    <img src='/kitm.png' alt='Kitm' draggable='false' />
                </a>
            </div>
            <div className='navbar'>
                <nav>
                    <ul>
                        <li>
                            <a href='/'>
                                Tvarkaraštis
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='login'>
                {!isLoggedIn ? 
                    <a href='/login'>
                        <button className='login-button'>Prisijungti</button>
                    </a>
                :
                    <div className='user-topbar-div'>
                        <div className='user-topbar-card' onClick={() => handleCardClick()}>
                            <img src='/user.png' alt={`${isLoggedIn.username}`} draggable='false' />
                            <p>{isLoggedIn.username}</p>
                        </div>
                        <div className={isUserCardClicked ? 'dropdown-div' : 'dropdown-div-invisible'}>
                            <div className='dashboard-div'>
                                <a href='/dashboard'>
                                    <button>Skydelis</button>
                                </a>
                            </div>
                            <div className='logout-div'>
                                <button onClick={() => logout()}>Atsijungti</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </header>
    );
}