import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillsComponent } from './CreateBill/bills/bills.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PaymentsComponent } from './payments/payments.component';
import { MembersComponent } from './members/members.component';
import { StaffsComponent } from './staffs/staffs.component';
import { AuthGuard } from './_guard/auth.guard';
import { Product_reportComponent } from './product_report/product_report.component';
import { Revenue_reportComponent } from './revenue_report/revenue_report.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'bill', component: BillsComponent },
            { path: 'staff', component: StaffsComponent },
            { path: 'receipt', component: ReceiptsComponent },
            { path: 'payment', component: PaymentsComponent },
            { path: 'member', component: MembersComponent },
            { path: 'product_report', component: Product_reportComponent},
            { path: 'revenue_report', component: Revenue_reportComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
