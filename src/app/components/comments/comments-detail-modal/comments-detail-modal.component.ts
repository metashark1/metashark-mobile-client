import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comments-detail-modal',
  templateUrl: './comments-detail-modal.component.html',
  styleUrls: ['./comments-detail-modal.component.scss'],
})
export class CommentsDetailModalComponent implements OnInit {
  @Input() item;

  constructor(
    public ModalController: ModalController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.ModalController.dismiss(false);
  }

}
