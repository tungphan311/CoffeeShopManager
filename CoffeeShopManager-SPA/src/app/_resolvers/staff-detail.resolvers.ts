import { Injectable } from "@angular/core";
import { Staff } from '../_models/Staff';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StaffService } from '../_service/staff.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StaffEditResolver implements Resolve<Staff>{
    constructor(
        private staffService: StaffService, 
        private router :Router, 
        private alertify: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot) : Observable<Staff>{
        return this.staffService.getStaff(route.params['id']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/staff/edit']);
                return of(null); 
            })
        )
    }
}
