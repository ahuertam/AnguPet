import { Component, OnInit } from '@angular/core';
import { communicationsAmongBoard } from '../communicationsAmongBoard'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-pet-panel',
  templateUrl: './pet-panel.component.html',
  styleUrls: ['./pet-panel.component.css']
})
export class PetPanelComponent implements OnInit {
  egg:any;
 petState: any;
  petAbnormal: any;
  years = 0;
  timerAge: any;
  observAge: any;
  life: any;
  happiness: any;
  health: any;
  isDead: boolean;
  penalize: any;
  extraPoints: any;
  totalPoints: any;
  // set bar
  constructor() { }

  ngOnInit() {
    this.egg = communicationsAmongBoard.petState.egg.url;
    this.totalPoints = 0;
    this.penalize = 0;
    this.extraPoints = 0;
    this.isDead = true;
  }
  startGame() {
    this.restartVariables();
    this.timerAge = Observable.timer(1000, 500);
    this.observAge = this.timerAge.subscribe(t => this.aging(t));
  }
  restartVariables() {
    this.isDead = false;
    if (communicationsAmongBoard.abnormalStatus.ill === true) {
      communicationsAmongBoard.abnormalStatus.ill = !communicationsAmongBoard.abnormalStatus.ill;
    }
    communicationsAmongBoard.petState.normal.state = true;
    communicationsAmongBoard.petState.dead.state,
      communicationsAmongBoard.petState.sad.state,
      communicationsAmongBoard.petState.happy.state,
      communicationsAmongBoard.petState.anger.state = false;
    communicationsAmongBoard.abnormalStatus.anger,
      communicationsAmongBoard.abnormalStatus.dead,
      communicationsAmongBoard.abnormalStatus.ill,
      communicationsAmongBoard.abnormalStatus.dying = false;
    communicationsAmongBoard.currentState = {};
    communicationsAmongBoard.life = 100;
    communicationsAmongBoard.happiness = 50;
    communicationsAmongBoard.health = 70;
    this.totalPoints = 0;
    this.penalize = 0;
    this.extraPoints = 0;
    communicationsAmongBoard.points = 0;


    this.petState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.normal));
    communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(this.petState));
    this.petAbnormal = JSON.parse(JSON.stringify(communicationsAmongBoard.abnormalStatus));
    this.life = communicationsAmongBoard.life;
    this.happiness = communicationsAmongBoard.happiness;
    communicationsAmongBoard.abnormalStatus.dead = false;

  }
  aging(age) {
    this.years = age;
    (age < 99 && this.life > 0) ? this.ageBehave(age) : this.endLife();
  }

  ageBehave(age) {
    if (age >= 0 && age <= 10) {
      if (age === 1) {
        console.log("Child Phase")
      }
      this.restStats(age);
    } else if (age >= 11 && age <= 20) {
      if (age === 11) {
        console.log("Teen Phase")
      }
      this.restStats(age);
    }
    else if (age >= 21 && age <= 30) {
      if (age === 21) {
        console.log("Young Adult Phase")
      }
      this.restStats(age);
    }
    else if (age >= 31 && age <= 50) {
      if (age === 31) {
        console.log("Adult Phase")
      }
      this.restStats(age);
    }
    else if (age >= 51 && age <= 70) {
      if (age === 51) {
        console.log("senior Phase");
        this.extraPoints = this.extraPoints + 10;
      }
      this.restStats(age);
    }
    else if (age >= 71 && age < 99) {
      if (age === 71) {
        console.log("Oldies Phase");
        this.extraPoints = this.extraPoints + 10;
      }
      this.restStats(age);
    }
  }
  substractLife(timesExec) {
    for (let i = 0; i < timesExec; i++) {
      if (this.life >= 1) {
        this.life--;
        communicationsAmongBoard.life--;
      }
    }
  }
  substractHealth(timesExec) {
    for (let i = 0; i < timesExec; i++) {
      if (this.health >= 1) {
        this.health--;
        this.penalize++;
        communicationsAmongBoard.health--;
      }
    }
  }
  substractHappiness(timesExec) {
    for (let i = 0; i < timesExec; i++) {
      if (this.happiness >= 1) {
        this.happiness--;
        this.penalize++;
        communicationsAmongBoard.happiness--;
      }

    }
  }
  restStats(age) {
    this.checkhealth();
    if (age < 99) {
      this.substractLife(1);
      if (age > 30) {
        this.substractLife(2);
        this.substractHealth(1);
        if (age > 60) {
          this.substractLife(3);
          this.substractHealth(2);
          this.substractHappiness(1);
          if (age > 89) {
            this.substractLife(3);
            this.substractHealth(3);
            this.substractHappiness(2);
          }
        }
      }
    }
  }
  checkhealth() {
    if (this.health < 40) {
      communicationsAmongBoard.abnormalStatus.ill = true;
      this.substractLife(3);
    } else {
      communicationsAmongBoard.abnormalStatus.ill = false;
    }
  }
  endLife() {
    console.log("End of life Phase")
    this.petAbnormal.dead, communicationsAmongBoard.abnormalStatus.dead = true;
    communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.dead));
    this.petState = JSON.parse(JSON.stringify(communicationsAmongBoard.currentState));
    this.observAge.unsubscribe();
    this.isDead = true;
    communicationsAmongBoard.flagReset = true;
  }
  calculatePoints() {

    this.totalPoints = Number(this.years + this.health + this.happiness + this.penalize + this.extraPoints);
    return this.totalPoints;
  }
  ngDoCheck() {
    //check if the state has changed
    if (communicationsAmongBoard.currentState !== this.petState) {
      this.petState = JSON.parse(JSON.stringify(communicationsAmongBoard.currentState));
    }
    if (communicationsAmongBoard.abnormalStatus !== this.petAbnormal) {
      this.petAbnormal = JSON.parse(JSON.stringify(communicationsAmongBoard.abnormalStatus));
    }
    if (communicationsAmongBoard.life !== this.life) {
      this.life = communicationsAmongBoard.life;
    }
    if (communicationsAmongBoard.happiness !== this.happiness) {
      this.happiness = communicationsAmongBoard.happiness;
    }
    if (communicationsAmongBoard.health !== this.health) {
      this.health = communicationsAmongBoard.health;
    }
    if (communicationsAmongBoard.points !== this.totalPoints) {
      communicationsAmongBoard.points = this.totalPoints;
    }
  }
}