import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

const dates = [
  moment(Date.now()).format('YYYY-MM-DD'),
  moment(Date.now()).add(1, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(2, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(3, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(4, 'days').format('YYYY-MM-DD')
];

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  today: any = Date.now();
  weathers1: any = {};
  weathers2: any = {};
  array: any = [];
  current_temp: number;
  coord_lat: number;
  coord_lng: number;
  degrees: string;
  x: any;
  myInterval = -1;
  showIndicator = false;

  lat: number;
  lng: number;

  constructor(private weather: AppService, public router: Router) {  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.current();
        this.forecastcoords();
      });
    } else {
      this.lat = 51.5073;
      this.lng = -0.1277;
    }
  }

  public groupByDate(data) {
    dates.forEach(date => {
      this.array.push(data.list.filter(item => item.dt_txt.indexOf(date, 0) >= 0));
    });
  }

  private current() {
    this.weather.getCurrent( { lat: this.lat, lng: this.lng })
    .subscribe((res: any) => {
      this.weathers1 = res;
      this.current_temp = Math.round(res.main.temp);
      this.coord_lat = Math.round(res.coord.lat);
      this.coord_lng = Math.round(res.coord.lon);
      function getDegrees(degree = res.wind.deg) {
        if (degree > 337.5) return 'Northerly';
        if (degree > 292.5) return 'North Westerly';
        if (degree > 247.5) return 'Westerly';
        if (degree > 202.5) return 'South Westerly';
        if (degree > 157.5) return 'Southerly';
        if (degree > 122.5) return 'South Easterly';
        if (degree > 67.5) return 'Easterly';
        if (degree > 22.5) return 'North Easterly';
        return 'Northerly';
      }
      this.degrees = getDegrees(this.x);
    }, err => {
      console.error(err);
    });
  }

  private forecastcoords() {
    this.weather.getForecastData({ lat: this.lat, lng: this.lng })
      .subscribe((res: any) => {
        this.weathers2 = res;

        this.groupByDate(res);

        }, err => {
        console.error(err);
    });
  }
}
