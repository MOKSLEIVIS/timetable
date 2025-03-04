import { NextResponse } from 'next/server';

async function fetchResponse(id) {
    try {
        const response = await fetch(`http://127.0.0.1:3002/deleteteacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.error('Error fetching data:', err);
    };
}

export async function POST(req) {
    const body = await req.json();

    const { id } = body;

    const resp = await fetchResponse(id);

    return NextResponse.json(resp);
}