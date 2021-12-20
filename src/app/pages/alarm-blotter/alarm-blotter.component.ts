import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alarm-blotter',
  templateUrl: './alarm-blotter.component.html',
  styleUrls: ['./alarm-blotter.component.scss']
})
export class AlarmBlotterComponent implements OnInit {
  orders = [];
  filters = [];
  closeResult = '';
  selectedOption = 'ALL';
  filteredOrders = [];
  constructor(private auctionService: AuctionService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orders = [];
    this.closeResult = '';
    this.selectedOption = 'ALL';
    this.filteredOrders = [];
    this.auctionService.getOrders().subscribe(res => {
      res.data.forEach(a => {
        a.auction.auction_cutoff = new Date(a.auction.auction_cutoff)
        if(a.hasAlarm) {
          this.filters.push(a?.auction.currency)
          this.orders.push(a)
        }
      })
      this.filters = this.filters.filter(this.onlyUnique)
      this.filteredOrders = this.orders.filter(e => e.hasAlarm);
    })

  }
  deleteAll(){
    this.auctionService.DeleteAllOrders(true).subscribe();
    this.orders = [];
    this.filteredOrders = [];
  }
  goToOrders(){
    this.router.navigate(['trade'])

  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openOne(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonOne(reason, id)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.deleteAll()
    }
  }
  private getDismissReasonOne(reason: any, id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.deleteOrder(id)
    }
  }
  filter(option){
    if (option === 'ALL')
    {
      this.filteredOrders = this.orders
      this.selectedOption = option;
    }
    else {
      console.log(this.orders, this.filteredOrders)
      this.selectedOption = option;
      this.filteredOrders = this.orders.filter(f => f.auction.currency === option && f.hasAlarm)
    }
  }
  deleteOrder(id){
    this.auctionService.deleteAuctionById(id).subscribe( res => {
      this.ngOnInit()
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
