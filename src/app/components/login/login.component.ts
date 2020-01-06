import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginPayload } from '../../services/auth-service/login-payload';
import { AuthService } from '../../services/auth-service/auth.service';
import { Location } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loginPayload: LoginPayload;


  constructor(
    private authService: AuthService,
    private location: Location,
    private $localStorage: LocalStorageService
    ) { 
  this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  onSubmit(){
   this.loginPayload.username =  this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
        // console.log('IN LOGIN COMPONENT',this.$localStorage.retrieve('authenticationToken'));
        console.log('login success');


        // console.log('login fail');
    });
  }

  goHome() {
    this.location.back();
  }

}
