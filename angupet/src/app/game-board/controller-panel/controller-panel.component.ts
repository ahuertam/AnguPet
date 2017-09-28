import { Component, OnInit } from '@angular/core';
import { communicationsAmongBoard } from '../communicationsAmongBoard'

@Component({
  selector: 'app-controller-panel',
  templateUrl: './controller-panel.component.html',
  styleUrls: ['./controller-panel.component.css']
})
export class ControllerPanelComponent implements OnInit {
foodCounter: any;
  sleepCounter: any;
  cleanCounter: any;
  playCounter: any;
  healthCounter: any;
  isIll: boolean;
  isHappy: boolean;
  isSad: boolean;
  isAngry: any;
  isDead: any;
  currentCounter: any;
  constructor() { }

  ngOnInit() {
    this.isDead = false;
    this.currentCounter = '';
    this.isIll = false;
    this.isHappy = false;
    this.isSad = false;
    this.isAngry = false;
    this.foodCounter = 0;
    this.sleepCounter = 0;
    this.cleanCounter = 0;
    this.playCounter = 0;
    this.healthCounter = 0;
  }

  changeStatus(status) {
    switch (status) {
      case 'ill':
        communicationsAmongBoard.abnormalStatus.ill = !communicationsAmongBoard.abnormalStatus.ill;
        break;
      case 'normal':
        communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.normal));
        break;
      case 'sad':
        communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.sad));
        break;
      case 'angry':
        communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.anger));
        break;
      case 'happy':
        communicationsAmongBoard.currentState = JSON.parse(JSON.stringify(communicationsAmongBoard.petState.happy));
        break;
      case 'dead':
        communicationsAmongBoard.abnormalStatus.dead = !communicationsAmongBoard.abnormalStatus.dead;
        this.isDead = true;
        break;
      default:
        break;
    }
  }
  giveFood() {
    if (!communicationsAmongBoard.abnormalStatus.dead) {
      this.checkCounter('food');
      this.foodCounter++;
      if (this.foodCounter <= 3) {
        this.increaseStat(1, 'life');
        this.increaseStat(1, 'happiness');
      } else {
        if (this.foodCounter > 5) {
          this.decreaseStat(2, 'health');
        }
        this.increaseStat(1, 'happiness');
      }
    }
  }
  play() {
    if (!communicationsAmongBoard.abnormalStatus.dead) {
      this.checkCounter('play');
      this.playCounter++;
      if (this.playCounter < 3) {
        if (this.playCounter === 1) {
          this.increaseStat(1, 'life');
        }
        this.increaseStat(1, 'health');
        this.increaseStat(1, 'happiness');
      } else {
        this.decreaseStat(1, 'happiness');
        this.decreaseStat(1, 'life');
      }
    }
  }

  clean() {
    if (!communicationsAmongBoard.abnormalStatus.dead) {
      this.checkCounter('clean');
      this.cleanCounter++;
      if (this.cleanCounter < 3) {
        if (this.cleanCounter === 1) {
          this.increaseStat(1, 'health');
        }
        this.increaseStat(1, 'health');
      } else {
        this.decreaseStat(2, 'happiness');
        this.decreaseStat(1, 'life');
      }
    }
  }

  sleep() {
    if (!communicationsAmongBoard.abnormalStatus.dead) {
      this.checkCounter('sleep');
      this.sleepCounter++;
      if (this.sleepCounter < 3) {
        if (this.sleepCounter === 1) {
          this.increaseStat(2, 'health');
          this.increaseStat(2, 'life');
          this.decreaseStat(2, 'happiness');
        }
        this.increaseStat(1, 'health');
        this.increaseStat(1, 'life');
      } else {
        this.decreaseStat(4, 'happiness');
        this.decreaseStat(4, 'health');
      }
    }
  }

  ngDoCheck() {
    if (communicationsAmongBoard.abnormalStatus.dead && communicationsAmongBoard.flagReset) {
      this.resetCounter('');
      communicationsAmongBoard.flagReset = false;
    }
    if (communicationsAmongBoard.health < 29 && !this.isIll) {
      this.changeStatus('ill');
      this.isIll = true;
    }
    if (communicationsAmongBoard.health > 30 && this.isIll) {
      this.changeStatus('ill');
      this.isIll = false;
    }
    if (communicationsAmongBoard.happiness > 70 && !this.isHappy) {
      this.changeStatus('happy');
      this.isHappy = true;
    }
    if ((communicationsAmongBoard.happiness < 69 && communicationsAmongBoard.happiness >= 41) && this.isHappy) {
      this.changeStatus('normal');
      this.isHappy = false;
      this.isSad = false;
    }
    if ((communicationsAmongBoard.happiness <= 40 && communicationsAmongBoard.happiness >= 20) && !this.isSad) {
      this.isSad = true;
      this.isAngry = false;
      this.changeStatus('sad');
    }
    if (communicationsAmongBoard.happiness <= 19 && !this.isAngry) {
      this.isSad = false;
      this.isAngry = true;
      this.changeStatus('angry');
    }

  }

  checkCounter(counterToCheck) {
    if (this.currentCounter !== counterToCheck) {
      this.resetCounter(this.currentCounter);
    }
    this.currentCounter = counterToCheck;
  }


  resetCounter(counterToReset) {
    switch (counterToReset) {
      case 'food':
        this.foodCounter = 0;
        break;
      case 'sleep':
        this.sleepCounter = 0;
        break;
      case 'clean':
        this.cleanCounter = 0;
        break;
      case 'play':
        this.playCounter = 0;
        break;
      case 'health':
        this.healthCounter = 0;
        break;
      default:
        this.foodCounter = 0;
        this.sleepCounter = 0;
        this.cleanCounter = 0;
        this.playCounter = 0;
        this.healthCounter = 0;
        break;
    }

  }
  increaseStat(number, stat) {
    for (let i = 0; i < number; i++) {
      switch (stat) {
        case 'life':
          if (communicationsAmongBoard.life <= 99) {
            communicationsAmongBoard.life++;
          }
          break;
        case 'happiness':
          if (communicationsAmongBoard.happiness <= 99) {
            communicationsAmongBoard.happiness++;
          }
          break;
        case 'health':
          if (communicationsAmongBoard.health <= 99) {
            communicationsAmongBoard.health++;
          }
          break;
      }
    }
  }
  decreaseStat(number, stat) {
    for (let i = 0; i < number; i++) {
      switch (stat) {
        case 'life':
          if (communicationsAmongBoard.life >= 0) {
            communicationsAmongBoard.life--
          }
          break;
        case 'happiness':
          if (communicationsAmongBoard.happiness >= 0) {
            communicationsAmongBoard.happiness--
          }
          break;
        case 'health':
          if (communicationsAmongBoard.health >= 0) {
            communicationsAmongBoard.health--
          }
          break;
      }
    }
  }
}

