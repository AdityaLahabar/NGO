import { Routes } from '@angular/router';

export const routes: Routes = [
     {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Hope Horizon - Creating a Better Tomorrow'
  },
  {
    path: 'our-work',
    loadComponent: () => import('./pages/our-work/our-work.component').then(m => m.OurWorkComponent),
    title: 'Our Work - Hope Horizon'
  },
  {
    path: 'our-work/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'Project Detail - Hope Horizon'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us - Hope Horizon'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    title: 'Admin - Hope Horizon'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
