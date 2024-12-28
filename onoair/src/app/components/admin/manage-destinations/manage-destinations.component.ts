import { Component, OnInit } from '@angular/core';
import { Destination } from '../../../models/destination.model';
import { DestinationService } from '../../../services/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css']
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