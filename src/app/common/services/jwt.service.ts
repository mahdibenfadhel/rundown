import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ApiService} from "./api.service";
const jwtKey = 'jwtUserToken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  constructor(private http: HttpClient,
              private apiService: ApiService){}
  getToken(): string {
    return localStorage.getItem(jwtKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(jwtKey, token);
  }

  destroyToken(): void {
    localStorage.removeItem(jwtKey);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    return this.apiService.post('auth/refreshToken', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens) => {
      this.storeJwtToken(tokens.data.token);
    }));
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem('jwtUserToken', jwt);
  }
  storeTokens(tokens) {
    localStorage.setItem('jwtUserToken', tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
}
