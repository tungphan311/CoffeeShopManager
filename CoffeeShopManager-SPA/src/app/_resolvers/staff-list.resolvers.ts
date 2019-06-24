import { Injectable } from "@angular/core";
import { Staff } from '../_models/Staff';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StaffService } from '../_service/staff.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StaffListResolver implements Resolve<Staff[]>{
    constructor(
        private staffService: StaffService, 
        private router :Router, 
        private alertify: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot) : Observable<Staff[]>{
        return this.staffService.getStaffs().pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/staff']);
                return of(null); 
            })
        )
    }
}
