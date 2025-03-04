import { NextResponse } from 'next/server';

async function fetchResponse(daylnum, week, group) {
    const response = await fetch(`http://127.0.0.1:3002/getlesson?daylnum=${daylnum}&week=${week}&group=${group}`);

    const resp = await response.json();

    return resp;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const dayLnumQuery = searchParams.get('daylnum');

    const weekQuery = searchParams.get('week');

    const groupQuery = searchParams.get('group');

    const resp = await fetchResponse(dayLnumQuery, weekQuery, groupQuery);

    return NextResponse.json(resp);
}