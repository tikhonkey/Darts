import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export class Users {
    constructor(
    public login: string,
    public password: string,
    public role: string) {}
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router ) {}

  users: Users[] = [
    new Users('cust', '1', 'admin'),
    new Users('guest', '1', 'user')
  ];

  logIn(user: string, pass: string) {
    const check = this.users.find(
      (s) => {
        return s.login === user;
      }
    );
    if ( check && check.password === pass ) {
      console.log('Success');
      localStorage.setItem('user', user);
      this.router.navigate(['/manage']);
    } else {
      console.log('False')
    }
  }

  loginCheck(){
      if ( localStorage.getItem('user') ) {
        this.router.navigate(['/manage']);
      }
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isAdmin(){
    const check = this.users.find(
      (s) => {
        return s.login === localStorage.getItem('user');
      }
    );
    return check.role === 'admin';
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
