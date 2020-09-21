import { Router } from '@angular/router';
import { IuserLogin, LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin:IuserLogin = {user_name:'',islogin:false};
  public userName = '';
  public userPass = '';

  constructor(private svclogin:LoginService,private router:Router) {
    this.svclogin.getUserLogin().subscribe(login => {
      this.userLogin = login;
    })
    if(this.userLogin.islogin){
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
  }

  public validateLogin(){
    let username = this.userName.trim();
    let pass = this.userPass;
    if(username === undefined || username === null || username === '' ){
      alert('Username is required.')
    }else if(pass === undefined || pass === null || pass === ''){
      alert('enter your password');
    }else{
      this.svclogin.verifyUserLogin(username,pass).then(res => {
        if(res != undefined && res != null){
          localStorage.setItem('user_name',res.name)
          localStorage.setItem('islogin','true');
          this.svclogin.setUserLogin(res.name)
          this.router.navigate(['/'])
          this.resetForm();
        }
      }).catch(err => {
        alert('username or password is incorrect!')
      })
    }
    
  }

  public resetForm(){
    this.userName = '';
    this.userPass = '';
  }

}
