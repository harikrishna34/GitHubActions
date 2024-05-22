import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insertSpace'
})
export class InsertSpacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Regex to match capital letters preceded by non-capital letters
    const regex = /(?<!\p{Lu})(?=\p{Lu})/u;
    return value.replace(regex, ' ');
  }


}
