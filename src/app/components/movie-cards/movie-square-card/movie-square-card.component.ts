import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-square-card',
  templateUrl: './movie-square-card.component.html',
  styleUrls: ['./movie-square-card.component.scss'],
})
export class MovieSquareCardComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {}

}
