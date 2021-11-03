import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLoggedInStatus());
  private loggedInAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLoggedAsAdminInStatus());

  constructor(private router: Router) {
  }
  public signOut(): void {
    window.localStorage.clear();
    this.loggedIn.next(false);
    this.loggedInAdmin.next(false);
    this.router.navigate(['/login']);
  }
  private getIsLoggedInStatus(): any {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    const user = this.getUser();
    const isAdmin = (user && user.roles) ? user.roles.filter((role: string) => role === 'ADMIN').length > 0 : false;
    return token !== null ? (!jwtHelper.isTokenExpired(token) && !isAdmin) : false;
  }
  private getIsLoggedAsAdminInStatus(): any {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    const user = this.getUser();
    const isAdmin = (user && user.roles) ? user.roles.filter((role: string) => role === 'ADMIN').length > 0 : false;
    return token !== null ? (!jwtHelper.isTokenExpired(token) && isAdmin) : false;
  }

  get isLoggedIn(): any {
    return this.loggedIn.asObservable();
  }

  get isLoggedInAsAdmin(): any {
    return this.loggedInAdmin.asObservable();
  }


  public login(isAdmin: boolean): void {
    if (!isAdmin) {
      this.loggedIn.next(true);
      this.loggedInAdmin.next(false);
      this.router.navigate(['']);
    }
    if (isAdmin) {
      this.loggedIn.next(false);
      this.loggedInAdmin.next(true);
      this.router.navigate(['/admin']);
    }
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isAdmin(): boolean {
    const user = this.getUser();
    if (!user.roles) {
      return false;
    }
    return user.roles.filter((role: string) => role === 'ADMIN').length > 0;
  }

}
