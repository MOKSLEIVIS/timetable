import { NextResponse } from 'next/server';

async function fetchResponse() {
    const response = await fetch(`http://127.0.0.1:3002/getallgroups`);

    const resp = await response.json();

    return resp;
}

export async function GET(request) {
    const resp = await fetchResponse();

    return NextResponse.json(resp);
}