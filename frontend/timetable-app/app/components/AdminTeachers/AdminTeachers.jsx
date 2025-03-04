'use client';

import './style.css';

import { useEffect, useState } from 'react';
import { translateToLithuanian } from '@/app/lib/utils';

export function AdminTeachers() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function AddTeacher() {
        const [teacherFirstName, setTeacherFirstName] = useState('');
        const [teacherLastName, setTeacherLastName] = useState('');
        const [teacherClassroom, setTeacherClassroom] = useState('');
        const [teacherSubject, setTeacherSubject] = useState('');
        const [teacherGroup, setTeacherGroup] = useState('');
        const [isGroupsDropdownClicked, setGroupsDropdownClicked] = useState(false);
        const [isSubjectsDropdownClicked, setSubjectsDropdownClicked] = useState(false);
        const [groupsData, setGroupsData] = useState([]);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getAllGroups`);
    
                const result = await response.json();
    
                setGroupsData(result.data);
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        function handleGroupsDropdownClick() {
            if (!isGroupsDropdownClicked) {
                setGroupsDropdownClicked(true);
            } else {
                setGroupsDropdownClicked(false);
            }
        }

        function handleSubjectsDropdownClick() {
            if (!isSubjectsDropdownClicked) {
                setSubjectsDropdownClicked(true);
            } else {
                setSubjectsDropdownClicked(false);
            }
        }

        async function addNewTeacher(firstName, lastName, classroom, subject, group) {
            if (firstName === '' || firstName === undefined || firstName === null) {
                setErrorMessage(`Įveskite mokytojo(s) vardą!`);

                return;
            }

            if (lastName === '' || lastName === undefined || lastName === null) {
                setErrorMessage(`Įveskite mokytojo(s) pavardę!`);

                return;
            }

            if (classroom === '' || classroom === undefined || classroom === null) {
                setErrorMessage(`Įveskite mokytojo(s) kabinetą!`);

                return;
            }

            if (subject === '' || subject === undefined || subject === null) {
                setErrorMessage(`Pasirinkite mokytojo(s) mokomajį dalyką!`);

                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/addTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstname: firstName, lastname: lastName, classroom: classroom, subject: subject, group: group }),
                });
        
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage(`Mokytoja(s) sekmingai pridėta(s).`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pridėti mokytojo(s)! Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pridėti mokytojo(s)! Bandykite vėl po poros minučių.`);

                return;
            }
        }
        
        return (
            <div className='add-new-group-div'>
                <input type='text' onChange={(e) => setTeacherFirstName(e.target.value)} placeholder='Vardas' />
                <input type='text' onChange={(e) => setTeacherLastName(e.target.value)} placeholder='Pavardė' />
                <input type='text' onChange={(e) => setTeacherClassroom(e.target.value)} placeholder='Kabinetas' />
                <div className='timetable-subjects-div'>
                    <div className='current-subject-div' onClick={() => handleSubjectsDropdownClick()}>
                        <p>{teacherSubject ? translateToLithuanian(teacherSubject) : 'Pasirinkite dalyką'}</p>
                        <img src='/next.png' alt='dropdown icon' draggable='false' className={isSubjectsDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                    </div>
                    <div className={isSubjectsDropdownClicked ? 'subjects-dropdown-div' : 'subjects-dropdown-div-invisible'}>
                        <div onClick={() => setTeacherSubject('english')}>Anglų kalba</div>
                        <div onClick={() => setTeacherSubject('biology')}>Biologija</div>
                        <div onClick={() => setTeacherSubject('chemistry')}>Chemija</div>
                        <div onClick={() => setTeacherSubject('art')}>Dailė</div>
                        <div onClick={() => setTeacherSubject('ethics')}>Etika</div>
                        <div onClick={() => setTeacherSubject('physical-education')}>Fizinis ugdymas</div>
                        <div onClick={() => setTeacherSubject('physics')}>Fizika</div>
                        <div onClick={() => setTeacherSubject('geography')}>Geografija</div>
                        <div onClick={() => setTeacherSubject('it')}>Informatika</div>
                        <div onClick={() => setTeacherSubject('history')}>Istorija</div>
                        <div onClick={() => setTeacherSubject('javascript')}>Javascript</div>
                        <div onClick={() => setTeacherSubject('lithuanian')}>Lietuvių kalba</div>
                        <div onClick={() => setTeacherSubject('music')}>Muzika</div>
                        <div onClick={() => setTeacherSubject('math')}>Matematika</div>
                        <div onClick={() => setTeacherSubject('basics-of-citizenship')}>Pilietiškumo pagrindai</div>
                        <div onClick={() => setTeacherSubject('computer-systems')}>Programavimo aplinkos ir kūrimo procesų valdymas</div>
                        <div onClick={() => setTeacherSubject('russian')}>Rusų kalba</div>
                        <div onClick={() => setTeacherSubject('german')}>Vokiečių kalba</div>
                    </div>
                </div>
                <div className='timetable-groups-div'>
                    <div className='current-group-div' onClick={() => handleGroupsDropdownClick()}>
                        <p>{teacherGroup ? teacherGroup : 'Pasirinkite grupę'}</p>
                        <img src='/next.png' alt='dropdown icon' draggable='false' className={isGroupsDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                    </div>
                    <div className={isGroupsDropdownClicked ? 'groups-dropdown-div' : 'groups-dropdown-div-invisible'}>
                        {groupsData && groupsData.map((item, index) => (
                            <div key={index} onClick={() => setTeacherGroup(item.name)}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <button onClick={() => addNewTeacher(teacherFirstName, teacherLastName, teacherClassroom, teacherSubject, teacherGroup)}>Pridėti mokytoją</button>
            </div>
        );
    }

    function TeacherSettings({ firstName, lastName, classroom, subject, group, teacherId }) {
        const [teacherFirstName, setTeacherFirstName] = useState(firstName);
        const [teacherLastName, setTeacherLastName] = useState(lastName);
        const [teacherClassroom, setTeacherClassroom] = useState(classroom);
        const [teacherSubject, setTeacherSubject] = useState(subject);
        const [teacherGroup, setTeacherGroup] = useState(group);
        const [isGroupsDropdownClicked, setGroupsDropdownClicked] = useState(false);
        const [isSubjectsDropdownClicked, setSubjectsDropdownClicked] = useState(false);
        const [groupsData, setGroupsData] = useState([]);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getAllGroups`);
    
                const result = await response.json();
    
                setGroupsData(result.data);
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        async function saveChanges() {
            if (teacherFirstName === '' || teacherFirstName === undefined || teacherFirstName === null) {
                setErrorMessage(`Mokytojo(s) vardas tuščias!`);
    
                return;
            }

            if (teacherLastName === '' || teacherLastName === undefined || teacherLastName === null) {
                setErrorMessage(`Mokytojo(s) pavardė tuščia!`);
    
                return;
            }

            if (teacherClassroom === '' || teacherClassroom === undefined || teacherClassroom === null) {
                setErrorMessage(`Mokytojo(s) kabinetas tuščias!`);
    
                return;
            }

            if (teacherSubject === '' || teacherSubject === undefined || teacherSubject === null) {
                setErrorMessage(`Mokytojo(s) mokomasis dalykas tuščias!`);
    
                return;
            }

            try {    
                const response = await fetch('http://localhost:3000/api/updateTeacherData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstname: teacherFirstName, lastname: teacherLastName, classroom: teacherClassroom, subject: teacherSubject, group: teacherGroup, id: teacherId }),
                });
        
                const data = await response.json();
    
                if (data.success) {
                    setSuccessMessage(`Mokytojo(s) duomenys pakeisti.`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pakeisti mokytojo(s) duomenų. Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pakeisti mokytojo(s) duomenų! Bandykite vėl po poros minučių.`);
    
                return;
            }
        }

        async function deleteTeacher(teacherId) {
            try {    
                const response = await fetch('http://localhost:3000/api/deleteTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: teacherId }),
                });
        
                const data = await response.json();
    
                if (data.success) {
                    setSuccessMessage(`Mokytoja(s) ištrinta(s).`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko ištrinti mokytojo(s). Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko ištrinti mokytojo(s)! Bandykite vėl po poros minučių.`);
    
                return;
            }
        }

        function handleGroupsDropdownClick() {
            if (!isGroupsDropdownClicked) {
                setGroupsDropdownClicked(true);
            } else {
                setGroupsDropdownClicked(false);
            }
        }

        function handleSubjectsDropdownClick() {
            if (!isSubjectsDropdownClicked) {
                setSubjectsDropdownClicked(true);
            } else {
                setSubjectsDropdownClicked(false);
            }
        }

        return (
            <div className='teacher-div'>
                <input onChange={(e) => setTeacherFirstName(e.target.value)} type='text' defaultValue={firstName} />
                <input onChange={(e) => setTeacherLastName(e.target.value)} type='text' defaultValue={lastName} />
                <input onChange={(e) => setTeacherClassroom(e.target.value)} type='text' defaultValue={classroom} />
                <div className='timetable-subjects-div'>
                    <div className='current-subject-div' onClick={() => handleSubjectsDropdownClick()}>
                        <p>{teacherSubject ? translateToLithuanian(teacherSubject) : translateToLithuanian(subject)}</p>
                        <img src='/next.png' alt='dropdown icon' draggable='false' className={isSubjectsDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                    </div>
                    <div className={isSubjectsDropdownClicked ? 'subjects-dropdown-div' : 'subjects-dropdown-div-invisible'}>
                        <div onClick={() => setTeacherSubject('english')}>Anglų kalba</div>
                        <div onClick={() => setTeacherSubject('biology')}>Biologija</div>
                        <div onClick={() => setTeacherSubject('chemistry')}>Chemija</div>
                        <div onClick={() => setTeacherSubject('art')}>Dailė</div>
                        <div onClick={() => setTeacherSubject('ethics')}>Etika</div>
                        <div onClick={() => setTeacherSubject('physical-education')}>Fizinis ugdymas</div>
                        <div onClick={() => setTeacherSubject('physics')}>Fizika</div>
                        <div onClick={() => setTeacherSubject('geography')}>Geografija</div>
                        <div onClick={() => setTeacherSubject('it')}>Informatika</div>
                        <div onClick={() => setTeacherSubject('history')}>Istorija</div>
                        <div onClick={() => setTeacherSubject('javascript')}>Javascript</div>
                        <div onClick={() => setTeacherSubject('lithuanian')}>Lietuvių kalba</div>
                        <div onClick={() => setTeacherSubject('music')}>Muzika</div>
                        <div onClick={() => setTeacherSubject('math')}>Matematika</div>
                        <div onClick={() => setTeacherSubject('basics-of-citizenship')}>Pilietiškumo pagrindai</div>
                        <div onClick={() => setTeacherSubject('computer-systems')}>Programavimo aplinkos ir kūrimo procesų valdymas</div>
                        <div onClick={() => setTeacherSubject('russian')}>Rusų kalba</div>
                        <div onClick={() => setTeacherSubject('german')}>Vokiečių kalba</div>
                    </div>
                </div>
                <div className='timetable-groups-div'>
                    <div className='current-group-div' onClick={() => handleGroupsDropdownClick()}>
                        <p>{teacherGroup ? teacherGroup : group}</p>
                        <img src='/next.png' alt='dropdown icon' draggable='false' className={isGroupsDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                    </div>
                    <div className={isGroupsDropdownClicked ? 'groups-dropdown-div' : 'groups-dropdown-div-invisible'}>
                        {groupsData && groupsData.map((item, index) => (
                            <div key={index} onClick={() => setTeacherGroup(item.name)}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <img src='/save.png' alt='Išsaugoti' draggable='false' onClick={() => saveChanges()} />
                <img src='/delete.png' alt='Ištrinti' draggable='false' onClick={() => deleteTeacher(teacherId)} />
            </div>
        );
    }

    function Teachers() {
        const [teacherData, setTeacherData] = useState([]);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getAllTeachers`);
    
                const result = await response.json();
    
                setTeacherData(result.data);
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        return (
            <div className='teacher-setting-div'>
                {teacherData && teacherData.map((item, index) => (
                    <TeacherSettings firstName={item.firstname} lastName={item.lastname} classroom={item.classroom} subject={item.subject} group={item.group} teacherId={item.id} key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className='admin-teachers-div'>
            <div className={errorMessage ? 'error-message-div' : 'error-message-div-invisible'}>
                <p>{errorMessage ? errorMessage : ''}</p>
                <img src='/plus.png' alt='close' draggable='false' onClick={() => setErrorMessage('')} />
            </div>
            <div className={successMessage ? 'success-message-div' : 'success-message-div-invisible'}>
                <p>{successMessage ? successMessage : ''}</p>
                <img src='/plus.png' alt='close' draggable='false' onClick={() => setSuccessMessage('')} />
            </div>
            <div className='teacher-options-div'>
                <h1>Mokytojai</h1>
                <AddTeacher />
                {/* <hr /> */}
                <Teachers />
            </div>
        </div>
    );
}