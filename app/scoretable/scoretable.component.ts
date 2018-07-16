import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ScoreService } from "./score.service";

@Component({
  selector: 'app-scoretable',
  templateUrl: './scoretable.component.html',
  styleUrls: ['./scoretable.component.css']
})
export class ScoreTableComponent implements OnInit {

  darts: number[] = [1, 2, 3];
  regPattern: string = '^0*([0-9]|[1][0-9]|20|25|50)$';
  winner: string;
  scoreTable: any[] = [[501, 501, 501]];
  players: string[];

  scoreForm: FormGroup;
  inputCount: number = 0;

  resetFormObj = {
    'dart1-1': {value: null, disabled: false}, 'dart1-1x': '1',
    'dart2-1': {value: null, disabled: false}, 'dart2-1x': '1',
    'dart3-1': {value: null, disabled: false}, 'dart3-1x': '1',
    'dart1-2': {value: null, disabled: false}, 'dart1-2x': '1',
    'dart2-2': {value: null, disabled: false}, 'dart2-2x': '1',
    'dart3-2': {value: null, disabled: false}, 'dart3-2x': '1',
    'dart1-3': {value: null, disabled: false}, 'dart1-3x': '1',
    'dart2-3': {value: null, disabled: false}, 'dart2-3x': '1',
    'dart3-3': {value: null, disabled: false}, 'dart3-3x': '1'
  };

  constructor(
    private score: ScoreService,
    private router: Router
  ) { }

  ngOnInit() {

    this.onLoadCheck();

    this.scoreForm = new FormGroup({

      //player 1:
      'dart1-1': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart1-1x': new FormControl('1'),
      'dart2-1': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart2-1x': new FormControl('1'),
      'dart3-1': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart3-1x': new FormControl('1'),

      //player 2:
      'dart1-2': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart1-2x': new FormControl('1'),
      'dart2-2': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart2-2x': new FormControl('1'),
      'dart3-2': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart3-2x': new FormControl('1'),

      //player 3:
      'dart1-3': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart1-3x': new FormControl('1'),
      'dart2-3': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart2-3x': new FormControl('1'),
      'dart3-3': new FormControl(null, Validators.pattern(this.regPattern)),
      'dart3-3x': new FormControl('1')

    });

    this.players = this.score.players;

  }

  onLoadCheck() {
    if (!this.score.players) {
      this.router.navigate(['/']);
    }
  }

  onNewGame() {
    this.scoreTable = [[501, 501, 501]];
    this.scoreForm.reset(this.resetFormObj);
    this.inputCount = null;
    this.winner = null;
    this.router.navigate(['/manage']);
  }

  onAdd() {
    const arr = this.scoreTable[this.scoreTable.length - 1].slice();
    if ( !this.inputCount ) {
      this.scoreTable.push(arr);
    }

    let p1sum = this.playerCheckSum(1),
      p2sum = this.playerCheckSum(2),
      p3sum = this.playerCheckSum(3);

    arr[0] = arr[0] - p1sum < 0  ? arr[0] : arr[0] - p1sum;
    arr[1] = arr[1] - p2sum < 0  ? arr[1] : arr[1] - p2sum;
    arr[2] = arr[2] - p3sum < 0  ? arr[2] : arr[2] - p3sum;

    if ( this.inputCount > 0 && this.inputCount < 9 ) {
      this.scoreTable[this.scoreTable.length - 1] = [arr[0], arr[1], arr[2]];

    } else {
      this.scoreTable[this.scoreTable.length - 1] = [arr[0], arr[1], arr[2]];
      this.inputCount = 0;
      this.scoreForm.reset(this.resetFormObj);
    }

    this.winnerCheck(arr);
  }


  playerCheckSum(num: number) {
    let addValue = this.scoreForm.value,
      sum = [0,0,0];

    for (const dart of this.darts) {
      if ( addValue['dart' + dart + '-' + num] > 0 && addValue['dart' + dart + '-' + num] <= 20 ) {
        sum[dart - 1] = addValue['dart' + dart + '-' + num] * addValue['dart' + dart + '-'+ num + 'x'];
        this.scoreForm.controls['dart' + dart + '-' + num].disable();
        this.inputCount++;

      } else if ( addValue['dart' + dart + '-' + num] > 0 ) {
        sum[dart - 1] = +addValue['dart' + dart + '-' + num];
        this.scoreForm.controls['dart' + dart + '-' + num].disable();
        this.inputCount++;
      }
    }
    return sum.reduce((acc, cur) => acc + cur);
  }

  winnerCheck(arr: number[]) {
    arr.forEach(
      (item, i) => {
        if (!item) { this.winner = this.players[i];
        }
      });
  }

}
