import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environment/environment';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private widgetId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isReady(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      typeof grecaptcha !== 'undefined' &&
      grecaptcha?.render
    );
  }

  private waitForRecaptcha(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve(false);
        return;
      }

      let attempts = 0;
      const check = () => {
        if (this.isReady()) {
          resolve(true);
        } else if (++attempts >= 50) {
          resolve(false);
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  async renderRecaptcha(
    element: HTMLElement,
    callback?: (response: string) => void
  ): Promise<number | null> {
    const loaded = await this.waitForRecaptcha();
    if (!loaded) return null;

    try {
      this.widgetId = grecaptcha.render(element, {
        sitekey: environment.recaptchaSiteKey,
        callback: callback,
        'expired-callback': () => callback?.(''),
        'error-callback': () => callback?.(''),
      });
      return this.widgetId;
    } catch (error) {
      console.error('Error al renderizar reCAPTCHA:', error);
      return null;
    }
  }

  getRecaptchaResponse(widgetId?: number): string | null {
    if (!this.isReady()) return null;

    try {
      const id = widgetId ?? this.widgetId;
      return id !== null
        ? grecaptcha.getResponse(id)
        : grecaptcha.getResponse();
    } catch {
      return null;
    }
  }

  resetRecaptcha(widgetId?: number): void {
    if (!this.isReady()) return;

    try {
      const id = widgetId ?? this.widgetId;
      id !== null ? grecaptcha.reset(id) : grecaptcha.reset();
    } catch (error) {
      console.error('Error al resetear reCAPTCHA:', error);
    }
  }
}
