import { Pipe, PipeTransform ,Inject} from '@angular/core';


@Pipe({name: 'replaceUnderscore'})
export class ReplaceUnderscorePipe implements PipeTransform {
  transform(value: string,args?: any): string {
    return value? value.replace(/_/g, " ") : value;
  }
}