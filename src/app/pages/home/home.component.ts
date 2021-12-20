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
today = new Date();
  filters = [];
  selectedOption = 'ALL';
  filteredOrders = [];
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(res => {
res.forEach(a => {
  a.auction_cutoff = a.auction_cutoff.substring(0, a.auction_cutoff.length - 1);
  a.auction_cutoff = new Date(a.auction_cutoff);
  if (!a.fromAdmin) {
    this.auctions.push(a)
    this.filters.push(a.currency)
    this.filteredOrders = this.auctions;

  }})
      this.auctions.sort(function (a, b) {
        return b.auction_cutoff - a.auction_cutoff;
      });
      this.filters = this.filters.filter(this.onlyUnique)
    })
  }
  navigateToDetail(auction){
this.router.navigate(['/details'], {queryParams: {auction: JSON.stringify(auction)}})
  }
  navigateToOrder(auction){
this.router.navigate(['/order'], {queryParams: {auction: JSON.stringify(auction)}})
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  filter(option){
    if (option === 'ALL')
    {
      this.filteredOrders = this.auctions
      this.selectedOption = option;

    }
    else {
      this.selectedOption = option;
      this.filteredOrders = this.auctions.filter(f => f.currency === option)
    }
  }
}
