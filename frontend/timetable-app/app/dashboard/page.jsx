import './style.css';

import { Header } from '@/app/components/Header/Header';
import { AdminTimetable } from '@/app/components/AdminTimetable/AdminTimetable';
import { AdminTeachers } from '@/app/components/AdminTeachers/AdminTeachers';

export default function Page() {
    return (
        <>
            <Header />
            <main>
                <AdminTimetable />
                <AdminTeachers />
            </main>
        </>
    );
}