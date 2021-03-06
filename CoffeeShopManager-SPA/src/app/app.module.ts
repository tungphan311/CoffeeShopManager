import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_service/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptorProvider } from './_service/error.interceptor';
import { AlertifyService } from './_service/alertify.service';
import { BillsComponent } from './CreateBill/bills/bills.component';
import { ProductComponent } from './CreateBill/product/product.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PaymentsComponent } from './payments/payments.component';
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
import { ProductDetailComponent } from './CreateBill/product-detail/product-detail.component';
import { StaffListResolver } from './_resolvers/staff-list.resolvers';
import { StaffEditComponent } from './staffs/staff-edit/staff-edit.component';
import { StaffEditResolver } from './_resolvers/staff-detail.resolvers';
import { StaffDetailResolver } from './_resolvers/staff-edit.resolvers';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { StaffCreateComponent } from './staffs/staff-create/staff-create.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CartComponent } from './CreateBill/cart/cart.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { InvoiceComponent } from './CreateBill/invoice/invoice.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { MatNativeDateModule, MatIconModule, MAT_DATE_LOCALE } from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { PhotoEditorComponent } from './staffs/photo-editor/photo-editor.component';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatSliderModule } from '@angular/material/slider';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolvers';
import { MemberEditResolver } from './_resolvers/member-edit.resolvers';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { BillService } from './_service/Bills/bill.service';
import { ProductDetailService } from './_service/ProductDetails/product-detail.service';
import { ProductTypeService } from './_service/ProductTypes/product-type.service';
import { MemberService } from './_service/member.service';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MemberEditComponent,
      MemberDetailComponent,
      MemberCardComponent,
      MemberCreateComponent,
      ListsComponent,
      LoginComponent,
      BillsComponent,
      StaffListComponent,
      StaffDetailComponent,
      StaffCardComponent,
      StaffEditComponent,
      StaffCreateComponent,
      PhotoEditorComponent,
      ReceiptsComponent,
      PaymentsComponent,
      Product_reportComponent,
      Revenue_reportComponent,
      ProductComponent,
      ProductDetailComponent,
      CartComponent,
      InvoiceComponent
   ],
   imports: [
      TabsModule.forRoot(),
      PaginationModule.forRoot(),
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      FileUploadModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line:object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      BrowserAnimationsModule,
      ModalModule.forRoot(),
      TypeaheadModule.forRoot(),
      PDFExportModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatOptionModule, MatSelectModule, MatIconModule, GridModule, MatSliderModule
   ],
   providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
      PreventUnsavedChanges,
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      StaffService,
      ProductService,
      MemberListResolver,
      MemberEditResolver,
      MemberDetailResolver,
      StaffDetailResolver,
      StaffListResolver,
      StaffEditResolver,
      BillService,
      ProductDetailService,
      ProductTypeService,
      MemberService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
