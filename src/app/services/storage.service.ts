import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    console.log("get LS by key: " + key);
    return localStorage.getItem(key);
  }

  getAsObject(key: string) {
    console.log("getAsObject LS by key: " + key);
    return JSON.parse(localStorage.getItem(key));
  }

  clear() {
    localStorage.clear();
  }
}
