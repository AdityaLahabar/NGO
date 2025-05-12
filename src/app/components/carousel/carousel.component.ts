import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  @Input() items: Project[] = [];
  currentIndex = 0;
  
  ngOnInit() {
    // Auto-scroll the carousel
    setInterval(() => {
      this.next();
    }, 5000);
  }
  
  prev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
  }
  
  next() {
    this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
  }
  
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
