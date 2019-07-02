import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { StaffEditComponent } from '../staffs/staff-edit/staff-edit.component';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.isinfochanged) {
            return confirm('Are you sure you want to continue? Any  unsaved changes will be lost');
        }
        return true;
    }
}
