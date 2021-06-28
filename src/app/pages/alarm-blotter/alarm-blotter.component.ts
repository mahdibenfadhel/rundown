import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alarm-blotter',
  templateUrl: './alarm-blotter.component.html',
  styleUrls: ['./alarm-blotter.component.scss']
})
export class AlarmBlotterComponent implements OnInit {
alarms;
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getOrders().subscribe(res => {
      this.alarms = res
    })

  }
  deleteAll(){
this.alarms = [];
  }
  goToOrders(){
    this.router.navigate(['trade'])

  }
}
