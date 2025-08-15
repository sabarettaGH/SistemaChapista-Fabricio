import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaPresupuestoComponent } from './carga-presupuesto.component';

describe('CargaPresupuestoComponent', () => {
  let component: CargaPresupuestoComponent;
  let fixture: ComponentFixture<CargaPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaPresupuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
