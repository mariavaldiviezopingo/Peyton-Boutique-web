import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrdenesComponent } from './ordenes.component';

describe('OrdenesComponent', () => {
  let component: OrdenesComponent;
  let fixture: ComponentFixture<OrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenesComponent],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with user name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SHEYLA CÁTEDRA');
  });

  it('should render a table with 10 rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(10);
  });

  it('should render filtros y botones', () => {
    const filtros = fixture.debugElement.queryAll(By.css('button'));
    expect(filtros.length).toBeGreaterThan(0);
  });
});
