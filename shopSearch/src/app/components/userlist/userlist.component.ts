import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public username:string = '';
  public phone:string = '';
  public email:string = '';
  public userList:any = [];

  constructor(private svclogin:LoginService) { }

  ngOnInit() {
    this.getUserList();
  }

  public saveUserEntry(){
    let name = this.username.trim(), phone = this.phone.trim(), email = this.email.trim();
    if(name === undefined || name === null || name === '' ){
      alert('Name is Required!')
    }else if(phone === undefined || phone === null || phone === '' ){
      alert('phone is Required!')
    }else if(email === undefined || email === null || email === '' ){
      alert('email is Required!')
    }else{
      this.svclogin.addNewUser(name,phone,email).then(res => {
        this.resetForm();
        this.getUserList();
      }).catch(err => {console.error('insert failed',err)});
    }
    
  }

  public getUserList(){
    this.svclogin.getUserList().then(list => {
      this.userList = list;
    }).catch(err => console.error('list failed',err));
  }

  public deleteUser(userId){
    this.svclogin.deleteUserById(userId).then(res => {
      this.getUserList();
    }).catch(err => console.error('delete Failed',err));
  }

  public deleteAll(){
    this.svclogin.deleteAllNonAdminUser().then(res => {
      this.getUserList();
    }).catch(err => console.error('delete all failed',err));
  }

  public resetForm(){
    this.username = '';
    this.phone = '';
    this.email = '';
  }

}
