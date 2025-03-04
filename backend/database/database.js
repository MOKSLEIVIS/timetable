const { Pool } = require('pg');
const config = require('../config.json');

const pool = new Pool({
    user: config["database"]["user"],
    host: config["database"]["host"],
    database: config["database"]["database"],
    password: config["database"]["password"],
    port: config["database"]["port"],
    max: config["database"]["max"],
    connectionTimeoutMillis: config["database"]["connectionTimeoutMillis"],
    idleTimeoutMillis: config["database"]["idleTimeoutMillis"],
    allowExitOnIdle: config["database"]["allowExitOnIdle"]
});

process.on('exit', () => {
    pool.end();
});

async function checkRegisteredUser(username) {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT username FROM users WHERE LOWER(username) = LOWER($1)`, [username]);

        let exists = false;

        if (res.rows.length > 0) {
            exists = true;
        } else {
            exists = false;
        }
        
        return exists;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function getUserPassword(username) {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT user_id, password FROM users WHERE LOWER(username) = LOWER($1)`, [username]);

        const { user_id, password } = res.rows.length > 0 ? {
            user_id: res.rows[0].user_id,
            password: res.rows[0].password,
        } : { user_id: null, password: null };

        return { user_id, password };
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function addNewGroup(group) {
    const client = await pool.connect();

    try {
        await client.query(`INSERT INTO groups (name) VALUES ($1)`, [group]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function getAllGroups() {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT name FROM groups`, []);

        return res.rows.length > 0 ? res.rows : null;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function getAllWeeks() {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT name FROM weeks`, []);

        return res.rows.length > 0 ? res.rows : null;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function addNewWeek(week) {
    const client = await pool.connect();

    try {
        await client.query(`INSERT INTO weeks (name) VALUES ($1)`, [week]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function addTeacher(firstName, lastName, classroom, subject, group) {
    const client = await pool.connect();

    try {
        await client.query(`INSERT INTO teachers (first_name, classroom, subject, last_name, teacher_group) VALUES ($1, $2, $3, $4, $5)`, [firstName, classroom, subject, lastName, group]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function getTeacher(subject) {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT first_name, last_name, classroom FROM teachers WHERE LOWER(subject) = LOWER($1)`, [subject]);

        return res.rows.length > 0 ? res.rows[0] : null;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function addTimetable(group, teacher, lesson, classroom, dayLnum, week) {
    const client = await pool.connect();

    try {
        await client.query(`INSERT INTO timetable (tgroup, teacher, classroom, lesson, day_lnum, week) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (tgroup, lesson, day_lnum, week) DO NOTHING`, [group, teacher, lesson, classroom, dayLnum, week]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function getAllTeachers() {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT first_name, last_name, classroom, subject, teacher_group, teacher_id FROM teachers`, []);

        return res.rows.length > 0 ? res.rows : null;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function updateTeacherData(firstName, lastName, classroom, subject, group, id) {
    const client = await pool.connect();

    try {
        await client.query(`UPDATE teachers SET first_name = $1, last_name = $2, classroom = $3, subject = $4, teacher_group = $5 WHERE teacher_id = $6`, [firstName, lastName, classroom, subject, group, id]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function getLesson(daylnum, week, group) {
    const client = await pool.connect();

    try {
        const res = await client.query(`SELECT lesson, teacher, classroom FROM timetable WHERE day_lnum = $1 AND week = $2 AND tgroup = $3`, [daylnum, week, group]);

        return res.rows.length > 0 ? res.rows[0] : null;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function deleteTimetableLesson(daylnum, week, group) {
    const client = await pool.connect();

    try {
        await client.query(`DELETE FROM timetable WHERE tgroup = $1 AND day_lnum = $2 AND week = $3`, [group, daylnum, week]);
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        client.release();
    }
};

async function deleteGroup(group) {
    const client = await pool.connect();

    try {
        await client.query(`DELETE FROM groups WHERE name = $1`, [group]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function deleteWeek(week) {
    const client = await pool.connect();

    try {
        await client.query(`DELETE FROM weeks WHERE name = $1`, [week]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

async function deleteTeacher(teacherId) {
    const client = await pool.connect();

    try {
        await client.query(`DELETE FROM teachers WHERE teacher_id = $1`, [teacherId]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    }
};

module.exports = {
    checkRegisteredUser, getUserPassword, addNewGroup, getAllGroups, getAllWeeks, addNewWeek, addTimetable, addTeacher, getTeacher, getAllTeachers, updateTeacherData, getLesson, deleteTimetableLesson,
    deleteGroup, deleteWeek, deleteTeacher
};