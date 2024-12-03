
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('token')
    console.log(token)
    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    } else {
        return NextResponse.next()
    }
 
}

export const config = {
    matcher : [
        '/'
    ]
}

