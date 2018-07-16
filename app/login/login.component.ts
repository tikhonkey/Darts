import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthGuard } from "../auth-guard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor( private authGuard: AuthGuard ) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      'login': new FormControl(null),
      'password': new FormControl(null)
    });
    this.authGuard.loginCheck();
  }

  onLogIn(form) {
    const email = form.login;
    const password = form.password;
    this.authGuard.logIn(email, password);
  }

}
