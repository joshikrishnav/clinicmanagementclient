import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Patient } from './patient';
//import data from './patients.json';
import * as data from './patients.json';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/patient/';
  private patients;
  constructor(private http: HttpClient) {
    this.patients = data;
  }

  getAll(): Observable<any> {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.patients); // This method same as resolve() method from Angular 1
        console.log('am done');
        observer.complete();//to show we are done with our processing
        // observer.error(new Error('error message'));
      }, 20);

    });


    //return this.http.get(`${this.baseUrl}`);
  }

  save(patient: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, patient);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  get(id: string): Observable<any> {

    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.patients[0]); // This method same as resolve() method from Angular 1
        console.log('am done');
        observer.complete();//to show we are done with our processing
        // observer.error(new Error('error message'));
      }, 20);

    });

    //return this.http.get(`${this.baseUrl}/${id}`);
  }

  search(name: string): Observable<any> {


    console.log("Search term :" + name);
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.patients.filter(function (patient) {
          console.log(patient.name.toLowerCase().indexOf(name));
          return patient.name.toLowerCase().indexOf(name) >= 0;
        })) // This method same as resolve() method from Angular 1
        console.log('am done');
        observer.complete();//to show we are done with our processing
        // observer.error(new Error('error message'));
      }, 20);

    });

    //return new Observable<Patient>((subscriber: Subscriber<Patient>) => subscriber.next(new Patient())).map(o => JSON.stringify(o));
    //return this.http.get(`${this.baseUrl}/${id}`);
  }


}
