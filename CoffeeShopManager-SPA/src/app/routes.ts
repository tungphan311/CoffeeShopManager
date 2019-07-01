import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillsComponent } from './CreateBill/bills/bills.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PaymentsComponent } from './payments/payments.component';
import { AuthGuard } from './_guard/auth.guard';
import { Product_reportComponent } from './product_report/product_report.component';
import { Revenue_reportComponent } from './revenue_report/revenue_report.component';
import { ProductDetailComponent } from './CreateBill/product-detail/product-detail.component';
import { StaffListComponent } from './staffs/staff-list/staff-list.component';
import { StaffDetailComponent } from './staffs/staff-detail/staff-detail.component';
import { StaffListResolver } from './_resolvers/staff-list.resolvers';
import { StaffEditComponent } from './staffs/staff-edit/staff-edit.component';
import { StaffDetailResolver } from './_resolvers/staff-edit.resolvers';
import { StaffEditResolver } from './_resolvers/staff-detail.resolvers';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { StaffCreateComponent } from './staffs/staff-create/staff-create.component';
import { CartComponent } from './CreateBill/cart/cart.component';
import { InvoiceComponent } from './CreateBill/invoice/invoice.component';
import { PhotoEditorComponent } from './staffs/photo-editor/photo-editor.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolvers';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolvers';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'bill', component: BillsComponent },
            { path: 'bill/invoice', component: InvoiceComponent },
            { path: 'staff', component: StaffListComponent,
                resolve : { staffs: StaffListResolver }},
            { path: 'staff/:id', component: StaffDetailComponent,
                resolve : { staff: StaffDetailResolver }},
            { path: 'staff/edit/:id', component: StaffEditComponent,
                resolve : { staff: StaffEditResolver }, canDeactivate: [PreventUnsavedChanges]},
            { path: 'staff/edit/photo:id', component: PhotoEditorComponent},
            { path: 'create', component: StaffCreateComponent},
            { path: 'receipt', component: ReceiptsComponent },
            { path: 'payment', component: PaymentsComponent },
            { path: 'member', component: MemberListComponent,
                resolve : { members: MemberListResolver}},
            { path: 'member/:id', component: MemberDetailComponent,
                resolve : { member: MemberDetailResolver }},
            { path: 'member/edit/:id', component: MemberEditComponent,
                resolve : { member: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]},
            { path: 'add', component: MemberCreateComponent,
                resolve : { members: MemberListResolver}},
            { path: 'product_report', component: Product_reportComponent},
            { path: 'revenue_report', component: Revenue_reportComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
