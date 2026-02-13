import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-contact.component.html',
  styleUrls: ['./app-contact.component.scss']
})
export class ContactComponent {
  
  contactForm: FormGroup;
  isLoading = false;
  messageStatus: 'idle' | 'success' | 'error' = 'idle';

  // Credenciais EmailJS
  private readonly EMAIL_SERVICE_ID = 'service_y5dzazw';
  private readonly EMAIL_TEMPLATE_ID = 'template_9orpo0r';
  private readonly EMAIL_PUBLIC_KEY = 'aXYQc2l_-jWTloZFY';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.messageStatus = 'idle';

      try {
        const response = await emailjs.send(
          this.EMAIL_SERVICE_ID,
          this.EMAIL_TEMPLATE_ID,
          {
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            subject: this.contactForm.value.subject,
            message: this.contactForm.value.message,
          },
          this.EMAIL_PUBLIC_KEY
        );

        console.log('✅ Email enviado com sucesso!', response);
        this.messageStatus = 'success';
        this.contactForm.reset();

      } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
        this.messageStatus = 'error';
      } finally {
        this.isLoading = false;
        
        // Reset do status após 5 segundos
        setTimeout(() => {
          this.messageStatus = 'idle';
        }, 5000);
      }
    }
  }
}
