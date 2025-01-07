import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AccountService } from '@services/account.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private accountService = inject(AccountService);
  public user$: Observable<User> = this.accountService.user$;
}
