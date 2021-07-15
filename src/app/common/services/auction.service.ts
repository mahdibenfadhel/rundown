
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
  CreateOrder(auctionId, order): Observable<any> {
    return this.apiService.post('order/'+ auctionId, order);
  }
  DeleteAllOrders(): Observable<any> {
    return this.apiService.delete('order/allOrderFromUser');
  }
  DeleteAllAlarms(): Observable<any> {
    return this.apiService.delete('alarm');
  }
}
