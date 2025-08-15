export interface Detalle {
  detalle: string;
}

export interface Chapista {
  fecha: Date;
  numeroPresupuesto: number | null;
  numeroSiniestro: number | null;
  'señor/es': string;
  telefono: string;
  correoElectronico: string;
  localidad: string;
  marcaVehiculo: string;
  modelo: string;
  chapaPatente: string;
  domicilio: string;
  detalle: Detalle[];
  observaciones: string;
  importeNeto: number; // Total sin IVA
  ivaPorcentaje: number; // IVA calculado (21% del totalSinIva)
  ivaDiscrimado:number;
  importeTotal: number;
}
