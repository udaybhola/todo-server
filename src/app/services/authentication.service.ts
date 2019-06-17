import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import { userInfo } from 'os';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }
  ),
  withCredentials: true 
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = 'http://localhost:8080';
  private _sessionId: string;
  constructor(private http: HttpClient ) {  }

  login(username: string, password: string) : Observable<boolean>{
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log("tokennnnn",user.token)
               
            }
             
            return user;
        }));
}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}
