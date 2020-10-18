import {AfterViewInit, Component, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Box} from './interfaces/box';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@HostListener('document:keydown', ['$event'])

export class AppComponent implements AfterViewInit{
  title = 'box-in-the-box';
  box = {
    height: 50,
    width: 50
  };

  boxes: Box[] = [];
  boxColors: string[] = [];

  constructor() {
  }

  ngAfterViewInit() {
  }

  createUniqueBox(event: Event) {
    let boxId = 1;
    if (this.boxes && this.boxes.length) {
      boxId = this.boxes.map(b => b.boxId).sort((a, b) => (a - b))[this.boxes.length - 1] + 1;
    }
    this.boxes.push({
      boxId,
      left: this.generateRandomLeft(),
      top: this.generateRandomTop(),
      backgroundColor: this.getBoxColor()
    });
  }

  generateRandomLeft() {
    return this.generateRandomNumber(0, (window.innerWidth - 180));
  }

  generateRandomTop() {
    return this.generateRandomNumber(0, (window.innerHeight - 180));
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getBoxColor() {
    const letters = "0123456789ABCDEF";
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 16))];
    }
    if (this.boxColors.includes(color)) {
      this.getBoxColor();
    }
    return color;
  }

  moveBox(box: Box, event: any) {
    if(box) {
      if (event.key.toLowerCase() === 's') {
        if (box.top < (window.innerHeight - 180)) {
          box.top++;
        }
      } else if (event.key.toLowerCase() === 'w') {
        if (box.top > 0) {
          box.top--;
        }
      } else if (event.key.toLowerCase() === 'a') {
        if (box.left > 0) {
          box.left--;
        }
      } else if (event.key.toLowerCase() === 'd') {
        if (box.left < (window.innerWidth - 180)) {
          box.left++;
        }
      } else if (event.key.toLowerCase() === 'delete') {
        this.boxes = this.boxes.filter(b => (b.boxId !== box.boxId));
      }
    }
  }
}
