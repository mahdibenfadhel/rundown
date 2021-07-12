import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../common/services/auction.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trade-blotter',
  templateUrl: './trade-blotter.component.html',
  styleUrls: ['./trade-blotter.component.scss']
})
export class TradeBlotterComponent implements OnInit {
  orders;
  closeResult = '';

  constructor(private auctionService: AuctionService, private router: Router,
              private modalService: NgbModal,
              public dialog: MatDialog
) { }

  ngOnInit(): void {
    this.auctionService.getOrders().subscribe(res => {
      this.orders = res;
  })
  }
  deleteAll(){
    this.auctionService.DeleteAllOrders().subscribe(res => {
      this.orders = res;
    })
    this.orders = [];
  }
  goToAlarms(){
this.router.navigate(['alarm'])
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
