import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { CardDetailsComponent } from './pages/home/card-details/card-details.component';
import {OrderComponent} from './pages/home/order/order.component';
import {ExploreComponent} from './pages/explore/explore.component';
import {TradeBlotterComponent} from './pages/trade-blotter/trade-blotter.component';
import {AlarmBlotterComponent} from './pages/alarm-blotter/alarm-blotter.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details', component: CardDetailsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'trade', component: TradeBlotterComponent },
  { path: 'alarm', component: AlarmBlotterComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
