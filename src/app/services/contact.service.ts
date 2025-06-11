import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface ContactFormData {
  nombreCompleto: string;
  correoElectronico: string;
  asunto: string;
  mensaje: string;
  recaptchaToken: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'contact-form';

  sendContactForm(formData: ContactFormData): Observable<ContactFormResponse> {
    return this.http.post<ContactFormResponse>(this.apiUrl, formData);
  }
}
