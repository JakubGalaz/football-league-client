import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import {User} from 'firebase/app';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loginErrorCode: string;
  registerErrorCode: string;
  visable = 'hidden';

  constructor(private angularFire: AngularFireAuth, private router: Router) {

    angularFire.authState.subscribe(user => {
      this.user = user;
    });

  }

  login(email: string, password: string) {
    this.angularFire.auth.signInWithEmailAndPassword(email, password).then(value => {
      console.log(value);
      if(this.user.email.toString() === 'admin@admin.pl'){
        console.log("Weszedl adni!");
        this.visable = 'hidden';
        console.log(this.visable)
      }
      this.router.navigate(['/welcomePage']);
    }).catch(err => {
      console.log(err.code);
      this.loginErrorCode = err.code;

    });
  }

  signup(email: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value);
        this.router.navigate(['/welcomePage']);
      })
      .catch(err => {
        console.log(err);
        this.registerErrorCode = err.code;
      });

  }

  logout() {
    this.angularFire.auth.signOut();
  }
}
