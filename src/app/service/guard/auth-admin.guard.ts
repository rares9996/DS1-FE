import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../token-storage.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class  AuthAdminGuard implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.tokenStorageService.isLoggedInAsAdmin.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );

  }
}
