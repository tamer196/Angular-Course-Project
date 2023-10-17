import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { UserModule } from "./user.module";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";



export interface AuthResponseData{
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<UserModule>(null);
  tokenExpirationTimer : any;

  constructor(private http : HttpClient,
    private router : Router,
    private cookieService: CookieService) { }

  signUp(email : string , password : string) : Observable<AuthResponseData>{

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseAPIKey,{
      email : email,
      password : password,
      returnSecureToken : true
    })
    .pipe(
      catchError(this.handleError),
      tap(respDta => {
        this.handleAuthintication(respDta.email,respDta.localId,respDta.idToken,+respDta.expiresIn);
      })
    );
  }


  logIn(email : string , password : string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='  + environment.FirebaseAPIKey,{
      email : email,
      password : password,
      returnSecureToken : true
    })
    .pipe(
      catchError(this.handleError),
      tap(respDta => {
        this.handleAuthintication(respDta.email,respDta.localId,respDta.idToken,+respDta.expiresIn);
      })
    );
  }

  autoLogin(){
    const userData : {
    email : string,
    id : string,
    _token : string,
    _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('userData'));

    // const userData : {
    //   email : string,
    //   id : string,
    //   _token : string,
    //   _tokenExpirationDate : string
    //   } = JSON.parse(this.cookieService.get('userData'));;

    if(!userData){
      return null;
    }

    const loadedUser = new UserModule(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime);
    }

  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    console.log(expirationDuration);
  }

  private handleAuthintication(email : string,userId : string, token : string , expiresIn : number){
    const expirationDate = new Date( new Date().getTime() + expiresIn * 1000);
    const user = new UserModule(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user));
    //this.cookieService.set('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let error = 'An Unknown Error Occured11';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'The email address is already in use by another account'
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'There is no user record corresponding to this identifier. The user may have been deleted'
        break;
      case 'INVALID_PASSWORD':
        error = 'The password is invalid or the user does not have a password'
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        error = 'INVALID LOGIN CREDENTIALS'
        break;
    }

    return throwError(error);
  }

}

