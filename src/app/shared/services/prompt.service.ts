import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { map, of } from 'rxjs';

type Translation = {
  translation: string;
  word: string;
};

export interface generateWordsResponse {
  response: Translation[];
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  constructor(private http: HttpClient) {}

  public generateWords(prompt: string) {
    return this.http
      .post<{ response: string }>(
        // 'https://codes-eos-matters-regard.trycloudflare.com/api/generate-vocab',
        // '/api/generate-vocab',
        isDevMode()
          ? '/api/generate-vocab'
          : 'https://api.tower-ed.xyz/api/generate-vocab',
        { prompt }
      )
      .pipe(
        map((res) => {
          if (!res.response || res.response == '') {
            return '';
          }
          return JSON.parse(res.response);
        })
      );
    // return of(null);
  }
}
