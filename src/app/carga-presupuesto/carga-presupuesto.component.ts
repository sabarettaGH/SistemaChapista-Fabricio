import { Component } from '@angular/core';
import { Chapista } from '../interfaces/carga-presupuesto.interface';
import { FormsModule } from '@angular/forms';
import generateChapistaPDF from '../lib/pdf';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-carga-presupuesto',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './carga-presupuesto.component.html',
  styleUrl: './carga-presupuesto.component.css',
})
export class CargaPresupuestoComponent {
  public datosPresupuesto: Chapista = {
    fecha: new Date(),
    'señor/es': '',
    localidad: '',
    marcaVehiculo: '',
    modelo: '',
    chapaPatente: '',
    detalle: [],
    numeroPresupuesto: null,
    observaciones: '',
    importeNeto: 0,
    ivaPorcentaje: 21,
    ivaDiscrimado: 0,
    importeTotal: 0,
    domicilio: '',
    numeroSiniestro: null,
    telefono: '',
    correoElectronico: '',
  };

  constructor() {}

  private settearValores(ivaDiscrimado: number, importeTotal: number) {
    this.datosPresupuesto.ivaDiscrimado = ivaDiscrimado;
    this.datosPresupuesto.importeTotal = importeTotal;
  }
  calcularIva(): void {
    let ivaDiscriminado =
      this.datosPresupuesto.importeNeto *
      (this.datosPresupuesto.ivaPorcentaje / 100);

    let importeTotal = this.datosPresupuesto.importeNeto + ivaDiscriminado;

    this.settearValores(ivaDiscriminado, importeTotal);
    console.log('hola' + ivaDiscriminado + ' ' + importeTotal);
  }

  agregarItem(): void {
    this.datosPresupuesto.detalle.push({
      detalle: '',
    });
  }

  eliminarItem(index: number): void {
    this.datosPresupuesto.detalle.splice(index, 1);
  }

  onGeneratePDF(): void {
    generateChapistaPDF(this.datosPresupuesto);
  }
}
