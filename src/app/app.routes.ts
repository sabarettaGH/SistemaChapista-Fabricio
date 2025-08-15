import { Routes } from '@angular/router';
import { CargaPresupuestoComponent } from './carga-presupuesto/carga-presupuesto.component';

export const routes: Routes = [
     { path: 'carga-presupuesto', component: CargaPresupuestoComponent },
  { path: '', redirectTo: 'carga-presupuesto', pathMatch: 'full' },
  { path: '**', redirectTo: 'carga-presupuesto' }
];
