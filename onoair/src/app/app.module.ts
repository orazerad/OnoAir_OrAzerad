import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {MatCardModule} from '@angular/material/card';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {HomeComponent} from './components/home/home.component';
import {ManageDestinationsComponent} from './components/admin/manage-destinations/manage-destinations.component';
import {ManageFlightsComponent} from './components/admin/manage-flights/manage-flights.component';
import {MyBookingsComponent} from './components/user/my-bookings/my-bookings.component';
import {SearchFlightsComponent} from './components/user/search-flights/search-flights.component';
import {HelpComponent} from './components/help/help.component';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButton} from '@angular/material/button';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {PassengerLuggageComponent} from "./components/user/passenger-luggage/passenger-luggage.component";
import {LuggageDialogComponent} from "./components/user/luggage-dialog/luggage-dialog.component";



@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    FooterComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    HeaderComponent,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatButton,
    HomeComponent,
    ManageDestinationsComponent,
    ManageFlightsComponent,
    MyBookingsComponent,
    SearchFlightsComponent,
    LuggageDialogComponent,
    PassengerLuggageComponent
  ],
  exports: [
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
