import { Component, OnInit } from '@angular/core';
import {UserService} from "../../common/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
user;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);

  }


}
