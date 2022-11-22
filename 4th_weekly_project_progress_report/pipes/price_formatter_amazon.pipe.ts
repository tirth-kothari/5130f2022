import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormatterAmazon',
})
export class PriceFormatterAmazon implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log(value,"Here We are")
    return value.replace(/^\D+/g, '');
  }
}