import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
auctions;
  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(res => {
this.auctions = res;
    })
  }

}
