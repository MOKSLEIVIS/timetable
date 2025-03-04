const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config.json');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const checkRegisteredUserRoute = require('./routes/checkRegisteredUser');
app.use('/checkregistereduser', checkRegisteredUserRoute);

const getUserPasswordRoute = require('./routes/getUserPassword');
app.use('/getuserpassword', getUserPasswordRoute);

const addNewGroupRoute = require('./routes/addNewGroup');
app.use('/addnewgroup', addNewGroupRoute);

const getAllGroupsRoute = require('./routes/getAllGroups');
app.use('/getallgroups', getAllGroupsRoute);

const getAllWeeksRoute = require('./routes/getAllWeeks');
app.use('/getallweeks', getAllWeeksRoute);

const addNewWeekRoute = require('./routes/addNewWeek');
app.use('/addnewweek', addNewWeekRoute);

const addTimetableRoute = require('./routes/addTimetable');
app.use('/addtimetable', addTimetableRoute);

const addTeacherRoute = require('./routes/addTeacher');
app.use('/addteacher', addTeacherRoute);

const getAllTeachersRoute = require('./routes/getAllTeachers');
app.use('/getallteachers', getAllTeachersRoute);

const updateTeacherDataRoute = require('./routes/updateTeacherData');
app.use('/updateteacherdata', updateTeacherDataRoute);

const getLessonRoute = require('./routes/getLesson');
app.use('/getlesson', getLessonRoute);

const deleteGroupRoute = require('./routes/deleteGroup');
app.use('/deletegroup', deleteGroupRoute);

const deleteWeekRoute = require('./routes/deleteWeek');
app.use('/deleteweek', deleteWeekRoute);

const deleteTeacherRoute = require('./routes/deleteTeacher');
app.use('/deleteteacher', deleteTeacherRoute);

app.listen(config["api"]["port"], () => {
    console.log(`Backend server api is online on http://127.0.0.1:${config["api"]["port"]}`);
});