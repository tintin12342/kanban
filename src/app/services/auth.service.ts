import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../env/environment';
import { AuthResponse, RegisterData } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);

  #storedToken: string | null = localStorage.getItem('auth_token');
  #tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(this.#storedToken);

  get currentToken(): string | null {
    return this.#tokenSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.#http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._setToken(response.token);
        }),
      );
  }

  register(userData: RegisterData): Observable<AuthResponse> {
    return this.#http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap((response) => {
          this._setToken(response.token);
        }),
      );
  }

  logout(): void {
    this._clearToken();
    this.#router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentToken && !this._isTokenExpired();
  }

  private _setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.#tokenSubject.next(token);
  }

  private _clearToken(): void {
    localStorage.removeItem('auth_token');
    this.#tokenSubject.next(null);
  }

  private _isTokenExpired(): boolean {
    const token = this.currentToken;
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }
}
