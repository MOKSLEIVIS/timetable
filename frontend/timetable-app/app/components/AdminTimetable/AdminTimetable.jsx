'use client';

import './style.css';

import { useEffect, useState } from 'react';

import { translateToLithuanian } from '@/app/lib/utils';

export function AdminTimetable() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [currentGroup, setCurrentGroup] = useState('');
    const [currentWeek, setCurrentWeek] = useState('');
    
    const subjectsMap = new Map();

    function updateAllSubjectsData(subject, day, lessonNum) {
        subjectsMap.set(`${day.toString()}_${lessonNum.toString()}`, subject);    
    }

    async function saveChanges() {
        if (subjectsMap.size < 1) {
            setErrorMessage(`Jokių tvarkaraščio pakeitimų nerasta!`);

            return;
        }

        if (currentGroup === '' || currentGroup === undefined || currentGroup === null) {
            setErrorMessage(`Prašome pasirinkti grupę!`);

            return;
        }

        if (currentWeek === '' || currentWeek === undefined || currentWeek === null) {
            setErrorMessage(`Prašome pasirinkti savaitę!`);

            return;
        }

        try {
            const arr = [];

            console.log(subjectsMap);

            for (const [key, value] of subjectsMap) {
                arr.push({ daylnum: key, subject: value });
            }

            const response = await fetch('http://localhost:3000/api/addTimetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group: currentGroup, subjectsarr: arr, week: currentWeek }),
            });
    
            const data = await response.json();

            setSuccessMessage(`Tvarkaraštis pridėtas.`);

            return;
        } catch (err) {
            setErrorMessage(`Nepavyko pridėti tvarkaraščio! Bandykite vėl po poros minučių.`);

            return;
        }
    }

    function LessonWindow({ day, lessonNum }) {
        const [subjectData, setSubjectData] = useState('');
        const [isPlusClicked, setPlusClicked] = useState(false);

        useEffect(() => {
            fetchData(`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup);
        }, [`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup]);

        const fetchData = async (daylnum, week, group) => {
            try {
                const response = await fetch(`/api/getLesson?daylnum=${daylnum}&week=${week}&group=${group}`);
    
                const result = await response.json();

                if (result.lesson !== undefined) {
                    setSubjectData(result.lesson);

                    updateAllSubjectsData(result.lesson, day, lessonNum);
                }
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }
    
        function handleClick() {
            if (!isPlusClicked) {
                setPlusClicked(true);
            } else {
                setPlusClicked(false);
            }
        }
    
        function handleSubjectAdd(subject) {
            setSubjectData(subject);

            updateAllSubjectsData(subject, day, lessonNum);

            console.log(subjectsMap);
        }

        function handleSubjectRemove() {
            setSubjectData('');

            updateAllSubjectsData('', day, lessonNum);
        }
    
        return (
            <td className={subjectData ? subjectData : ''}>
                {!subjectData ?
                    <div className='add-subject' onClick={() => handleClick()}>
                        <img src='/plus.png' alt='pridėti' draggable='false' className={isPlusClicked ? 'plus-clicked' : 'plus-notclicked'} />
                        <div className={isPlusClicked ? 'subject-selection-dropdown' : 'subject-selection-dropdown-invisible'}>
                            <div onClick={() => handleSubjectAdd('english')}>Anglų kalba</div>
                            <div onClick={() => handleSubjectAdd('biology')}>Biologija</div>
                            <div onClick={() => handleSubjectAdd('chemistry')}>Chemija</div>
                            <div onClick={() => handleSubjectAdd('art')}>Dailė</div>
                            <div onClick={() => handleSubjectAdd('ethics')}>Etika</div>
                            <div onClick={() => handleSubjectAdd('physical-education')}>Fizinis ugdymas</div>
                            <div onClick={() => handleSubjectAdd('physics')}>Fizika</div>
                            <div onClick={() => handleSubjectAdd('geography')}>Geografija</div>
                            <div onClick={() => handleSubjectAdd('it')}>Informatika</div>
                            <div onClick={() => handleSubjectAdd('history')}>Istorija</div>
                            <div onClick={() => handleSubjectAdd('javascript')}>Javascript</div>
                            <div onClick={() => handleSubjectAdd('lithuanian')}>Lietuvių kalba</div>
                            <div onClick={() => handleSubjectAdd('music')}>Muzika</div>
                            <div onClick={() => handleSubjectAdd('math')}>Matematika</div>
                            <div onClick={() => handleSubjectAdd('basics-of-citizenship')}>Pilietiškumo pagrindai</div>
                            <div onClick={() => handleSubjectAdd('computer-systems')}>Programavimo aplinkos ir kūrimo procesų valdymas</div>
                            <div onClick={() => handleSubjectAdd('russian')}>Rusų kalba</div>
                            <div onClick={() => handleSubjectAdd('german')}>Vokiečių kalba</div>
                        </div>
                    </div>
                :
                    <div className='lesson-window'>
                        <img src='/plus.png' alt='remove' draggable='false' onClick={() => handleSubjectRemove()} />
                        <h1>{translateToLithuanian(subjectData)}</h1>
                    </div>
                }
                
            </td>
        );
    }

    function TimetableGroups() {
        const [groupsData, setGroupsData] = useState([]);
        const [isDropdownClicked, setDropdownClicked] = useState(false);

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

        function handleClick() {
            if (!isDropdownClicked) {
                setDropdownClicked(true);
            } else {
                setDropdownClicked(false);
            }
        }

        function updateCurrentGroup(group) {
            setCurrentGroup(group);
        }

        async function handleGroupDeletion(group) {
            try {
                const response = await fetch('http://localhost:3000/api/deleteGroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: group }),
                });
        
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage(`Grupė sekmingai pašalinta.`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pašalinti grupės! Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pašalinti grupės! Bandykite vėl po poros minučių.`);

                return;
            }
        }

        return (
            <div className='timetable-groups-div'>
                <div className='current-group-div' onClick={() => handleClick()}>
                    <p>{currentGroup ? currentGroup : 'Pasirinkite grupę'}</p>
                    <img src='/next.png' alt='dropdown icon' draggable='false' className={isDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                </div>
                <div className={isDropdownClicked ? 'groups-dropdown-div' : 'groups-dropdown-div-invisible'}>
                    {groupsData && groupsData.map((item, index) => (
                        <div key={index} onClick={() => updateCurrentGroup(item.name)}>
                            <p>{item.name}</p>
                            <img src='/plus.png' alt='trinti' draggable='false' onClick={() => handleGroupDeletion(item.name)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function AddNewGroup() {
        const [groupName, setGroupName] = useState('');

        async function addGroup(group) {
            if (group === '' || group === undefined || group === null) {
                setErrorMessage(`Įveskite grupės pavadinimą!`);

                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/addNewGroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: group }),
                });
        
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage(`Grupė sekmingai pridėta.`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pridėti grupės! Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pridėti grupės! Bandykite vėl po poros minučių.`);

                return;
            }
        }
      
        return (
            <div className='add-new-group-div'>
                <input type='text' onChange={(e) => setGroupName(e.target.value)} placeholder='Grupės pavadinimas' />
                <button onClick={() => addGroup(groupName)}>Pridėti grupę</button>
            </div>
        );
    }

    function TimetableWeeks() {
        const [weeksData, setWeeksData] = useState([]);
        const [isDropdownClicked, setDropdownClicked] = useState(false);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getAllWeeks`);
    
                const result = await response.json();
    
                setWeeksData(result.data);
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        function handleClick() {
            if (!isDropdownClicked) {
                setDropdownClicked(true);
            } else {
                setDropdownClicked(false);
            }
        }

        function updateCurrentWeek(week) {
            setCurrentWeek(week);
        }

        async function handleWeekDeletion(group) {
            try {
                const response = await fetch('http://localhost:3000/api/deleteWeek', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: group }),
                });
        
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage(`Savaitė sekmingai pašalinta.`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pašalinti savaitės! Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pašalinti savaitės! Bandykite vėl po poros minučių.`);

                return;
            }
        }

        return (
            <div className='timetable-weeks-div'>
                <div className='current-week-div' onClick={() => handleClick()}>
                    <p>{currentWeek ? currentWeek : 'Pasirinkite savaitę'}</p>
                    <img src='/next.png' alt='dropdown icon' draggable='false' className={isDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                </div>
                <div className={isDropdownClicked ? 'weeks-dropdown-div' : 'weeks-dropdown-div-invisible'}>
                    {weeksData && weeksData.map((item, index) => (
                        <div key={index} onClick={() => updateCurrentWeek(item.name)}>
                            <p>{item.name}</p>
                            <img src='/plus.png' alt='trinti' draggable='false' onClick={() => handleWeekDeletion(item.name)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function AddNewWeek() {
        const [weekName, setWeekName] = useState('');

        async function addWeek(week) {
            if (week === '' || week === undefined || week === null) {
                setErrorMessage(`Įveskite savaitės pavadinimą!`);

                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/addNewWeek', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: week }),
                });
        
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage(`Savaitė sekmingai pridėta.`);

                    return;
                } else {
                    setErrorMessage(`Nepavyko pridėti savaitės! Bandykite vėl po poros minučių.`);

                    return;
                }
            } catch (err) {
                setErrorMessage(`Nepavyko pridėti savaitės! Bandykite vėl po poros minučių.`);

                return;
            }
        }
      
        return (
            <div className='add-new-week-div'>
                <input type='text' onChange={(e) => setWeekName(e.target.value)} placeholder='Savaitės pavadinimas' />
                <button onClick={() => addWeek(weekName)}>Pridėti savaitę</button>
            </div>
        );
    }

    return (
        <div className='admin-timetable-div'>
            <div className={errorMessage ? 'error-message-div' : 'error-message-div-invisible'}>
                <p>{errorMessage ? errorMessage : ''}</p>
                <img src='/plus.png' alt='close' draggable='false' onClick={() => setErrorMessage('')} />
            </div>
            <div className={successMessage ? 'success-message-div' : 'success-message-div-invisible'}>
                <p>{successMessage ? successMessage : ''}</p>
                <img src='/plus.png' alt='close' draggable='false' onClick={() => setSuccessMessage('')} />
            </div>
            <div className='timetable-options'>
                <div className='timetable-group-options'>
                    <TimetableGroups />
                    <AddNewGroup />
                </div>
                <div className='timetable-week-options'>
                    <TimetableWeeks />
                    <AddNewWeek />
                </div>
            </div>
            <table>
                <caption>
                    <p>Tvarkaraščio koregavimas</p>
                </caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <div className='border-left'>
                                <p>1</p>
                                <p>8:00 - 8:45</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>2</p>
                                <p>8:55 - 9:40</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>3</p>
                                <p>9:50 - 10:35</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>4</p>
                                <p>10:45 - 11:30</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>5</p>
                                <p>12:00 - 12:45</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>6</p>
                                <p>12:55 - 13:40</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>7</p>
                                <p>13:50 - 14:35</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>8</p>
                                <p>14:45 - 15:30</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>9</p>
                                <p>15:40 - 16:25</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>10</p>
                                <p>16:35 - 17:20</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left'>
                                <p>11</p>
                                <p>17:30 - 18:15</p>
                            </div>
                        </th>
                        <th>
                            <div className='border-left-right'>
                                <p>12</p>
                                <p>18:25 - 19:10</p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='border-top'>Pirmadienis</th>
                        <LessonWindow day={1} lessonNum={1} />
                        <LessonWindow day={1} lessonNum={2} />
                        <LessonWindow day={1} lessonNum={3} />
                        <LessonWindow day={1} lessonNum={4} />
                        <LessonWindow day={1} lessonNum={5} />
                        <LessonWindow day={1} lessonNum={6} />
                        <LessonWindow day={1} lessonNum={7} />
                        <LessonWindow day={1} lessonNum={8} />
                        <LessonWindow day={1} lessonNum={9} />
                        <LessonWindow day={1} lessonNum={10} />
                        <LessonWindow day={1} lessonNum={11} />
                        <LessonWindow day={1} lessonNum={12} />
                    </tr>
                    <tr>
                        <th className='border-top'>Antradienis</th>
                        <LessonWindow day={2} lessonNum={1} />
                        <LessonWindow day={2} lessonNum={2} />
                        <LessonWindow day={2} lessonNum={3} />
                        <LessonWindow day={2} lessonNum={4} />
                        <LessonWindow day={2} lessonNum={5} />
                        <LessonWindow day={2} lessonNum={6} />
                        <LessonWindow day={2} lessonNum={7} />
                        <LessonWindow day={2} lessonNum={8} />
                        <LessonWindow day={2} lessonNum={9} />
                        <LessonWindow day={2} lessonNum={10} />
                        <LessonWindow day={2} lessonNum={11} />
                        <LessonWindow day={2} lessonNum={12} />
                    </tr>
                    <tr>
                        <th className='border-top'>Trečiadienis</th>
                        <LessonWindow day={3} lessonNum={1} />
                        <LessonWindow day={3} lessonNum={2} />
                        <LessonWindow day={3} lessonNum={3} />
                        <LessonWindow day={3} lessonNum={4} />
                        <LessonWindow day={3} lessonNum={5} />
                        <LessonWindow day={3} lessonNum={6} />
                        <LessonWindow day={3} lessonNum={7} />
                        <LessonWindow day={3} lessonNum={8} />
                        <LessonWindow day={3} lessonNum={9} />
                        <LessonWindow day={3} lessonNum={10} />
                        <LessonWindow day={3} lessonNum={11} />
                        <LessonWindow day={3} lessonNum={12} />
                    </tr>
                    <tr>
                        <th className='border-top'>Ketvirtadienis</th>
                        <LessonWindow day={4} lessonNum={1} />
                        <LessonWindow day={4} lessonNum={2} />
                        <LessonWindow day={4} lessonNum={3} />
                        <LessonWindow day={4} lessonNum={4} />
                        <LessonWindow day={4} lessonNum={5} />
                        <LessonWindow day={4} lessonNum={6} />
                        <LessonWindow day={4} lessonNum={7} />
                        <LessonWindow day={4} lessonNum={8} />
                        <LessonWindow day={4} lessonNum={9} />
                        <LessonWindow day={4} lessonNum={10} />
                        <LessonWindow day={4} lessonNum={11} />
                        <LessonWindow day={4} lessonNum={12} />
                    </tr>
                    <tr>
                        <th className='border-top-bottom'>Penktadienis</th>
                        <LessonWindow day={5} lessonNum={1} />
                        <LessonWindow day={5} lessonNum={2} />
                        <LessonWindow day={5} lessonNum={3} />
                        <LessonWindow day={5} lessonNum={4} />
                        <LessonWindow day={5} lessonNum={5} />
                        <LessonWindow day={5} lessonNum={6} />
                        <LessonWindow day={5} lessonNum={7} />
                        <LessonWindow day={5} lessonNum={8} />
                        <LessonWindow day={5} lessonNum={9} />
                        <LessonWindow day={5} lessonNum={10} />
                        <LessonWindow day={5} lessonNum={11} />
                        <LessonWindow day={5} lessonNum={12} />
                    </tr>
                </tbody>
            </table>
            <div className='table-options'>
                <button className='save-changes-button' onClick={() => saveChanges()}>Išsaugoti pakeitimus</button>
            </div>
        </div>
    );
}