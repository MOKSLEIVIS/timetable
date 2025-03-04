'use client';

import './style.css';

import { useEffect, useState } from 'react';
import { translateToLithuanian } from '@/app/lib/utils';

export function Timetable() {
    const [currentGroup, setCurrentGroup] = useState('');
    const [currentWeek, setCurrentWeek] = useState('');

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

        return (
            <div className='timetable-groups-div'>
                <div className='current-group-div' onClick={() => handleClick()}>
                    <p>{currentGroup ? currentGroup : 'Pasirinkite grupę'}</p>
                    <img src='/next.png' alt='dropdown icon' draggable='false' className={isDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                </div>
                <div className={isDropdownClicked ? 'groups-dropdown-div' : 'groups-dropdown-div-invisible'}>
                    {groupsData && groupsData.map((item, index) => (
                        <div key={index} onClick={() => updateCurrentGroup(item.name)}>{item.name}</div>
                    ))}
                </div>
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

        return (
            <div className='timetable-weeks-div'>
                <div className='current-week-div' onClick={() => handleClick()}>
                    <p>{currentWeek ? currentWeek : 'Pasirinkite savaitę'}</p>
                    <img src='/next.png' alt='dropdown icon' draggable='false' className={isDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                </div>
                <div className={isDropdownClicked ? 'weeks-dropdown-div' : 'weeks-dropdown-div-invisible'}>
                    {weeksData && weeksData.map((item, index) => (
                        <div key={index} onClick={() => updateCurrentWeek(item.name)}>{item.name}</div>
                    ))}
                </div>
            </div>
        );
    }

    function LessonWindow({ day, lessonNum }) {
        const [subjectData, setSubjectData] = useState('');

        useEffect(() => {
            fetchData(`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup);
        }, [`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup]);

        const fetchData = async (daylnum, week, group) => {
            try {
                const response = await fetch(`/api/getLesson?daylnum=${daylnum}&week=${week}&group=${group}`);
    
                const result = await response.json();

                if (result !== undefined && result !== null && result !== '') {
                    setSubjectData(result);
                }
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        return (
            <td className={`${subjectData.lesson}`}>
                <h1>{translateToLithuanian(subjectData.lesson)}</h1>
                <div className={`more ${subjectData.lesson}`}>
                    <h2>{translateToLithuanian(subjectData.lesson)}</h2>
                    <div className='info'>
                        <p>{subjectData.teacher}</p>
                        <p>{subjectData.classroom}</p>
                    </div>
                </div>
            </td>
        );
    }

    function MobileLessonWindow({ day, lessonNum, lessonTime }) {
        const [subjectData, setSubjectData] = useState('');

        useEffect(() => {
            fetchData(`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup);
        }, [`${day.toString()}_${lessonNum.toString()}`, currentWeek, currentGroup]);

        const fetchData = async (daylnum, week, group) => {
            try {
                const response = await fetch(`/api/getLesson?daylnum=${daylnum}&week=${week}&group=${group}`);
    
                const result = await response.json();

                if (result !== undefined && result !== null && result !== '') {
                    setSubjectData(result);
                }
            } catch (err) {
                // console.error('Error fetching data:', err);
            };
        }

        return (
            <div className={`mobile-lesson-div mobile-${subjectData.lesson}`}>
                <div className={`day-time-div ${subjectData.lesson ? subjectData.lesson : ''}`}>
                    <h1>{lessonNum}</h1>
                    <p>{lessonTime}</p>
                </div>
                <div className='lesson-info'>
                    <h1>{translateToLithuanian(subjectData.lesson)}</h1>
                    <p>{subjectData.teacher}</p>
                    <p>{subjectData.classroom}</p>
                </div>
            </div>
        );
    }

    function WeekdayDiv({ weekday, weekdayNum }) {
        const [isDropdownClicked, setDropdownClicked] = useState(false); 

        function handleClick() {
            if (!isDropdownClicked) {
                setDropdownClicked(true);
            } else {
                setDropdownClicked(false);
            }
        }

        return (
            <div className='weekday-div'>
                <div className='weekday-dropdown-clickable' onClick={() => handleClick()}>
                    <h1>{weekday}</h1>
                    <img src='/next.png' alt='spausk' draggable='false' className={isDropdownClicked ? 'dropdown-clicked' : 'dropdown-notclicked'} />
                </div>
                <div className={isDropdownClicked ? 'weekday-dropdown-div' : 'weekday-dropdown-div-invisible'}>
                    <MobileLessonWindow day={weekdayNum} lessonNum={1} lessonTime={'8:00 - 8:45'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={2} lessonTime={'8:55 - 9:40'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={3} lessonTime={'9:50 - 10:35'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={4} lessonTime={'10:45 - 11:30'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={5} lessonTime={'12:00 - 12:45'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={6} lessonTime={'12:55 - 13:40'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={7} lessonTime={'13:50 - 14:35'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={8} lessonTime={'14:45 - 15:30'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={9} lessonTime={'15:40 - 16:25'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={10} lessonTime={'16:35 - 17:20'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={11} lessonTime={'17:30 - 18:15'} />
                    <MobileLessonWindow day={weekdayNum} lessonNum={12} lessonTime={'18:25 - 19:10'} />
                </div>
            </div>
        );
    }

    return (
        <div className='timetable-div'>
            <div className='timetable-web-ui'>
                <div className='timetable-options'>
                    <div className='timetable-group-options'>
                        <TimetableGroups />
                    </div>
                    <div className='timetable-week-options'>
                        <TimetableWeeks />
                    </div>
                </div>
                <table>
                    <caption>
                        <p>Tvarkaraštis</p>
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
            </div>
            <div className='timetable-mobile-ui'>
                <div className='timetable-options'>
                    <div className='timetable-group-options'>
                        <TimetableGroups />
                    </div>
                    <div className='timetable-week-options'>
                        <TimetableWeeks />
                    </div>
                </div>
                <div className='weekdays-column-div'>
                    <WeekdayDiv weekday={'Pirmadienis'} weekdayNum={1} />
                    <WeekdayDiv weekday={'Antradienis'} weekdayNum={2} />
                    <WeekdayDiv weekday={'Trečiadienis'} weekdayNum={3} />
                    <WeekdayDiv weekday={'Ketvirtadienis'} weekdayNum={4} />
                    <WeekdayDiv weekday={'Penktadienis'} weekdayNum={5} />
                </div>
            </div>
        </div>
    );
}