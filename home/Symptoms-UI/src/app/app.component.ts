import { Component, OnInit } from '@angular/core';
import { tap, timeInterval } from 'rxjs/operators';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import {
  SymptomsService,
  Question,
  Evidence,
  Condition,
} from './symptoms.service';
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
  public question: Question = {
    type: 'single',
    text: 'Click on your most prevalent symptom',
    items: [],
  };
  public loading = false;

  public done = false;
  public forcedCompletion = false;

  public sexControl = new FormControl('', Validators.required);
  public ageControl = new FormControl('', Validators.required);

  public sexes = ['male', 'female'];

  public ages = new Array(100).fill(undefined).map((_, i) => i + 1);

  public evidence: Array<Evidence> = [];
  public condition?: Condition;
  public initialSymptoms: Array<{ id: string; name: string }> = [
    {
      id: 's_98',
      name: 'Fever',
    },
    {
      id: 's_21',
      name: 'Headache',
    },
    {
      id: 's_13',
      name: 'Stomach Pains',
    },
    {
      id: 's_331',
      name: 'Nasal Congestion',
    },
    {
      id: 's_102',
      name: 'Cough',
    },
    {
      id: 's_370',
      name: 'Dizzy',
    },
    {
      id: 's_50',
      name: 'Chest Pain',
    },
    {
      id: 's_2077',
      name: 'Major Bleeding',
    },
  ];

  async addEvidence(choice_id: string, symptom_id = this.question.items[0].id) {
    if (!this.sexControl.valid || !this.ageControl.valid) {
      this.sexControl.markAsTouched();
      this.ageControl.markAsTouched();
      return;
    }
    this.evidence.push({
      id: symptom_id,
      choice_id,
      initial: this.evidence.length === 0,
    });
    this.loading = true;
    const res = await this.symptomsService
      .postPayload({
        sex: this.sexControl.value,
        age: this.ageControl.value,
        extras: { disable_groups: 'True' },
        evidence: this.evidence,
      })
      .toPromise();
    this.loading = false;

    if (res.question === null) {
      this.forcedCompletion = true;
    }

    this.question = res.question;
    this.condition = res.conditions[0];
    // if (this.counter === 20) {
    //   // this.gettingDiagnosis();
    // } else {
    //   this.counter++;
    //   this.questionNumber = `Question ${this.counter}: `;
    // }
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
    // this.question = '';

    this.done = true;
  }

  public rickRoll() {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
