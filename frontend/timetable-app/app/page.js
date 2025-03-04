import './style.css';

import { Header } from '@/app/components/Header/Header';
import { Timetable } from '@/app/components/Timetable/Timetable';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Timetable />
            </main>
        </>
    );
}
