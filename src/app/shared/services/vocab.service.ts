import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

type Translation = {
  translation: string;
  word: string;
};

export interface generateWordsResponse {
  response: Translation[];
}

const mock = {
  response:
    '[ { "english_word": "engine", "translation": "motore" }, { "english_word": "wheel", "translation": "rueda" }, { "english_word": "fuel", "translation": "gasolina" }, { "english_word": "car", "translation": "coche" }, { "english_word": "brake", "translation": "pausa frenos" } ]',
};

@Injectable({
  providedIn: 'root',
})
export class VocabService {
  constructor(private http: HttpClient) {}

  public generateWords(prompt: string) {
    return this.http
      .post<{ response: string }>(
        // 'https://codes-eos-matters-regard.trycloudflare.com/api/generate-vocab',
        '/api/generate-vocab',
        { prompt }
      )
      .pipe(
        map((res) => {
          return JSON.parse(res.response);
        })
      );
    // return of(null);
  }
}
