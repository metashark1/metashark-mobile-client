import { Injectable } from "@angular/core";
import { NgFerhadoTranslatorPipe } from "src/app/services/ng-f-translator/ng-f-translator.pipe";

@Injectable({
  providedIn: "root",
})
export class DateTimeService {
  date: Date;
  monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  today = new Date();

  constructor(public tr: NgFerhadoTranslatorPipe) {}

  getDateFrom(): any {
    var dateFrom = [];
    for (var i = 0; i < 12; i++) {
      this.date = new Date(this.today.getTime() + 24 * i * 60 * 60 * 1000);
      if (i == 0) var n: string = this.tr.transform("today");
      else if (i == 1) var n: string = this.tr.transform("tomorow");
      else
        var n =
          this.date.getDate() + " " + this.monthNames[this.date.getMonth()];
      var m = this.date.toISOString().slice(0, -14);
      dateFrom.push([n, m]);
    }
    return dateFrom;
  }

  getTimeFrom(): any {
    var timeFrom = [];
    for (var i = 0; i <= 48; i++) {
      if (i % 2 == 0) {
        var k = i / 2 < 10 ? "0" + i / 2 + ":00" : i / 2 + ":00";
      } else {
        var k =
          (i + 1) / 2 - 1 < 10
            ? "0" + ((i + 1) / 2 - 1) + ":30"
            : (i + 1) / 2 - 1 + ":30";
      }
      timeFrom.push(k);
    }
    return timeFrom;
  }
}
