import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Mock data for projects
  private projectsData: Project[] = [
    {
      id: '1',
      title: 'Clean Water Initiative',
      shortDescription: 'Providing access to clean water in rural communities',
      description: 'Our Clean Water Initiative aims to provide sustainable access to clean and safe drinking water for rural communities. Through the installation of water purification systems and education on water conservation, we have helped over 10,000 people gain access to clean water. This initiative not only addresses immediate water needs but also establishes long-term infrastructure and knowledge for communities to maintain their water sources.',
      imageUrl: 'https://images.pexels.com/photos/2962606/pexels-photo-2962606.jpeg',
      date: '2023-05-15',
      category: 'Water & Sanitation',
      tags: ['water', 'rural development', 'health'],
      impact: [
        { metric: 'People Helped', value: '10,000+' },
        { metric: 'Systems Installed', value: '25' },
        { metric: 'Villages Covered', value: '12' }
      ],
      location: 'East Africa'
    },
    {
      id: '2',
      title: 'Education For All',
      shortDescription: 'Building schools and providing quality education',
      description: 'Education For All focuses on building schools and providing quality education resources in underserved communities. We have constructed 15 schools, trained over 100 teachers, and provided educational materials to thousands of students. Our holistic approach ensures that children not only have access to education but also receive quality instruction and resources that prepare them for future success.',
      imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
      date: '2023-08-22',
      category: 'Education',
      tags: ['education', 'children', 'community development'],
      impact: [
        { metric: 'Schools Built', value: '15' },
        { metric: 'Teachers Trained', value: '100+' },
        { metric: 'Students Reached', value: '5,000+' }
      ],
      location: 'South Asia'
    },
    {
      id: '3',
      title: 'Sustainable Farming',
      shortDescription: 'Teaching sustainable agricultural practices',
      description: 'Our Sustainable Farming program teaches eco-friendly agricultural practices to farmers in developing regions. Through hands-on training, resource provision, and ongoing support, we help farmers increase their yields while preserving the environment. This initiative has led to improved food security, increased incomes, and more sustainable land use practices across multiple communities.',
      imageUrl: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg',
      date: '2023-03-10',
      category: 'Agriculture',
      tags: ['farming', 'sustainability', 'food security'],
      impact: [
        { metric: 'Farmers Trained', value: '750' },
        { metric: 'Yield Increase', value: '40%' },
        { metric: 'Acres Improved', value: '3,200' }
      ],
      location: 'Southeast Asia'
    },
    {
      id: '4',
      title: 'Healthcare Access',
      shortDescription: 'Mobile clinics providing essential healthcare',
      description: 'Healthcare Access brings essential medical services to remote communities through mobile clinics and telehealth solutions. Our team of medical professionals provides preventive care, treatment for common illnesses, and health education. This program has significantly improved health outcomes in underserved areas by making quality healthcare more accessible and affordable.',
      imageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      date: '2023-11-05',
      category: 'Healthcare',
      tags: ['health', 'medical', 'community care'],
      impact: [
        { metric: 'Patients Treated', value: '15,000+' },
        { metric: 'Mobile Clinics', value: '8' },
        { metric: 'Communities Served', value: '32' }
      ],
      location: 'Central America'
    }
  ];

  private projects = new BehaviorSubject<Project[]>(this.projectsData);

  constructor() {}

  getProjects(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projectsData.find(p => p.id === id);
    return of(project);
  }

  getProjectCategories(): string[] {
    return [...new Set(this.projectsData.map(project => project.category))];
  }

  addProject(project: Omit<Project, 'id'>): Observable<Project> {
    const newId = (this.projectsData.length + 1).toString();
    const newProject = {
      ...project,
      id: newId
    };
    
    this.projectsData.push(newProject);
    this.projects.next(this.projectsData);
    
    return of(newProject);
  }
}