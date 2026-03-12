import { NextResponse } from 'next/server'
 

export function middleware(request) {
    const path= request.nextUrl.pathname
    const isPublicPath= path=='/login'||path=='/signup'
    const token=request.cookies.get("token")?.value|| ""
    if(isPublicPath && token){
        return NextResponse.redirect("/")
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect("/login")
    }
}
 

export const config = {
  matcher: ['/support/:path*','/dashboard','/login','/signup']
  
}