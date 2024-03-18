import { ValidatorFn } from "@angular/forms";

const domains = ['com'];

export function emailValidator(): ValidatorFn {
    const domainString = domains.join('|');
    const regExp = new RegExp(`[A-Za-z0-9]+@gmail.(${domainString})`)
    return (control) => {
        const isEmailInvalid = control.value === "" || regExp.test(control.value);
        return isEmailInvalid ? null : { emailValidator: true };
    }
}