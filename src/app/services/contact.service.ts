import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}

  submitContactForm(formData: ContactForm): Observable<{success: boolean, message: string}> {
    // Mock API response with delay
    return of({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    }).pipe(delay(1000));
  }
}