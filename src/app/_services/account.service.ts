import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  LoginUserDto,
  RegisterUserDto,
  ResponseLoginDto,
} from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  serverUrl: string;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
  }

  register(user: RegisterUserDto) {
    return this.http.post(`${this.serverUrl}/auth/register`, user);
  }

  login(user: LoginUserDto) {
    return this.http.post<ResponseLoginDto>(
      `${this.serverUrl}/auth/login`,
      user
    );
  }
}
