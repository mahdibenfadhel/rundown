import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";

@Component({
  selector: 'app-trade-blotter',
  templateUrl: './trade-blotter.component.html',
  styleUrls: ['./trade-blotter.component.scss']
})
export class TradeBlotterComponent implements OnInit {
  orders;
  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getOrders().subscribe(res => {
      this.orders = res;
  })
  }

}
