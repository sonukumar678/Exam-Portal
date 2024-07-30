import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { AuthService } from "./auth.service";


export const demoInterceptor: HttpInterceptorFn = (req, next) => {
    
    const authService = inject(AuthService);
    const token = authService.getToken();
    console.log("Inside demoInter..."+token)
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  };