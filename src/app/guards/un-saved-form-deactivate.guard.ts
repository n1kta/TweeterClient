import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseFormBuilder } from '../helpers/baseFormBuilder';

@Injectable({
  providedIn: 'root'
})
export class UnSavedFormDeactivateGuard implements CanDeactivate<BaseFormBuilder> {
  canDeactivate(
    component: BaseFormBuilder,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return confirm("You have unsaved changes! Continue?");
  }
  
}
