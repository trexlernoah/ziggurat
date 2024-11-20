import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.css',
})
export class AccountLayoutComponent {
  constructor(private router: Router, private accountService: AccountService) {
    // redirect to home if already logged in
    this.accountService.authState
      .pipe(
        tap((user) => {
          console.log(user);
          if (!!user) this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
