import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../common/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
              ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.required),
    });
  }
  login(){
   if (this.loginForm.invalid){
     this.loginForm.markAllAsTouched()
   }
   else {
     this.error = false;
 const cred = {
   email: this.loginForm.value.login,
   password: this.loginForm.value.password
 }
 this.userService.login(cred).subscribe( res => {
   this.userService.setAuth(res.user, res.accessToken)
   this.router.navigate(['/home'])
 },
   error => this.error = true);
   }
  }
}
