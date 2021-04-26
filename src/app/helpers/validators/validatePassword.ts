import { FormGroup } from "@angular/forms";

export function ValidatePassowrds(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'must match with password': true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}