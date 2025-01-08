import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ButtonModule, CardModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public links = ['My Flashcards', 'New Set'];
}
