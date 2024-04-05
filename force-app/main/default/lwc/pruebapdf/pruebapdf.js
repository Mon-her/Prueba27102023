import img from '@salesforce/resourceUrl/imagen2';


async function generarPDF(doc) {
    // Crear una instancia de jsPDF
    //const doc = new window.jspdf.jsPDF();

    // Convertir la imagen a base64
    const base64Image = await toBase64(img);

    // Agregar imagen al PDF
    doc.addImage(base64Image, 'JPEG', 10, 100, 100, 100); // Parámetros: imagen, formato, x, y, ancho, alto

    // Guardar el PDF
    doc.save('documento.pdf');
}

async function toBase64(url) {
    return new Promise((resolve, reject) => {
        const img2 = new Image();
        img2.crossOrigin = 'Anonymous';
        img2.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img2.width;
            canvas.height = img2.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img2, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img2.onerror = reject;
        img2.src = url;
    });
}

export function generarFormato1(doc, formData) {
    // Generar el PDF formato 
    
    // Definir los márgenes para mover la tabla en la dirección X
    const margins = { top: 5, bottom: 5, left: 5 };

    // Configuración de las celdas de la tabla
    const options = {
        // Estilos para el cuerpo y cabecera de la tabla 
        headStyles: { fillColor: [51, 122, 183], textColor: 253 },
        bodyStyles: { textColor: [255, 255, 255], fontSize: 25 },
        //Alinear texto al centro de manera horizontal
        styles: { halign: 'center' },
        columnStyles: {
            0: { // Índice de la columna donde se aplicará el estilo (Primera columna)
                fillColor: [41, 128, 186] // Cambiar el color de fondo de la primera columna
            }
        }
    };

    // Texto (Opcional)
    //doc.setFontSize(22);
    //doc.text('Formato de Crédito', 10, 10);
    //doc.text(formData.N, 10, 20);

    // Configurar título del PDF
    const tableTitulo = [
        ['FORMATO DE CREDITO'],
    ];
    // Crear tabla con configuraciones
    doc.autoTable({
        startY: 5,
        body: tableTitulo,
        ...options,
        tableWidth: 200,
        margin: margins,
    });

    // Configurar datos de la primera tabla 
    const tableData = [
        ['Nombre de cuenta',
            'Nombre oportunidad',
            'Rating',
            'Cuenta padre',
            'Telefono',
            'Numero cuenta',
        ],
        [formData.overview,
        formData.N,
        formData.overview1,
        formData.overview2,
        formData.overview3,
        formData.overview4
        ],
    ];

    // Configurar datos de la segunda tabla 
    const tableData_n = [
        ['Stage oportunidad',
            'Tipo oportunidad',
            'Descripción',
            'Apellido contacto',
            'Email',
            'Nombre Contacto',
            'Cumpleaños',
            'Primer nombre',
        ],
        [formData.O,
        formData.S,
        formData.T,
        formData.Ap,
        formData.E,
        formData.No,
        formData.B,
        formData.P
        ],
    ];

    // Crear tabla (1) con configuraciones al pdf
    doc.autoTable({
        head: tableData.slice(0, 1),
        body: tableData.slice(1),
        tableWidth: 200,
        margin: margins
    });

    // Crear tabla (2) con configuraciones al pdf
    doc.autoTable({
        head: tableData_n.slice(0, 1),
        body: tableData_n.slice(1),
        tableWidth: 200,
        margin: margins,
        columnWidth: [30, 'auto', 'wrap']
    });

    // Crear una instancia de MiComponente
    generarPDF(doc);

    // Nombre del archivo PDF
    //doc.save('formulario.pdf');

    // Mostrar mensaje de éxito
    //ShowToastEvent('Éxito', 'Se ha generado el PDF con éxito', 'success');
}

export function generarFormato2(doc) {
   generarPDF(doc);
}