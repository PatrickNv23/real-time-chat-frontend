import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../requests/SignUpRequest';
import { SignInRequest } from '../requests/SignInRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);

  signUp(signUpRequest: SignUpRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/Auth/SignUp`, signUpRequest);
  }

  signIn(signInRequest: SignInRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/Auth/SignIn`, signInRequest);
  }

  getCurrentSession(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/Auth/GetCurrentSession`);
  }
}
