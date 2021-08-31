import {AbstractControl} from '@angular/forms';

export function CustomLanguageValidator(control: AbstractControl) {
  if (control.value) {
    const hasLatinLetters = /[a-zA-Z]/.test(control.value);
    const hasGeorgianLetters = /[ა-ჰ]/.test(control.value);

    if (hasLatinLetters && hasGeorgianLetters) {
      return {twoLanguageNotAllowed: true}
    }
    return null
  } else {
    return null;
  }
}
