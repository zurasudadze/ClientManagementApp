import {AbstractControl} from '@angular/forms';

export function CustomUniqueNumberValidator(accountNums: number[]){
  return (control: AbstractControl) => {
  if (control.value) {
    console.log(control.value)
    if(accountNums.includes(control.value)){
      return {nonUniqueNumber: true}
    }
    return null
  } else {
    return null;
  }
}}
