import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, Route, Router } from '@angular/router';

import { User } from '@angular/fire/auth';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { first, Observable } from 'rxjs';

import { AccountService } from '@services/index';

@Component({
    selector: 'app-layout',
    imports: [
        RouterOutlet,
        RouterLink,
        NgIf,
        AsyncPipe,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private router = inject(Router);
  private accountService = inject(AccountService);
  public user$: Observable<User> = this.accountService.user$;

  public logout(): void {
    this.accountService
      .logout()
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
