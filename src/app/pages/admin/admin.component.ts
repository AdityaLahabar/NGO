import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
 projectForm: FormGroup;
  isLoading = false;
  formSubmitted = false;
  newProjectId = '';
  
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('^(https?://).+$')]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.required],
      location: ['', Validators.required],
      impactMetric1: ['People Helped'],
      impactValue1: [''],
      impactMetric2: [''],
      impactValue2: [''],
      impactMetric3: [''],
      impactValue3: ['']
    });
  }
  
  get title() { return this.projectForm.get('title'); }
  get shortDescription() { return this.projectForm.get('shortDescription'); }
  get description() { return this.projectForm.get('description'); }
  get imageUrl() { return this.projectForm.get('imageUrl'); }
  get date() { return this.projectForm.get('date'); }
  get category() { return this.projectForm.get('category'); }
  get tags() { return this.projectForm.get('tags'); }
  get location() { return this.projectForm.get('location'); }
  
  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    
    // Process tags from comma-separated string to array
    const tagsArray = this.projectForm.value.tags.split(',').map((tag: string) => tag.trim());
    
    // Build impact metrics array
    const impactArray = [];
    
    if (this.projectForm.value.impactMetric1 && this.projectForm.value.impactValue1) {
      impactArray.push({
        metric: this.projectForm.value.impactMetric1,
        value: this.projectForm.value.impactValue1
      });
    }
    
    if (this.projectForm.value.impactMetric2 && this.projectForm.value.impactValue2) {
      impactArray.push({
        metric: this.projectForm.value.impactMetric2,
        value: this.projectForm.value.impactValue2
      });
    }
    
    if (this.projectForm.value.impactMetric3 && this.projectForm.value.impactValue3) {
      impactArray.push({
        metric: this.projectForm.value.impactMetric3,
        value: this.projectForm.value.impactValue3
      });
    }
    
    const project = {
      title: this.projectForm.value.title,
      shortDescription: this.projectForm.value.shortDescription,
      description: this.projectForm.value.description,
      imageUrl: this.projectForm.value.imageUrl,
      date: this.projectForm.value.date,
      category: this.projectForm.value.category,
      tags: tagsArray,
      location: this.projectForm.value.location,
      impact: impactArray
    };
    
    this.projectService.addProject(project).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.formSubmitted = true;
        this.newProjectId = response.id;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error adding project:', error);
        // Show error message
      }
    });
  }
  
  resetForm() {
    this.projectForm.reset({
      date: new Date().toISOString().split('T')[0]
    });
    this.formSubmitted = false;
  }
  
  viewProject() {
    this.router.navigate(['/our-work', this.newProjectId]);
  }
}
