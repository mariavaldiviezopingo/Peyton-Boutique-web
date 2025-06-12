import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappButtonComponent } from './whatsapp-button.component';

describe('WhatsappButtonComponent', () => {
  let component: WhatsappButtonComponent;
  let fixture: ComponentFixture<WhatsappButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsappButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open WhatsApp with correct URL', () => {
    const spy = spyOn(window, 'open');
    component.phoneNumber = '123456789';
    component.message = 'Test message';

    component.openWhatsApp();

    expect(spy).toHaveBeenCalledWith(
      'https://wa.me/123456789?text=Test%20message',
      '_blank'
    );
  });

  it('should show text when showText is true', () => {
    component.showText = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span')).toBeTruthy();
  });

  it('should hide text when showText is false', () => {
    component.showText = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span')).toBeFalsy();
  });
});
