import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
auctions = [];
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(res => {
res.forEach(a => {
  a.auction_cutoff = new Date(a.auction_cutoff)
  a.rate_end = new Date(Date.UTC(+a.rate_end.split("-")[0], +a.rate_end.split("-")[1], +a.rate_end.split("-")[2]))
  a.rate_start = new Date(Date.UTC(+a.rate_start.split("-")[0], +a.rate_start.split("-")[1], +a.rate_start.split("-")[2]))
  if (!a.fromAdmin) {
    this.auctions.push(a)
  }})
      console.log(this.auctions)
    })
  }
  navigateToDetail(auction){
this.router.navigate(['/details'], {queryParams: {auction: JSON.stringify(auction)}})
  }
  navigateToOrder(auction){
this.router.navigate(['/order'], {queryParams: {auction: JSON.stringify(auction)}})
  }
}
