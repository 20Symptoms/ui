import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

export interface QuestionItem {
  id: string;
  name: string;
}

export interface Question {
  type: 'single';
  text: string;
  items: Array<QuestionItem>;
}

export interface Condition {
  id: string;
  name: string;
  common_name: string;
  probability: number;
}

export interface Evidence {
  id: string;
  choice_id: string;
  initial: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SymptomsService {
  payload: Object;

  constructor(private http: HttpClient) {}

  getDiagnosis(data) {
    return this.http.get(`${BACKEND_URL}/diagnosis`, data);
  }

  postPayload(payload: any = this.payload) {
    return this.http.post<{
      question?: Question;
      should_stop: boolean;
      conditions: Array<Condition>;
    }>(`${BACKEND_URL}/diagnosis/symptoms`, payload);
  }

  getQuestion() {
    return this.http.get(`${BACKEND_URL}/diagnosis`);
  }
}
