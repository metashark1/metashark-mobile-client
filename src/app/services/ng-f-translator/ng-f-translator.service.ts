import { Injectable, Inject } from '@angular/core';

declare const require;

@Injectable({
  providedIn: 'root' 
})

export class NgFerhadoTranslator {
  private prefix = 'f-lang';
  private rtlLangs = ["ar", "fa", "ur"];
  private languagesObject;

  private html = document.getElementsByTagName('html')[0];
  public lang;
  public dir;

  constructor(@Inject('config') private config) {
    if (this.config.storagePrefix) this.prefix = `${this.config.storagePrefix}-lang`;
    this.lang = localStorage.getItem(this.prefix) || this.config.defaultLang || 'ru';
    this.setLanguage(this.lang);
  }

  setLanguage(value) {
    this.lang = value;
    localStorage.setItem(this.prefix, value);

    this.languagesObject = require(`./i18n/${value}.json`); //Active this line

    this.dir = this.rtlLangs.indexOf(value) !== -1 ? 'rtl' : 'ltr';
    this.html.setAttribute('dir', this.dir);
    this.html.setAttribute('lang', this.lang);
  }

  get(key) {
    // try { return this.languagesObject[key]; } catch (error) { }
    try { return (this.languagesObject.hasOwnProperty(key)) ? this.languagesObject[key] : key; } catch (error) { }
  }
}