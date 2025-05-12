import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,ProjectCardComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  featuredProjects: Project[] = [];
  recentProjects: Project[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectService.getProjectById(id).subscribe(project => {
          this.project = project;
        });
      }
    });
     this.projectService.getProjects().subscribe(projects => {
      this.featuredProjects = projects.slice(0, 4);
      this.recentProjects = projects.slice(0, 4);
    });
  }
}
