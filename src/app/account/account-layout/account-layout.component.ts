import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services';
import { Firestore } from 'firebase/firestore';

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
    if (this.accountService.user) {
      console.log(this.accountService.user);
      this.router.navigate(['/']);
    }
  }
}
