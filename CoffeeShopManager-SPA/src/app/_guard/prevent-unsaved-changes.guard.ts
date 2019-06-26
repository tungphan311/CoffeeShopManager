import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { StaffEditComponent } from '../staffs/staff-edit/staff-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<StaffEditComponent> {
    canDeactivate(component: StaffEditComponent){
        if(component.editForm.dirty){
            return confirm('Are you sure you want to continue? Any  unsaved changes will be lost');
        }
        return true;
    }
}