import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
rate;
alert = false;
  constructor(private auctionService: AuctionService,
              private router: Router) { }

  ngOnInit(): void {
  }
  saveOrder(type){
    const order = {
      rate: this.rate,
      direction: type,
      volume: "0",
      unit: "0",
      modified_by: 0,
      hasAlarm: this.alert
    }
    this.auctionService.CreateOrder(1, order).subscribe(res => {
      this.router.navigate(['trade'])
    })
  }

}
