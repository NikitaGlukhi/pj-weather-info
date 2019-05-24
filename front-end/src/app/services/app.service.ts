import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

const url = environment.url;

const dates = [
  moment(Date.now()).format('YYYY-MM-DD'),
  moment(Date.now()).add(1, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(2, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(3, 'days').format('YYYY-MM-DD'),
  moment(Date.now()).add(4, 'days').format('YYYY-MM-DD')
];

@Injectable()
export class AppService {

  private weatherSubject = new BehaviorSubject([]);
  private weatherByCitySubject = new BehaviorSubject([]);
  private arrayOfWeather: any = [];

  constructor(private http: HttpClient) {
  }

  public groupByDate(data) {
    dates.forEach(date => {
      this.arrayOfWeather.push(data.result.list.filter(item => item.dt_txt.indexOf(date, 0) >= 0));
    });
    this.weatherSubject.next(this.arrayOfWeather);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  public insertToSubject(subject: any) {
    this.weatherByCitySubject.next(subject);
  }

  public getCurrent(data: { lat: number, lng: number }) {
    const options = data ?
      {params: new HttpParams().set('lat', data.lat.toString()).set('lng', data.lng.toString())} : {};
    return this.http.get(`${url}/current-position/weather-data`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getForecastData(data: { lat: number, lng: number }) {
    const options = data ?
      {params: new HttpParams().set('lat', data.lat.toString()).set('lng', data.lng.toString())} : {};
    return this.http.get(`${url}/current-position/forecast-weather-data`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getForecast() {
    this.http.get(`${url}/current-position/get-weather-by-city`)
      .subscribe((res: any) => {
        this.groupByDate(res);
        this.weatherByCitySubject.next(res);
      }, err => {
        console.log(err);
      });
  }

  public addNewCity(city) {
    return this.http.post(`${url}/api-city/add-city`, city)
      .pipe(
        catchError(this.handleError)
      );
  }

  get subject() {
    return this.weatherByCitySubject;
  }

  get weather() {
    return this.weatherSubject;
  }
}

