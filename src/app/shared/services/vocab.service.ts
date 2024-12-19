import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VocabService {

  constructor(private http: HttpClient) { }

  public prompt(text: string) {
    this.http.post('http://localhost:8000/api/v1/prompt', { prompt: text }).subscribe(res => console.log(res));
  }
}
