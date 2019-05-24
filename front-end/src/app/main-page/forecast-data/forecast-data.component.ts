import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-forecast-data',
  templateUrl: './forecast-data.component.html',
  styleUrls: ['./forecast-data.component.css']
})

export class ForecastDataComponent implements OnInit {
  weathers: BehaviorSubject<any>;
  weatherData: BehaviorSubject<any>;
  myInterval = -1;
  showIndicator = false;

  formGroup: FormGroup;

  constructor(private weather: AppService) {
    this.weathers = this.weather.weather;
    this.weatherData = this.weather.subject;
  }

  ngOnInit() {
    this.forecast();
    this.formGroup = new FormGroup({
      city_name: new FormControl('', Validators.required)
    });
  }

  forecast() {
    this.weather.getForecast();
  }
}

