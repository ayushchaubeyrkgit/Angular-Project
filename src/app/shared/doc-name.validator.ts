import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dob = control.get('docDob').value;
    return (dob) ? {'wrongDob': true} : null;
}