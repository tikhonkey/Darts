import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthGuard } from "../auth-guard.service";
import { ScoreService } from "../scoretable/score.service";

export class Players {
  constructor(
    public name: string,
    public email: string
  ) {}
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  admin: boolean = false;
  counter: string[] = [];
  players: Players[] = [
    new Players('Sherlock Holmes', 'sherlock.holmes@gmail.com'),
    new Players('Dr. John Watson', 'dr.john.watson@gmail.com'),
    new Players('Mrs. Stubbs', 'stubbs@gmail.com'),
    new Players('Jim Moriarty', 'jim.moriarty@gmail.com')
  ];

  selectForm: FormGroup;
  addForm: FormGroup;

  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private score: ScoreService ) {}

  ngOnInit() {
    this.selectForm = new FormGroup({
      'players': new FormArray([])
    });
    this.addForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required])
    });
    this.addControls();
    this.admin = this.authGuard.isAdmin();
  }

  onLogOut() {
    this.authGuard.logOut();
  }

  onSubmit() {
    this.score.players = this.counter;
    this.router.navigate(['/main']);
  }

  onAdd(form) {
    this.players.push(new Players(form.name, form.email));
    (<FormArray>this.selectForm.get('players')).push(new FormControl());
    console.log(form);
  }

  onDelete(i, player){
    this.players.splice(i, 1);
    const check = this.counter.find(
      (s) => {
        return s === player;
      }
    );
    if (check) {
      this.counter = this.counter.filter(
        (item) => { return item !== check }
      )
    }
    console.log(this.counter);
 }

  addControls() {
    for (let i = 0 ; i < this.players.length; i++ ) {
      (<FormArray>this.selectForm.get('players')).push(new FormControl());
    }
  }

  onClick(i) {
    const check = this.counter.find(
      (s) => {
        return s === i;
      }
    );
    if (!check) {
      this.counter.push(i);
    } else {
      this.counter = this.counter.filter(
        (item) => { return item !== i }
      )
    }
  }

}
