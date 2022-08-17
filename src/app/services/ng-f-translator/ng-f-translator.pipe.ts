import { Pipe, PipeTransform } from '@angular/core';
import { NgFerhadoTranslator } from './ng-f-translator.service';

@Pipe({ name: 'tr', pure: false })

export class NgFerhadoTranslatorPipe implements PipeTransform {
  constructor(private translator: NgFerhadoTranslator) { }
  transform(value: any) {
    if (!value) return;
    return this.translator.get(value);
  }

}