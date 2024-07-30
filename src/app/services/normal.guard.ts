import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const normalGuard: CanActivateFn = (route, state) => {

  const authServices = inject(AuthService);
  if(authServices.getLogginUser() && authServices.getUserRole() == 'USER'){
    console.log("normal user logged in..")
     return true;
   }
   window.location.href = '/login';
   return false;
};
