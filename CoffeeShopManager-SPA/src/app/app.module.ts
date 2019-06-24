import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_service/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MerberListComponent } from './merber-list/merber-list.component';
import { ListsComponent } from './lists/lists.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptorProvider } from './_service/error.interceptor';
import { AlertifyService } from './_service/alertify.service';
import { BillsComponent } from './CreateBill/bills/bills.component';
import { ProductComponent } from './CreateBill/product/product.component';
import { StaffsComponent } from './staffs/staffs.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PaymentsComponent } from './payments/payments.component';
import { MembersComponent } from './members/members.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guard/auth.guard';
import { Product_reportComponent } from './product_report/product_report.component';
import { Revenue_reportComponent } from './revenue_report/revenue_report.component';
import { UserService } from './_service/user.service';
import { StaffService } from './_service/staff.service';
import { StaffListComponent } from './staffs/staff-list/staff-list.component';
import { StaffCardComponent } from './staffs/staff-card/staff-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './_service/Products/product.service';
import { StaffDetailComponent } from './staffs/staff-detail/staff-detail.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MerberListComponent,
      ListsComponent,
      LoginComponent,
      BillsComponent,
      StaffListComponent,
      StaffDetailComponent,
      StaffCardComponent,
      ReceiptsComponent,
      PaymentsComponent,
      MembersComponent,
      Product_reportComponent,
      Revenue_reportComponent,
      ProductComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line:object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      BrowserAnimationsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      StaffService,
      ProductService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
