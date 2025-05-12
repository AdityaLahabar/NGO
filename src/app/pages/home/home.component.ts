import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
     CommonModule,
    HeroSectionComponent,
    ProjectCardComponent,
    CarouselComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  recentProjects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.featuredProjects = projects.slice(0, 3);
      this.recentProjects = projects.slice(0, 3);
    });
  }
}
