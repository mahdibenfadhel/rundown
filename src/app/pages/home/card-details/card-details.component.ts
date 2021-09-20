import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../../common/services/auction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
auction;
min = 0;
max = 100;
registerForm: FormGroup;
  public dateNow = new Date();

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;
  private subscription: Subscription;

  constructor(private auctionService: AuctionService,
            private fb: FormBuilder,
            private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.auction = JSON.parse(this.route.snapshot.queryParams.auction);
    const auctionC = JSON.parse(this.route.snapshot.queryParams.auction);
    this.min = auctionC.rate_mid - 0.5
    this.max = +auctionC.rate_mid + 0.5
    this.setForm()
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(new Date (this.auction.auction_cutoff)); });
  }
  private getTimeDifference (date) {
    this.timeDifference = date.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }
  setForm(): void{
    const auctionC = JSON.parse(this.route.snapshot.queryParams.auction);
    this.registerForm = this.fb.group(
      {
        rate: [
          auctionC.rate_mid,
          Validators.compose([Validators.required, Validators.max(+this.max), Validators.min(this.min)])
        ],
        notional: [
          0,
          Validators.compose([Validators.required, Validators.min(0)])
        ],
        dv01: [
          0,
          Validators.compose([Validators.required, Validators.min(0)])
        ]
      }
    );
    this.registerForm.get('notional').valueChanges.subscribe(v => {
      const diff = new Date(this.auction.rate_end).getTime() - new Date(this.auction.rate_start).getTime();
      this.registerForm.get('dv01').setValue(0.0001 * v * (diff/(1000*60*60*24))/365)
    })
  }
  saveOrder(type){
  if (this.registerForm.valid)
    {
      const order = {
        rate: this.registerForm.value.rate,
        direction: type,
        volume: "0",
        unit: "0",
        modified_by: 0,
        hasAlarm: false,
        isFromAdmin: false,
        dv01: Number(this.registerForm.value.dv01.toFixed(4)),
        notional: this.registerForm.value.notional,
      }
      this.auctionService.CreateOrder(this.auction.id, order).subscribe(res => {
        this.router.navigate(['orders'])
      })
    }
  }
}
