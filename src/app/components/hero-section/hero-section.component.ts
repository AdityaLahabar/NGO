import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
 @Input() backgroundImage: string = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg';
  @Input() title: string = 'Making a <span>Difference</span><br>In Our World';
  @Input() subtitle: string = 'Empowering communities through sustainable solutions and compassionate action.';
  @Input() primaryButtonText: string = 'Our Work';
  @Input() primaryButtonLink: string = '/our-work';
  @Input() secondaryButtonText: string = 'Get Involved';
  @Input() secondaryButtonLink: string = '/contact';
}
