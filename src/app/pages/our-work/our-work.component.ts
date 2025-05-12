import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-our-work',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, HeroSectionComponent, FormsModule],
  templateUrl: './our-work.component.html',
  styleUrl: './our-work.component.css'
})
export class OurWorkComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.allProjects = projects;
      this.filteredProjects = [...projects];
    });
    
    this.categories = this.projectService.getProjectCategories();
  }
  
  applyFilters() {
    this.filteredProjects = this.allProjects.filter(project => {
      // Category filter
      const categoryMatch = this.selectedCategory === 'all' || project.category === this.selectedCategory;
      
      // Search filter
      const searchLower = this.searchTerm.toLowerCase();
      const searchMatch = !this.searchTerm || 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower) || 
        project.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return categoryMatch && searchMatch;
    });
  }
}