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
  filters = [];
  filteredOrders = [];
  option = [];
  set = [];
  constructor( private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(res => {
      res.forEach(a => {
        if(!a.fromAdmin) {
          this.filters.push({type: a.currency, id: a.id, date: a.auction_cutoff, rate: a.rate_mid})
        }
      })
    })
  }
  deleteAlarm(id){
this.alarms.splice(id, 1)
  }
  addAlarm(){
    this.alarms.push({id: this.alarms.length + 1})
  }
  chooseRP(option, index){
    if (this.option[index] === option){
      this.option[index] = null;
    }
    else {
      this.option[index] = option;
    }  }
  saveOrder(index, rate, id){
    if(Math.abs(this.set[index] - rate) < 0.5) {
      if(this.option) {
        const order = {
          rate: this.set[index],
          direction: this.option[index],
          volume: "0",
          unit: "0",
          modified_by: 0,
          hasAlarm: true,
          isFromAdmin: false
        }
        this.auctionService.CreateOrder(id, order).subscribe(res => {
          this.router.navigate(['alarm'])
        })
      }
      else {
        alert('select pay or rec')
      }
    }
    else {
      alert('set value mast be between ' + (+rate + 0.5) + ' and '+ (rate - 0.5))
    }
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
