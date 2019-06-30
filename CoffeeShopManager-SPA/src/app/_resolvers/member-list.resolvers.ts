import { Injectable } from "@angular/core";
import { Member } from '../_models/Member';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MemberService } from '../_service/member.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<Member[]>{
    pageNumber = 1;
    pageSize = 10;
    members : Member[];

    constructor(
        private memberService: MemberService, 
        private router :Router, 
        private alertify: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot) : Observable<Member[]>{
        return this.memberService.getMembers(this.pageNumber, this.pageSize).pipe(
            catchError(error =>{
                this.alertify.error('Lỗi lấy dữ liệu');
                this.router.navigate(['/member']);
                return of(null); 
            })
        )
    }
}
