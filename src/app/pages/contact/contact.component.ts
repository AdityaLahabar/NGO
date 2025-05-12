import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ContactForm } from '../../services/contact.service';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeroSectionComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 contactForm: FormGroup;
  isLoading = false;
  formSubmitted = false;
  successMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
  
  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    
    const formData: ContactForm = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message
    };
    
    this.contactService.submitContactForm(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.formSubmitted = true;
        this.successMessage = response.message;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error submitting form:', error);
        // Show error message
      }
    });
  }
  
  resetForm() {
    this.contactForm.reset();
    this.formSubmitted = false;
  }
}
