import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3000/';
  // url = 'http://vps-e3bbe2b6.vps.ovh.net:3000/';
  constructor(private http: HttpClient) {}

  get(path: string, myParams: HttpParams = new HttpParams()): Observable<any> {
    const options = { params: myParams, headers: httpOptions.headers };
    return this.http.get(this.url + path, options);
  }
  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(this.url + path, body, httpOptions);
  }
  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(this.url + path, body, httpOptions);
  }
  delete(path: string): Observable<any> {
    return this.http.delete(this.url + path, httpOptions);
  }
  patch(path: string, body: object = {}): Observable<any> {
    return this.http.patch(this.url + path, body, httpOptions);
  }
}
