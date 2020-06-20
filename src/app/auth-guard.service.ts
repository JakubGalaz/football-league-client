import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private authservice: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authservice.user.email === 'admin@admin.pl') {
      this.getLoggedInName.emit(this.authservice.user.email);
      return true;
    } else {
      return false;
    }
  }
}
