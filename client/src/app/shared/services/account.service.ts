import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    // return this.wrap(this.fireAuth.signInWithEmailAndPassword(email, password));
    return null;
  }

  public logout() {
    // return this.wrap(this.fireAuth.signOut());
    return null;
  }

  public register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/users/register`, 'hi');
  }
}
