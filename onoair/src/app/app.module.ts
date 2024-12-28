import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      // ... other components
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule
    ],
    exports: [
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }



@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      // ... other components
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule
    ],
    exports: [
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }