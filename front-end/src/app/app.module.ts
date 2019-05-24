import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppService } from './services/app.service';

import { routes } from './app.routing';
import { AppComponent } from './app.component/app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForecastDataComponent } from './main-page/forecast-data/forecast-data.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundComponent,
    ForecastDataComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot( routes ),
    HttpClientModule,
    FormsModule
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {  }
