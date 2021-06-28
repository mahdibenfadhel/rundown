import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trade-blotter',
  templateUrl: './trade-blotter.component.html',
  styleUrls: ['./trade-blotter.component.scss']
})
export class TradeBlotterComponent implements OnInit {
  orders;
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getOrders().subscribe(res => {
      this.orders = res;
  })
  }
  deleteAll(){
    this.orders = [];
  }
  goToAlarms(){
this.router.navigate(['alarm'])
  }
}
