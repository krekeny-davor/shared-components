import { addons } from '@storybook/addon-essentials';
import BaseComponent from './base-component.js';

class TagCloud extends BaseComponent {
  static rootSelector = '.tag-cloud';

  constructor(root, options) {
    super(root, options);

    this.container = root.querySelector('.tag-cloud__container');
    this.itemsContainer = root.querySelector('.tag-cloud__items');

    for (let i = this.itemsContainer.children.length - 1; i >= 0; i--) {
      this.itemsContainer.appendChild(this.itemsContainer.children[Math.random() * i | 0]);
    }

    this.items = this.container?.querySelectorAll('.tag-cloud__item');
    this.textElements = this.container?.querySelectorAll('a');
    this.tagList = [];


    this.init();
  }

  init () {
    this.weightingElement();
    this.positionElements();
    this.setVariables();

  }

  setVariables() {
    let delay = 0;

    for (let i = 0; i < this.tagList.length; i++) {
      delay = Math.random()*500;
      this.items[i].style.setProperty('--item-animation-delay', this.tagList[i].weighting * delay + 'ms');
    }
  }

  getRowLength () {
    let containerOffset = this.container.offsetWidth;
    let totalOffsetWidth = 0;
    for (let i = 0; i < this.items.length; i++) {
      // unweigthed total OffsetWidth
      //totalOffsetWidth += this.tagList[i].offsetWidth;
      // weighted total OffsetWidth
      totalOffsetWidth += this.tagList[i].offsetWidth * Math.ceil(this.tagList[i].weighting);
    }
    console.log(Math.ceil(totalOffsetWidth/containerOffset));
    return Math.ceil(totalOffsetWidth/containerOffset);
  }


  positionElements () {
    let columnStart = 1;
    let columnEnd = 2;
    let rowStart = 1;
    let rowEnd = 2;

    let rowLength = this.getRowLength();
    let colLength = Math.ceil(this.container.offsetWidth/100);

    for (let i = 0; i < this.items.length; i++) {
      const current = this.tagList[i];
      const weight = Math.ceil(current.weighting);

      rowEnd = rowStart + 1;
      columnEnd = columnStart + weight;

      if (rowStart === 1 && columnStart === 1) {
        columnStart = 2;
        columnEnd = columnStart + weight;
      }

      if (rowStart === 1 && columnEnd >= rowLength - 1) {
        rowStart += 1;
        columnStart = 1;
        columnEnd = columnStart + weight;
      }

      if (columnEnd > rowLength) {
        rowStart += 1;
        columnStart = 1;
        columnEnd = columnStart + weight;
      }

      if (rowStart >= colLength && columnStart == 1 ) {
        columnStart += 1;
        columnEnd = columnStart + weight;
      }

      if (rowStart >= colLength && columnEnd >= rowLength) {
        rowStart += 1;
        columnStart -= 1 + weight;
        columnEnd = columnStart + weight;
      }

      this.items[i].style = `grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd};`;

      columnStart += weight;

    }
  }


  weightingElement() {
    let avgOffsetWidth = 0;

    for (let j = 0; j < this.textElements.length; j++) {
      avgOffsetWidth += this.textElements[j].offsetWidth / this.textElements.length;
    }

    for (let i = 0; i < this.textElements.length; i++) {
      let tag = {};
      tag.offsetWidth = this.textElements[i].offsetWidth;
      tag.weighting = this.textElements[i].offsetWidth / avgOffsetWidth;
      this.tagList.push(tag);
    }
  }
}

export default TagCloud;
