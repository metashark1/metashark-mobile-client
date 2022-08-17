import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'search'
})
export class FilteringPipe implements PipeTransform {
  public transform(value, keys:string = "", term:string = "", parameter:string ="", type:string = "") {
    if (!term) return value;
    if(type)
      term=this.prepare(term,type,parameter);
    switch(parameter){
      case ">":
        return this.gte(value,keys,term);
      case "<":
        return this.lte(value,keys,term);
      default:
        return this.like(value,keys,term);
    }
  }

  public prepare(term,type,parameter){
    switch(type){
      case "date":
        return term.year+"-"+(term.month<9?("0"+term.month):term.month)+"-"+(term.day<9?("0"+term.day):term.day)+(parameter=="<"?"T23:59:59":"");
    }
    return term;
  }

  public gte(value, keys: string, term: string) {
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && item[key]>=term));
  }

  public lte(value, keys: string, term: string) {
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && item[key]<=term));
  }

  public like(value, keys: string, term: string) {
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term.trim(), 'gi').test(item[key])));
  }
}