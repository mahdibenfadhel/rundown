import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  alarms = []
  option;
  current = 4.05;
  set = 0;
  constructor( private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
  }
  deleteAlarm(id){
this.alarms.splice(id, 1)
  }
  addAlarm(){
    this.alarms.push({id: this.alarms.length + 1})
  }
  chooseRP(option){
    if (this.option === option){
      this.option = null;
    }
    else {
      this.option = option;
    }  }
  saveOrder(){
    if(Math.abs(this.set - this.current) < 0.5) {
      if(this.option) {
        const order = {
          rate: this.set,
          direction: this.option,
          volume: "0",
          unit: "0",
          modified_by: 0,
          hasAlarm: true,
          isFromAdmin: false
        }
        this.auctionService.CreateOrder(1, order).subscribe(res => {
          this.router.navigate(['alarm'])
        })
      }
      else {
        alert('select pay or rec')
      }
    }
    else {
      alert('set value mast be between ' + (this.current + 0.5) + ' and '+ (this.current - 0.5))
    }
  }
}
