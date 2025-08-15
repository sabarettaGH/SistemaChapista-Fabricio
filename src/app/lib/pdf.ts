import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { miImage } from '../../assets/logo';
import { Chapista, Detalle } from '../interfaces/carga-presupuesto.interface';
import { style } from '@angular/animations';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generateChapistaPDF = (data: Chapista) => {
  // --- 1. Define la cabecera y el cuerpo de la tabla para una sola columna
  const tableBody = data.detalle.map((item: Detalle) => [
    {
      text: item.detalle,
      style: 'detalleText',
    },
  ]);

  const content: any[] = []; // --- Encabezado con información de la empresa y del presupuesto

  content.push({
    ccolumns: [
      {
        stack: [
          { text: 'Fabricio Electrotomecanica', style: 'companyTitle' },
          {
            text: 'MECANICA Y ELECTRONICA',
            style: 'companySubtitle',
          },
          {
            text: 'SERVICIOS ESPECIALES, TODAS LAS MARCAS Y MODELOS',
            style: 'companySubtitle',
          },
          { text: 'de Fabricio Gonzales', style: 'companySubtitle' },
          {
            text: 'Roque Saenz peña 3619-3016 Santo Tomé',
            style: 'contactInfo',
          },
          { text: 'Cel.: 342 (15) 4 307257', style: 'contactInfo' },
          { text: 'email: Fabrigonzalez164@gmail.com', style: 'contactInfo' },
        ],
      },
      {
        stack: [
          { image: miImage, width: 150, height: 140, alignment: 'center' },
        ],
      },
      {
        stack: [
          { text: 'PRESUPUESTO', style: 'budgetTitle', alignment: 'right' },
          {
            text: `N° ${data.numeroPresupuesto}`,
            style: 'budgetNumber',
            alignment: 'right',
          },
          {
            text: `FECHA: ${data.fecha}`,
            style: 'budgetDate',
            alignment: 'right',
          },
        ],
        alignment: 'right',
      },
    ],
    margin: [0, 0, 0, 20],
  }); // --- Información del cliente y vehículo

  content.push({
    columns: [
      {
        stack: [
          { text: `Señor/es: ${data['señor/es']}`, style: 'clientInfo' },
          { text: `Telefono: ${data.telefono}`, style: 'clientInfo' },
          {
            text: `Correo Electrónico: ${data.correoElectronico}`,
            style: 'clientInfo',
          },
          { text: `Domicilio: ${data.domicilio}`, style: 'clientInfo' },
          { text: `Localidad: ${data.localidad}`, style: 'clientInfo' },
        ],
      },
      {
        stack: [
          {
            text: `N° de Siniestro: ${data.numeroSiniestro}`,
            style: 'clientInfo',
          },
          {
            text: `Marca Vehículo: ${data.marcaVehiculo}`,
            style: 'clientInfo',
          },
          { text: `Modelo: ${data.modelo}`, style: 'clientInfo' },
          { text: `Chapa Patente: ${data.chapaPatente}`, style: 'clientInfo' },
        ],
      },
    ],
    margin: [0, 0, 0, 20],
  }); // --- 2. Título de la tabla

  content.push({
    text: 'DETALLE',
    style: 'tableHeaderTitle',
    margin: [0, 10, 0, 5],
    alignment: 'center',
  }); // --- 3. Objeto de la tabla con el layout 'lightHorizontalLines'

  content.push({
    table: {
      widths: ['*'], // Solo una columna, por lo que el width es '*'
      body: tableBody,
    },
    layout: 'lightHorizontalLines', // Este layout crea la línea entre cada fila
    margin: [0, 10, 0, 10],
  }); // --- Observaciones y total

  content.push({
    text: 'OBSERVACIONES:',
    style: 'observationsTitle',
    margin: [0, 10, 0, 5],
  });
  content.push({
    text: data.observaciones,
    style: 'observationsText',
    margin: [0, 0, 0, 20],
  });

  content.push({
    table: {
      widths: ['*'], // ancho completo
      body: [
        [
          {
            stack: [
              {
                text: `Importe neto: $${data.importeNeto.toLocaleString(
                  'es-AR',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                style: 'importeNeto',
                alignment: 'right',
                margin: [0, 0, 0, 5],
              },
              {
                text: `IVA ${
                  data.ivaPorcentaje
                }%: $${data.ivaDiscrimado.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
                style: 'ivaDiscrminado',
                alignment: 'right',
                margin: [0, 0, 0, 5],
              },
              {
                text: `IMPORTE TOTAL: $${data.importeTotal.toLocaleString(
                  'es-AR',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                style: 'importeTotal',
                alignment: 'right',
              },
            ],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 1, // grosor horizontal
      vLineWidth: () => 1, // grosor vertical
      hLineColor: () => '#000000', // color negro
      vLineColor: () => '#000000',
      paddingLeft: () => 5,
      paddingRight: () => 5,
      paddingTop: () => 5,
      paddingBottom: () => 5,
    },
    margin: [0, 10, 0, 10],
  });

  content.push({
    text: '(*) PRESUPUESTO VÁLIDO POR 30 DÍAS',
    style: 'validityText',
    alignment: 'left',
    margin: [0, 5, 0, 5],
  });

  content.push({
    text: 'DUPLICADO',
    style: 'duplicateText',
    alignment: 'center',
    margin: [0, 20, 0, 0],
  }); // --- Definición de estilos

  const styles = {
    companyTitle: { fontSize: 14, bold: true },
    companySubtitle: { fontSize: 10 },
    contactInfo: { fontSize: 8, margin: [0, 1, 0, 1] },
    budgetTitle: { fontSize: 20, bold: true, color: 'black' },
    budgetNumber: { fontSize: 16, color: 'black', margin: [0, 5, 0, 5] },
    budgetDate: { fontSize: 10, margin: [0, 5, 0, 5] },
    clientInfo: { fontSize: 10, margin: [0, 2, 0, 2] },
    tableHeaderTitle: { fontSize: 10, bold: true, decoration: 'underline' },
    tableHeader: { bold: true, fontSize: 10, color: 'black' },
    detalleText: { fontSize: 9, margin: [0, 5, 0, 5] },
    observationsTitle: { fontSize: 10, bold: true },
    observationsText: { fontSize: 10, margin: [0, 2, 0, 2] },
    importeNeto: { fontSize: 11, bold: false },
    ivaDiscrminado: { fontSize: 11, bold: false },
    importeTotal: { fontSize: 14, bold: true },
    validityText: { fontSize: 8 },
    duplicateText: { fontSize: 10, bold: true, color: '#999999' },
  };

  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).download('Presupuesto.pdf');
};

export default generateChapistaPDF;
