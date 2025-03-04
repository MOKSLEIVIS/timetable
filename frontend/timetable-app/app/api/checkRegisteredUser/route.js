import { NextResponse } from 'next/server';

async function fetchResponse(username) {
    const response = await fetch(`http://127.0.0.1:3002/checkregistereduser?username=${username}`);

    const resp = await response.json();

    return resp;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('username');

    const resp = await fetchResponse(query);

    return NextResponse.json(resp);
}