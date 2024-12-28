import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ManageDestinationsComponent } from './components/admin/manage-destinations/manage-destinations.component';
import { ManageFlightsComponent } from './components/admin/manage-flights/manage-flights.component';
import { MyBookingsComponent } from './components/user/my-bookings/my-bookings.component';
import { SearchFlightsComponent } from './components/user/search-flights/search-flights.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage-destinations', component: ManageDestinationsComponent },
  { path: 'manage-flights', component: ManageFlightsComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'search-flights', component: SearchFlightsComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }