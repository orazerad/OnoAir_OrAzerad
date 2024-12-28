import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatListModule, RouterModule]
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }
}