import { NextResponse } from 'next/server';

async function fetchResponse(group, subjectsArr, week) {
    try {
        const response = await fetch(`http://127.0.0.1:3002/addtimetable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ group: group, subjectsarr: subjectsArr, week: week })
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.error('Error fetching data:', err);
    };
}

export async function POST(req) {
    const body = await req.json();

    const { group, subjectsarr, week } = body;

    const resp = await fetchResponse(group, subjectsarr, week);

    return NextResponse.json(resp);
}