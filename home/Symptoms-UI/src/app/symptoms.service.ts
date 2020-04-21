import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

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
    return this.http.post(`${BACKEND_URL}/diagnosis/symptoms`, payload);
  }

  getQuestion() {
    return this.http.get(`${BACKEND_URL}/diagnosis`);
  }
}
