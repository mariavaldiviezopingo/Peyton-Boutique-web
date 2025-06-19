import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface SessionTokenRequest {
  transactionId: string;
  orderNumber: string;
  amount: string;
  currency: string;
  customerEmail: string;
}

export interface SessionTokenResponse {
  success: boolean;
  token?: string;
  keyRSA?: string;
  merchantCode?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IzipayService {
  private apiUrl = environment.apiUrl + '/izipay';
  http = inject(HttpClient);

  generateSessionToken(
    request: SessionTokenRequest
  ): Observable<SessionTokenResponse> {
    return this.http.post<SessionTokenResponse>(
      `${this.apiUrl}/session-token`,
      request
    );
  }
}
