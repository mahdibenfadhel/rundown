import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-trade-bottler-admin',
  templateUrl: './trade-bottler-admin.component.html',
  styleUrls: ['./trade-bottler-admin.component.scss']
})
export class TradeBottlerAdminComponent implements OnInit {
  orders = [];
  ddv = [];
  filters = [];
  selectedOption = 'ALL';
  filteredOrders = [];
  closeResult = '';

  constructor(private auctionService: AuctionService, private router: Router,
              private modalService: NgbModal,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.auctionService.getAdminOrders().subscribe(res => {
      res.data.forEach(a => {
        this.ddv.push({ddv: 0, nat: 0})
        if(a.isFromAdmin) {
          this.filters.push(a.auction.currency)
        }
        a.auction.auction_cutoff = new Date(a.auction.auction_cutoff);
        a.auction.rate_end = new Date(Date.UTC(+a.auction.rate_end.split("-")[0], +a.auction.rate_end.split("-")[1], +a.auction.rate_end.split("-")[2]))
        a.auction.rate_start = new Date(Date.UTC(+a.auction.rate_start.split("-")[0], +a.auction.rate_start.split("-")[1], +a.auction.rate_start.split("-")[2]))
        this.orders.push(a)
      })
      this.filters = this.filters.filter(this.onlyUnique)
      this.filteredOrders = this.orders.filter(e => e.isFromAdmin);
    })
  }

  goToAlarms(){
    this.router.navigate(['alarm'])
  }

  filter(option){
    if (option === 'ALL')
    {
      this.filteredOrders = this.orders
    }
    else {
      this.selectedOption = option;
      this.filteredOrders = this.orders.filter(f => f.auction.currency === option)
    }
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  changeNat(index, order){
    const diff = order.auction.rate_end.getTime() - order.auction.rate_start.getTime();
    this.ddv[index].ddv = 0.0001 * this.ddv[index].nat * (diff/(1000*60*60*24))/365
  }
}
