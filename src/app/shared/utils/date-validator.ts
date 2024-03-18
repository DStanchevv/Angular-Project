import { ValidatorFn } from "@angular/forms";

export function dateValidator(): ValidatorFn {
    const regExp = new RegExp('[0-9]{1,2}[\/\.][0-9]{1,2}[\/\.][0-9]{4}$')
    return (control) => {
        const isDateInvalid = control.value === "" || regExp.test(control.value);
        return isDateInvalid ? null : { dateValidator: true };
    }
}