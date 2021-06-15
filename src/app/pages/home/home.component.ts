import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
auctions;
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(res => {
this.auctions = res;
    })
  }
  navigateToDetail(){
this.router.navigate(['/details'])
  }
}
