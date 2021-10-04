import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../common/services/user.service";
import {Router} from "@angular/router";
import {MustMatchValidator} from "../common/validators/mustMatch.validator";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    },
      {
        validators:[MustMatchValidator('password', 'confirmPassword')]
      });
  }
  login(){
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }
    else {
      const cred = {
        email: this.loginForm.value.login,
        name: this.loginForm.value.name,
        company: 'new',
        gui_version: 'new',
        last_action: new Date(),
        password: this.loginForm.value.password,
        passwordConfirmation: this.loginForm.value.password
      }
      this.userService.register(cred).subscribe( res => {
        this.userService.setAuth(res.user, res.accessToken)
        this.router.navigate(['/home'])
      });
    }
  }
}
