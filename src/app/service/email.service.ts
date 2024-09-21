import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
  private readonly EMAIL_KEY = 'user_email';

  setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }


}
