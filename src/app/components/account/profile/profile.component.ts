import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public user$!: Observable<null>;

  constructor(private accountService: AccountService) {
    // this.user$ = this.accountService.authState$;
  }
}
