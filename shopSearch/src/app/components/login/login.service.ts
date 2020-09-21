import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  private userLogin:BehaviorSubject<IuserLogin> = new BehaviorSubject({islogin:false,user_name:''});

  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('islogin') == 'true'){
      this.setUserLogin(localStorage.getItem('user_name'))
    }
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userLogin.value.islogin){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

  public getUserLogin():Observable<IuserLogin>{
    return this.userLogin;
  }

  public setUserLogin(UserName:string){
    this.userLogin.next({user_name:UserName,islogin:true});
  }

  public resetUserLogin(){
    this.userLogin.next({user_name:'',islogin:false})
    localStorage.clear();
    location.reload();
  }

  public verifyUserLogin(userName,credential){
    return this.http.post(environment.ApiUrl+'users/checklogin',{userName:userName,credential}).toPromise();
  }

  public addNewUser(name,phone,email){
    return this.http.post(environment.ApiUrl+'users/new',{name,phone,email}).toPromise();
  }

  public getUserList(){
    return this.http.get(environment.ApiUrl+'users/list').toPromise();
  }

  public deleteUserById(id){
    return this.http.get(environment.ApiUrl+`users/delete/${id}`).toPromise();
  }

  public deleteAllNonAdminUser(){
    return this.http.get(environment.ApiUrl+`users/deleteall`).toPromise();
  }
}

export interface IuserLogin{
  user_name:string,
  islogin:boolean
}