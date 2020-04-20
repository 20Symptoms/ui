import { Component, OnInit } from '@angular/core';
import { tap, timeInterval } from 'rxjs/operators';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { SymptomsService } from './symptoms.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Symptoms-UI';

  counter = 1;

  constructor(private symptomsService: SymptomsService) {}

  public questionNumber: string = 'Question 1: ';
  public question: string = 'Do you have a headache?';
  public done = false;
  public response: Observable<any>;
  public name = '';
  public questionAnswer = '';

  public sexControl = new FormControl('', Validators.required);
  public ageControl = new FormControl('', Validators.required);

  public sexes = ['Male', 'Female', 'Dan'];

  public ages = new Array(100).fill(undefined).map((_, i) => i + 1);

  public payload = {
    sex: this.sexControl.value,
    age: this.ageControl.value,
    evidence: [],
  };

  yesFunction(): void {
    console.log('Yes selected');
    this.questionAnswer = 'present';
    let payload = this.payload;
    payload['evidence'].push({
      id: 's_21',
      choice_id: this.questionAnswer,
      initial: 'true',
    });
    this.payload = payload;
    this.buttonClicked();
  }

  noFunction(): void {
    console.log('No selected');
    this.questionAnswer = 'absent';
    let payload = this.payload;
    payload['evidence'].push({
      id: 's_21',
      choice_id: this.questionAnswer,
      initial: 'true',
    });
    this.payload = payload;
    this.buttonClicked();
  }

  idkFunction(): void {
    console.log('Idk selected');
    this.questionAnswer = 'unknown';
    this.buttonClicked();
  }

  buttonClicked(): void {
    this.response = this.symptomsService.getDiagnosis(this.payload);
    if (this.counter === 20) {
      this.gettingDiagnosis();
    } else {
      this.counter++;
      this.questionNumber = `Question ${this.counter}: `;
    }
  }

  playAgainFunction(): void {
    console.log('playing again');
    this.counter = 1;
    this.questionNumber = `Question ${this.counter}:`;
    window.location.reload();
  }

  async gettingDiagnosis() {
    console.log('getting your diagnosis...');
    this.questionNumber = 'Getting your diagnosis...';
    this.question = '';

    this.done = true;
    // this.questionNumber = 'You are fucked';
    // this.question = ' :(';
  }

  public rickRoll() {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
