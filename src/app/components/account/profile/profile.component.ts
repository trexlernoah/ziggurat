import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AccountService } from '@services/account.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public user$!: Observable<firebase.User | null>;

  constructor(private accountService: AccountService) {
    this.user$ = this.accountService.authState$;
  }
}
