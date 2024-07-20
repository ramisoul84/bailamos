import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  LoginUserDto,
  RegisterUserDto,
  ResponseLoginDto,
} from '../_models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  serverUrl: string;
  private _loginSuccess$ = new Subject<boolean>();
  private _userProfile$ = new BehaviorSubject<ResponseLoginDto | undefined>(
    undefined
  );
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
    this.serverUrl = environment.serverUrl;
  }

  public get loginSuccess(): Observable<boolean> {
    return this._loginSuccess$;
  }
  public get userProfile(): Observable<ResponseLoginDto | undefined> {
    return this._userProfile$;
  }

  register(user: RegisterUserDto) {
    return this.http.post(`${this.serverUrl}/auth/register`, user);
  }

  login(user: LoginUserDto) {
    return this.http
      .post<ResponseLoginDto>(`${this.serverUrl}/auth/login`, user)
      .subscribe({
        next: (userData) => {
          this._loginSuccess$.next(true);
          //this._userProfile$.next(userData);
          this.storage.setUser(userData);
          setTimeout(() => {
            this.router.navigate(['profile/main']);
          }, 1500);
        },
        error: () => this._loginSuccess$.next(false),
      });
  }

  logout(): void {
    this.storage.removeUser();
    this.router.navigate(['login']);
  }
}
