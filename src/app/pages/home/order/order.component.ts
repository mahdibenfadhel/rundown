import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
auction;
  constructor(    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.auction = JSON.parse(this.route.snapshot.queryParams.auction);

  }

}
