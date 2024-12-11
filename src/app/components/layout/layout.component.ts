import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Route, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { first, map } from 'rxjs';

import { AccountService, AlertService } from '@services/index';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public sideNavOpened = false;
  public loggedIn = false;

  public links: Route[] = [{ path: 'flashcards', title: 'Flashcards' }];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.accountService.authState$
      .pipe(map((user) => (this.loggedIn = !!user)))
      .subscribe();
  }

  public logout(): void {
    this.accountService
      .logout()
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.alertService.error(error);
        },
      });
  }

  public toggleSidenav(): void {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
