import { Component, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';

@Directive({
  selector: '[transition-group-item]'
})

export class TransitionGroupItemDirective {
  prevPos: any;
  newPos: any;
  el: HTMLElement;
  moved: boolean;
  moveCallback: any;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }
}

@Component({
  selector: '[transition-group]',
  template: '<ng-content></ng-content>'
})
export class TransitionGroupComponent {
  @Input('transition-group') class;
  @ContentChildren(TransitionGroupItemDirective) items: QueryList<TransitionGroupItemDirective>;
  cols = 0;

  ngAfterContentInit() {
    this.cols = this.items.length;
    this.refreshPosition('prevPos');

    //SUBSCRIBE ON FORM ARRAY ITEM CHANGES / ADD OR REMOVE ITEM 
    this.items.changes.subscribe(items => {
      if (items.length > this.cols) {
        this.cols = (this.cols + 1);
        items.forEach(item => {
          item.prevPos = item.newPos
        });
        this.refreshPosition('newPos');
      } else if (items.length < this.cols) {
        this.cols = (this.cols - 1);
        items.forEach(item => {
          item.prevPos = item.newPos
        });
        this.refreshPosition('newPos');
      } else if (items.length == this.cols) {
        items.forEach(item => {
          item.prevPos = item.newPos || item.prevPos;
        });
        items.forEach(this.runCallback);
        this.refreshPosition('newPos');
        items.forEach(this.applyTranslation);
      }

      // force reflow to put everything in position
      const offSet = document.body.offsetHeight;
      this.items.forEach(this.runTransition.bind(this));
    })

  }

  runCallback(item: TransitionGroupItemDirective) {
    if (item.moveCallback) {
      item.moveCallback();
    }
  }

  runTransition(item: TransitionGroupItemDirective) {
    if (!item.moved) {
      return;
    }
    const cssClass = this.class + '-move';
    let el = item.el;
    let style: any = el.style;
    el.classList.add(cssClass);
    style.transform = style.WebkitTransform = style.transitionDuration = '';
    el.addEventListener('transitionend', item.moveCallback = (e: any) => {
      if (!e || /transform$/.test(e.propertyName)) {
        el.removeEventListener('transitionend', item.moveCallback);
        item.moveCallback = null;
        el.classList.remove(cssClass);
      }
    });
  }

  refreshPosition(prop: string) {
    this.items.forEach(item => {
      item[prop] = {
        top: item.el.offsetTop,
        left: item.el.offsetLeft
      }
    });
  }

  applyTranslation(item: TransitionGroupItemDirective) {
    item.moved = false;
    const dx = item.prevPos?.left - item.newPos.left;
    const dy = item.prevPos?.top - item.newPos.top;
    if (dx || dy) {
      item.moved = true;
      let style: any = item.el.style;
      style.transform = style.WebkitTransform = 'translate(' + dx + 'px,' + dy + 'px)';
      style.transitionDuration = '0s';
    }
  }
}
