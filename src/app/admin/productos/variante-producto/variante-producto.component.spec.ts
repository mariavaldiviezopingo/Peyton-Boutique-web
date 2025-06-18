import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianteProductoComponent } from './variante-producto.component';

describe('VarianteProductoComponent', () => {
  let component: VarianteProductoComponent;
  let fixture: ComponentFixture<VarianteProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarianteProductoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VarianteProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
