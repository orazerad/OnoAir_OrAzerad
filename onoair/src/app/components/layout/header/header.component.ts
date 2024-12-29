import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // imports: [MatToolbarModule, MatListModule,],
  imports: [CommonModule, MatToolbarModule, MatListModule, RouterModule, MatButton],
  standalone: true
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateManageDestinations() {
    this.router.navigate(['/manage-destinations']);
  }
}
