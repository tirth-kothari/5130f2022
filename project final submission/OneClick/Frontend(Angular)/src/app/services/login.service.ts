import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl:string = 'http://localhost:3000/login';
  registerUrl:string = 'http://localhost:3000/register';
  constructor(private http: HttpClient) { }

  isAlreadyLogin() {
    if (localStorage.getItem('USER_CRED') != null) {
      return true;
    }
    else {
      return false;
    }
  }

  // for logging in user
  userLogin(user_cred: any):Observable<string> {
    return this.http.post<any>(this.loginUrl,user_cred,httpOptions);
  }

  // for registering the user
  userRegister(user_cred: any):Observable<string> {
    return this.http.post<any>(this.registerUrl,user_cred,httpOptions);
  }

}
