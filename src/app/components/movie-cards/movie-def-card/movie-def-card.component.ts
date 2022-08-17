import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-def-card',
  templateUrl: './movie-def-card.component.html',
  styleUrls: ['./movie-def-card.component.scss'],
})
export class MovieDefCardComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {}

}
