import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillsComponent } from './CreateBill/bills/bills.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PaymentsComponent } from './payments/payments.component';
import { MembersComponent } from './members/members.component';
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

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'bill', component: BillsComponent },
            { path: 'staff', component: StaffListComponent,
                resolve :{staffs :StaffListResolver}},
            { path: 'staff/:id', component: StaffDetailComponent, 
                resolve :{staff:StaffDetailResolver}},
            { path: 'staff/edit/:id', component: StaffEditComponent,
                resolve :{staff:StaffEditResolver}, canDeactivate:[PreventUnsavedChanges]},
            { path: 'staff/create/',component: StaffCreateComponent},
            { path: 'receipt', component: ReceiptsComponent },
            { path: 'payment', component: PaymentsComponent },
            { path: 'member', component: MembersComponent },
            { path: 'product_report', component: Product_reportComponent},
            { path: 'revenue_report', component: Revenue_reportComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
