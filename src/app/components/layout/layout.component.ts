import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { User } from '@angular/fire/auth';

import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { first, map, Observable, Subscription } from 'rxjs';

import { AccountService } from '@services/index';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, Toolbar, Menu],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  protected loginMenu: MenuItem[] = [
    { label: 'Log In', routerLink: '/account/login' },
  ];
  protected accountMenu: MenuItem[] = [
    { label: 'Account', routerLink: '/account/profile' },
    {
      label: 'Log Out',
      command: () => {
        this.logout();
      },
    },
  ];
  public items: MenuItem[] = this.loginMenu;
  private userSubscription!: Subscription;

  constructor(private router: Router, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.userSubscription = this.accountService.user$.subscribe((user) => {
      if (user) {
        this.items = this.accountMenu;
      } else {
        this.items = this.loginMenu;
      }
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
          console.log(error);
        },
      });
  }
}
