import {HeaderComponent} from './shared/header/header.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {NgxNavbarModule} from 'ngx-bootstrap-navbar';
import {HomeComponent} from './pages/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {FooterComponent} from './shared/footer/footer.component';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExploreComponent} from './pages/explore/explore.component';
import {ContactComponent} from './pages/contact/contact.component';
import {TradeBlotterComponent} from './pages/trade-blotter/trade-blotter.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CardDetailsComponent } from './pages/home/card-details/card-details.component';
import { OrderComponent } from './pages/home/order/order.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AlarmBlotterComponent} from './pages/alarm-blotter/alarm-blotter.component';
import {AuctionService} from "./common/services/auction.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    TradeBlotterComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    CardDetailsComponent,
    OrderComponent,
    AlarmBlotterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxNavbarModule,
    MatIconModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    CollapseModule.forRoot(),

  ],
  providers: [AuctionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
