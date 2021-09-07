
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(private apiService: ApiService) {
  }

  getAuctions(): Observable<any> {
    return this.apiService.get('auction');
  }
  getOrders(): Observable<any> {
    return this.apiService.get('order');
  }
  getAdminOrders(): Observable<any> {
    return this.apiService.get('order/allOrders');
  }
    CreateOrder(auctionId, order): Observable<any> {
    return this.apiService.post('order/'+ auctionId, order);
  }
  DeleteAllOrders(alarm?): Observable<any> {
    if (alarm) {
      return this.apiService.delete('order/allOrderFromUser');
    }
  else {
      return this.apiService.delete('order/allAlarmFromUser');
    }
  }
  DeleteAllAlarms(): Observable<any> {
    return this.apiService.delete('alarm');
  }
  deleteAuctionById(id): Observable<any> {
    return this.apiService.delete('order/' + id);
  }
}
