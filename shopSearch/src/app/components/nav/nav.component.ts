import { Component, OnInit } from '@angular/core';
import { IuserLogin, LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public userLogin:IuserLogin = {user_name:'',islogin:false};

  constructor(private svclogin:LoginService) {
    this.svclogin.getUserLogin().subscribe(login => {
      this.userLogin = login;
    })
   }

  ngOnInit() {
  }

  public Logout(){
    this.svclogin.resetUserLogin();
  }

}
