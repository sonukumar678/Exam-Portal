import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

console.log("inside admin guard")
export const adminGuard: CanActivateFn = (route, state) => {
   console.log("inside if block")
  const authServices = inject(AuthService);
  console.log("inside if block"+authServices.getToken())
  
  if(authServices.getLogginUser() && authServices.getUserRole() == 'ADMIN'){
   console.log("yes")
    return true;
  }
  window.location.href = '/login';
  return false;
};
