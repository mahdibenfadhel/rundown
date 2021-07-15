import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../../common/services/auction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";

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
  }
  setForm(): void{
    const auctionC = JSON.parse(this.route.snapshot.queryParams.auction);
    this.registerForm = this.fb.group(
      {
        rate: [
          auctionC.rate_mid,
          Validators.compose([Validators.required, Validators.max(+this.max), Validators.min(this.min)])
        ]
      }
    );
  }
  saveOrder(type){
  console.log(this.registerForm, this.min, this.max)
  if (this.registerForm.valid)
    {
      const order = {
        rate: this.registerForm.value.rate,
        direction: type,
        volume: "0",
        unit: "0",
        modified_by: 0,
        hasAlarm: false
      }
      this.auctionService.CreateOrder(1, order).subscribe(res => {
        this.router.navigate(['trade'])
      })
    }
  }

}
