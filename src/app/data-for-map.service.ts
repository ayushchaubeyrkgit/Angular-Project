import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { DistrictS, DistrictTS, DataCarousel, DataInstruction } from './districtData';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataForMapService {

  private _url: string = "/assets/data/districts.json";
  private _url2: string = "/assets/data/districts_thana.json";
  private _url3: string = "/assets/data/carousel_data.json";
  private _url4: string = "/assets/data/instruction_data.json";

  constructor(private http: HttpClient) { }
    
    getData(): Observable<DistrictS[]> {
      return this.http.get<DistrictS[]>(this._url).pipe(
                      catchError(this.errorHandler));
    }

    getDataThana(): Observable<DistrictTS[]> {
      return this.http.get<DistrictTS[]>(this._url2).pipe(
                      catchError(this.errorHandler));
    }

    getDataCarousel(): Observable<DataCarousel[]> {
      return this.http.get<DataCarousel[]>(this._url3).pipe(
                      catchError(this.errorHandler));
    }

    getDataInstruction(): Observable<DataInstruction[]> {
      return this.http.get<DataInstruction[]>(this._url4).pipe(
                      catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
      return observableThrowError(error.message || "server error");
    }

}
