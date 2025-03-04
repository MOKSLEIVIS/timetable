import { NextResponse } from 'next/server';

async function fetchResponse(name) {
    try {
        const response = await fetch(`http://127.0.0.1:3002/deletegroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.error('Error fetching data:', err);
    };
}

export async function POST(req) {
    const body = await req.json();

    const { name } = body;

    const resp = await fetchResponse(name);

    return NextResponse.json(resp);
}