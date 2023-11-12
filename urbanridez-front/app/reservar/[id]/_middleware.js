import { NextResponse } from "next/server";

export default async function middleware(res,req) {

    res.setHeader('Authorization', 'Users API-Key 03068e56-cf08-4ae8-87d2-efb7953ff3e7')

    return NextResponse.next()

}
