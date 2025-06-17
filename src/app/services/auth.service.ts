import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getStoredToken();
    if (token) {
      this.tokenSubject.next(token);
      this.getCurrentUser().subscribe();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.access_token) {
            this.setToken(response.access_token);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    console.log(userData);
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap((response) => {
          console.log(response);
          if (response.access_token) {
            this.setToken(response.access_token);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  getCurrentUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/auth/me`).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.tokenSubject.next(token);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
  }
}
