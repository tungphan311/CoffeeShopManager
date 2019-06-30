import { Injectable } from "@angular/core";
import { Member } from '../_models/Member';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MemberService } from '../_service/member.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<Member>{
    staff : Member;
    constructor(
        private memberService: MemberService, 
        private router :Router, 
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Member>{
        return this.memberService.getMember(route.params['id']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/member']);
                return of(null); 
            })
        )
    }
}
