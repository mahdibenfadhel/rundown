import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";

@Component({
  selector: 'app-alarm-blotter',
  templateUrl: './alarm-blotter.component.html',
  styleUrls: ['./alarm-blotter.component.scss']
})
export class AlarmBlotterComponent implements OnInit {
alarms;
  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getOrders().subscribe(res => {
      this.alarms = res
    })
  }

}
