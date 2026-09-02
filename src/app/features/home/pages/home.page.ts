import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  private router = inject(Router);

  goToWeather() {
    this.router.navigate(['/weather']);
  }

  goToPhotography() {
    this.router.navigate(['/clima-fotografia']);
  }
}
