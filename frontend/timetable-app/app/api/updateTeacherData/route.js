import { NextResponse } from 'next/server';

async function fetchResponse(firstname, lastname, classroom, subject, group, id) {
    try {
        const response = await fetch(`http://127.0.0.1:3002/updateteacherdata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname: firstname, lastname: lastname, classroom: classroom, subject: subject, group: group, id: id })
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.error('Error fetching data:', err);
    };
}

export async function POST(req) {
    const body = await req.json();

    const { firstname, lastname, classroom, subject, group, id } = body;

    const resp = await fetchResponse(firstname, lastname, classroom, subject, group, id);

    return NextResponse.json(resp);
}