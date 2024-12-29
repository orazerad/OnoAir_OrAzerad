import { Component, OnInit } from '@angular/core';
import { Destination } from '../../../models/destination.model';
import { DestinationService } from '../../../services/destination.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';





@Component({
  selector: 'app-manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  standalone: true
})

export class ManageDestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  displayedColumns: string[] = ['code', 'name', 'airportName', 'airportWebsite', 'email', 'actions'];

  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDestinations();
  }

  loadDestinations() {
    this.destinationService.getAll().subscribe(destinations => {
      this.destinations = destinations;
    });
  }

  viewDestination(id: number) {
    console.log('Viewing destination:', id);
  }
}
