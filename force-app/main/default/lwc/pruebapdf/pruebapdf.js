import img from "@salesforce/resourceUrl/imagen2";
import image from "@salesforce/resourceUrl/imagen";

async function toBase64(url) {
  return new Promise((resolve, reject) => {
    const img2 = new Image();
    img2.crossOrigin = "Anonymous";
    img2.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img2.width;
      canvas.height = img2.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img2, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img2.onerror = reject;
    img2.src = url;
  });
}

export async function generarFormato1(doc, formData) {
  // Generar el PDF formato

  // Mostrar mensaje de éxito
  //ShowToastEvent('Éxito', 'Se ha generado el PDF con éxito', 'success');

  
    // Definir los márgenes para mover la tabla en la dirección X
    const margins = { top: 5, bottom: 5, left: 5 };

    // Configuración de las celdas de la tabla
    const options = {
        // Estilos para el cuerpo y cabecera de la tabla 
        headStyles: { fillColor: [51, 122, 183], textColor: 253 },
        bodyStyles: { textColor: [255, 255, 255], fontSize: 10 },
        //Alinear texto al centro de manera horizontal
        styles: { halign: 'center', minCellHeight: 0 },// Altura mínima de la celda 
        columnStyles: {
            0: { // Índice de la columna donde se aplicará el estilo (Primera columna)
                fillColor: [41, 128, 186] // Cambiar el color de fondo de la primera columna
            }
        }
    };

    // Configurar título del PDF
    const tableTitulo = [
        ['SOLICITUD DE CRÉDITO - PERSONAS NATURALES O JURÍDICAS'],
    ];

    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, '0'); // Agrega "0" delante si es un solo número
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // El mes se cuenta desde 0, por eso se suma 1
    const anio = ahora.getFullYear();

    // Configurar datos de la primera tabla (Cabecera)
    const tableCabe = [
        ['Día:',
            'Mes:',
            'Año:',
            'Vendedor:',
            'Ciudad:',
            'Linea(s):',
            'Nombre de Concesionario/Oficina:',
        ],
        [dia,
            mes,
            anio,
            'Angie Sanchez Garces',
            'Cali',
            'Linea de prueba',
            'Vitrina prueba',
        ],
    ];

    // Configurar datos de la segunda tabla (Solicitud de producto)
    const tableProdu = [
        ['Vehículo:',
            'Clase:',
            'Marca:',
            'Indicador de uso:',
        ],
        ['Gh62 plus z',
        'Camioneta',
        'Chevrolet',
            ' ',
        ],
        ['Valor solicitado $:',
            'Modelo:',
            'Línea:',
            'Servicio:',
        ],
        ['12345678',
        '2023',
        'Linea prueba',
        'Particular',
        ],
        ['Valor de la venta:',
            'Cuota Inicial:',
            'Financiado:',
            'Plazo:',
        ],
        ['112223344',
        '112223344',
        'Credito',
        'Prueba',
        ],
    ];

    // Configurar datos de la tercera tabla (Información General del Solicitante)
    const tableInfoGeneSolici = [
        ['Razón social / Nombre y Apellidos:',
            'Tipo de Documento:',
            'N° de Identificación:',
        ],
        [formData.razon_social,
            ' ',
        formData.No_docu,
        ],
        ['Sexo:',
            'Ciudad de Expedición:',
            'País de Expedición:',
            'Fecha de Expedición:',
        ],
        [formData.genero,
        formData.ciudad_expe,
        formData.pais_expe,
        formData.fecha_expe,
        ],
        ['Número de Celular:',
            'Teléfono Fijo:',
            'Fecha de Nacimiento:',
            'Correo Electrónico:',
        ],
        [formData.celular_cont,
        formData.fijo_cont,
        formData.fecha_naci,
        formData.email_cont,
        ],
        ['Ciudad de Residencia:',
            'Barrio de Residencia:',
            'Tipo de Vivienda:',
            'Dirección de Residencia:',
        ],
        [formData.ciudad_resi_2,
        formData.barrio_resi,
            ' ',
        formData.direccion_resi,
        ],
        ['País de Nacionalidad:',
            'País de Nacimiento:',
            'Ciudad de Nacimiento:',
        ],
        [formData.pais_nacio,
        formData.pais_nacimiento,
        formData.ciudad_nacimiento,
        ],
        ['Estado Civil:',
            'Nivel Educativo:',
            'Personas a Cargo:',
        ],
        [formData.estado_civil,
        formData.Nv_educativo,
        formData.personas_cargo,
        ],
        ['Tiempo de Funcionamiento:',
            'N° Matricula Mercantil:',
            'Escritura de Constitución N°:',
        ],
        [formData.tmp_funcion,
        formData.matricula_mercant,
        formData.escritura_const,
        ],
        ['Notaria:',
            'Fecha y Ciudad:',
            'Representante Legal:',
        ],
        [formData.notaria,
        formData.fecha_ciudad,
        formData.repre_legal,
        ],
        ['C.C:',
            'Expedida en:',
            'Tipo de Empresa:',
        ],
        [formData.c_c,
        formData.expedida_en,
            ' ',
        ],
    ];

    // Configurar datos de la cuarta (4.1) tabla (Actividad Economica)
    const tableActiEcono = [
        ['Actividad Económica',
            'Tipo de contrato (Aplica para Asalariado):',

        ],
        [' ', ' ',

        ],
    ];
    const tableActiEcono_2 = [
        ['¿Cuál? (Aplica para Otro)',
            'Tipo de Independiente (Aplica para independiente):',
            'Codigo GIUU',
        ],
        [formData.act_otro,
        formData.tipo_independ,
        formData.cd_giuu,
        ],
    ];


    // Configurar datos de la cuarta (4.2) tabla (Actividad Economica)
    const tableActiEcono_3 = [
        ['Tipo de Actividad Económica Principal:'
        ],
        [' ',
        ],
    ];

    // Configurar datos de la quinta tabla (Información Laboral)
    const tableInfoLab = [
        ['Nombre de la Empresa',
            'Nit:',
            'Antigüedad:',
        ],
        [formData.name_empre,
        formData.nit,
        'Años   ' + formData.antiguedad_anios + ' Meses   ' + formData.antiguedad_meses,
        ],
        ['Relación con la Empresa:',
            'Actividad Económica de la Empresa:',
            'Cargo / Ocupación:',
        ],
        [' ',
            formData.act_empresa,
            formData.cargo,
        ],
        ['Dirección de la empresa:',
            'Ciudad / Municipio del lugar de Trabajo:',
            'Teléfono de Oficina y Extensión:',
        ],
        [formData.dire_empresa,
        formData.ciudad_trabjo,
        formData.telefono_oficina,
        ],
    ];

    // Configurar datos de la sexta tabla (Información de Ingresos y Egresos)
    const tableInfoInEg = [
        ['Ingresos Mensuales:',
            'Egresos Mensuales:',
        ],
        ['Salario $:',
            'Arriendo / Cuota Hipotecaria:',
        ],
        [formData.salario,
        formData.arriendo,
        ],
        ['Comisiones:',
            'Préstamos por Nómina:',
        ],
        [formData.comision,
        formData.prestamo_nomina,
        ],
        ['Honorarios:',
            'Gastos Familiares:',
        ],
        [formData.honorarios,
        formData.gastos_familia,
        ],
        ['Otros Ingresos:',
            'Total Egresos:',
        ],
        [formData.otros_ingresos,
        formData.total_egresos,
        ],
        ['Total Ingresos:',
            'Total Activos:',
        ],
        [formData.total_ingresos,
        formData.total_activos,
        ],
        ['Ingresos no Operacionales:',
            'Total Pasivos:',
        ],
        [formData.ingresos_no_opera,
        formData.total_pasivos,
        ],
    ];

    // Configurar datos de la septima tabla (Información de Ingresos y Egresos Continuación)
    const tableInfoInEg_2 = [
        ['Detalle de otros Ingresos:', '',
            'Total Patrimonio $:',
        ],
        ['Ingresos no Operacionales:',
            formData.detalle_no_opera,
            formData.total_patrimo,
        ],
    ];

    // Configurar datos de la octava tabla (Patrimonio)
    const tablePatri = [
        ['Dirección del Inmueble:',
            'Ciudad',
            'Valor Bien',
            'Valor Hipoteca',
        ],
        [formData.dire_inmueble_1,
        formData.ciudad_inmueble_1,
        formData.valor_bien_1,
        formData.valor_hipo_1,
        ],
    ];

    // Configurar datos de la octava tabla (Patrimonio)
    const tablePatri_2 = [
        ['Dirección del Inmueble:',
            'Ciudad',
            'Valor Bien',
            'Valor Hipoteca',
        ],
        [formData.dire_inmueble_2,
        formData.ciudad_inmueble_2,
        formData.valor_bien_2,
        formData.valor_hipo_2,
        ],
    ];

    // Configurar datos de la octava tabla (Patrimonio)
    const tablePatri_3 = [
        ['Dirección del Inmueble:',
            'Ciudad',
            'Valor Bien',
            'Valor Hipoteca',
        ],
        [formData.dire_inmueble_3,
        formData.ciudad_inmueble_3,
        formData.valor_bien_3,
        formData.valor_hipo_3,
        ],
    ];

    // Configurar datos de la octava tabla (Patrimonio Checkbox)
    const tablePatriCheck = [
        ['Clase',
            'Cert. Tradición',
        ],
        ['', ''
        ],
    ];

    // Configurar datos de la octava tabla (Patrimonio - Vehiculo)
    const tablePatriVehi = [
        ['Marca Vehiculo:',
            'Placa',
            'Clase',
            'Modelo',
            'Valor',
            'Pignorado A',
        ],
        [formData.marca_vehi_1,
        formData.placa_vehi_1,
            ' ',
        formData.modelo_vehi_1,
        formData.valor_vehi_1,
        formData.pignorado_vehi_1,
        ],
        [formData.marca_vehi_2,
        formData.placa_vehi_2,
            ' ',
        formData.modelo_vehi_2,
        formData.valor_vehi_2,
        formData.pignorado_vehi_2,
        ],
        [formData.marca_vehi_3,
        formData.placa_vehi_3,
            ' ',
        formData.modelo_vehi_3,
        formData.valor_vehi_3,
        formData.pignorado_vehi_3,
        ],
    ];

    // Configurar datos de la novena tabla (Referencias Personales)
    const tableRefPerson = [
        ['Nombres y Apellidos',
            'Teléfono Fijo',
            'Celular:',
            'Ciudad:',
            'Verificación:',
        ],
        [formData.name_refe_1,
        formData.fijo_refe_1,
        formData.celular_refe_1,
        formData.ciudad_refe_1,
        formData.veri_refe_1,
        ],
        [formData.name_refe_2,
        formData.fijo_refe_2,
        formData.celular_refe_2,
        formData.ciudad_refe_2,
        formData.veri_refe_2,
        ],
    ];

    // Configurar datos de la decima tabla (Referencias Familiares)
    const tableRefFami = [
        ['Nombres y Apellidos',
            'Teléfono Fijo',
            'Celular:',
            'Ciudad:',
            'Parentesco:',
        ],
        [formData.name_refefa_1,
        formData.fijo_refefa_1,
        formData.celular_refefa_1,
        formData.ciudad_refefa_1,
        formData.parentesco_refefa_1,
        ],
        [formData.name_refefa_2,
        formData.fijo_refefa_2,
        formData.celular_refefa_2,
        formData.ciudad_refefa_2,
        formData.parentesco_refefa_2,
        ],
    ];

    // Configurar datos de la onceaba tabla (Operaciones en Moneda Extranjera)
    const tableMonExtra = [
        ['Tipo:',
            'Monto:',
            'Producto:',
            'Identificación del Producto:',
            'Ciudad:',
            'País:',
            'Moneda:',
        ],
        [formData.tipo_opera_1,
        formData.monto_1,
        formData.producto_1,
        formData.id_producto_1,
        formData.ciudad_producto_1,
        formData.pais_producto_1,
        formData.moneda_pro_1,
        ],
        [formData.tipo_opera_2,
        formData.monto_2,
        formData.producto_2,
        formData.id_producto_2,
        formData.ciudad_producto_2,
        formData.pais_producto_2,
        formData.moneda_pro_2,
        ],
    ];

    // Configurar datos de la doceaba tabla (Residencia Fiscal)
    const tableResFiscal = [
        ['Declara Impuestos:',
            'En otros Países:',
            'Cuáles:  ' + formData.cuales_paises,
        ],
    ];

    // Configurar datos de la treceaba tabla (Espacio Exlusivo para Entidad Financiera)
    const tableEspEntiFinan = [
        ['Espacio Exlusivo para Entidad Financiera',
        ],
        [' \n\n\n\n\n',
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tablePPE_cabe = [
        ['Preguntas PEP (Personas Políticamente Expuestas)',
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tablePPE_deta = [
        ['Las personas políticamente expuestas son aquellas personas nacionales o extranjeras que cumplen funciones públicas destacadas de alto nivel o con mando y jurisdicción en un Estado, como jefes de Estado o de un gobierno, políticos de alta jerarquía, funcionarios gubernamentales, judiciales o militares de alta jerarquía, altos ejecutivos de empresas estatales, funcionarios importantes de partidos políticos o familiar cercano o estrecho colaborador de cualquier categoría de persona expuesta  políticamente (extranjero, nacionales o de organismo internacional). Se considerará persona políticamente expuesta desde el momento de su nombramiento hasta su separación del cargo y por un periodo posterior no mayor de dos (2) años desde el momento que cesa de ejercer funciones u obligaciones. "Definición traída del GAFI". \n\nSe considerarán como Personas Expuestas Políticamente  (PEP)  los servidores públicos de cualquier sistema de nomenclatura y clasificación de empleos de la administración pública nacional y territorial, cuando tengan asignadas o delegadas funciones de: expedición de normas o regulaciones, dirección general, formulación de políticas institucionales y adopción de planes, programas y proyectos, manejo directo de bienes, dineros o valores del Estado, administración de justicia o facultades administrativo sancionatorias, y los particulares que tengan a su cargo la dirección o manejo de recursos en los movimientos o partidos políticos.  Estas funciones podrán ser ejercidas a través de ordenación de gasto, contratación pública, gerencia de proyectos de inversión, pagos, liquidaciones, administración de bienes muebles e inmuebles.  (Decreto 830 de julio 26 de 2021). \n\n¿Goza de reconocimiento público? Especifique. ______________________________________________________________________ \n\n¿Maneja recursos públicos? Especifique ____________________________________________________________________________ \n\n¿Ocupa o ha ocupado cargos públicos? Especifique __________________________________________________________________',
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tableDOFPLAFT_cabe = [
        ['DECLARACIÓN DE ORIGEN DE FONDOS Y PREVENCIÓN DE LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO',
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tableDOFPLAFT_deta = [
        ['Certifico (amos) la veracidad de la información relacionada en esta solicitud y autorizo de manera expresa e irrevocable a HONDA AUTOS para que: consulte, verifique y obtenga un registro escrito, directamente o a través de interpuesta persona, la información contenida en bancos de datos, información financiera, crediticia, comercial, de servicios y proveniente de terceros países; como elemento de análisis para establecer y/o mantener, una relación contractual, cualquiera que sea su naturaleza, así como para evaluar riesgos derivados de una relación contractual vigente, sean estas directamente o por intermedio de alguna empresa con la que yo tenga algún vínculo laboral o comercial. \nAutorizo a HONDA AUTOS a reportar ante las entidades respectivas, la información referente a mi comportamiento en el cumplimiento de las obligaciones asumidas en virtud de una relación contractual, actual o futura. \nAutorizo a HONDA AUTOS  a entregar mi información a terceras personas tales como autoridades administrativas, judiciales, órganos de control y demás dependencias, así como a otras personas autorizadas por la ley, cuando sea solicitada en desarrollo de una investigación.'
        ],
        [' Yo, ______________________  identificado con CC/CE. No. ______________ de _______________obrando en representación legal de_________________ identificado con NIT  ______________,     declaro bajo la gravedad de juramento que mis fondos provienen de______________________________________________________________________________________________ ,de la misma manera declaro: '
        ],
        ['1. Que mis recursos o los recursos de la persona natural o jurídica que represento) provienen de actividades lícitas y están ligados al desarrollo normal de mis/sus actividades, y que, por lo tanto, los mismos no provienen de ninguna actividad ilícita de las contempladas en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione o modifique y aquellas que apliquen en el extranjero en materia de riesgo LA/FT.'
        ],
        ['2. Que yo o la persona natural o jurídica que represento no he/ha efectuado transacciones u operaciones consistentes en o destinadas a la ejecución de actividades ilícitas de las contempladas en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione, o modifique, o a favor de personas que ejecuten o estén relacionadas con la ejecución de dichas actividades.'
        ],
        ['3. Que los recursos que económicos y financieros no serán ni han sido utilizados como medios para patrocinar, ayudar o financiar actividades asociadas al lavado de activos, el financiamiento del terrorismo, proliferación de armas de destrucción masiva, el soborno transnacional y demás delitos contra la administración pública.'
        ],
        ['4. Que yo o la persona natural o jurídica que represento cumple con las normas sobre prevención y control al Lavado de Activos, Financiación del Terrorismo y Financiación de la Proliferación de Armas de Destrucción Masiva (LA/FT/FPADM) que le resulten aplicables (de ser el caso), teniendo implementados las políticas, procedimientos y mecanismos de prevención y control al LA/FT/FPADM que se derivan de dichas disposiciones legales.'
        ],
        ['5. Que ni yo, ni la persona natural o jurídica,  ni sus accionistas, asociados o socios, sus representantes legales y miembros de la Asamblea General de Accionistas, se encuentran en las listas internacionales vinculantes para Colombia de conformidad con el derecho internacional (listas de las Naciones Unidas) o en las listas de la OFAC, estando HONDA AUTOS facultada para efectuar las verificaciones que considere pertinentes y para dar por terminada cualquier relación comercial o jurídica si verifica que me encuentro o que alguna de las personas mencionadas figura en dichas listas.'
        ],
        ['6. No existen investigaciones en Colombia o en otros países, demandas, procesos, acciones legales, condenas o señalamientos en mi contra en fuentes públicas de información.'
        ],
        ['7. Que en el evento en que tenga conocimiento de alguna de las circunstancias descritas en los dos párrafos anteriores, me comprometo a comunicarlo de inmediato a HONDA AUTOS'
        ],
        ['8. Qué conozco, declaro y acepto que HONDA AUTOS  está en la obligación legal de solicitar las aclaraciones que estime pertinentes en el evento en que se presenten circunstancias con base en las cuales HONDA AUTOS pueda tener dudas razonables sobre mis operaciones o las operaciones de la persona natural o jurídica que represento, así como del origen de nuestros activos, evento en el cual suministraremos las aclaraciones que sean del caso.'
        ],
        ['9. En el evento de presentarse, alguna investigación en Colombia o en otros países, demandas, procesos, acciones legales, condenas o señalamientos en mi contra en fuentes públicas de información; notificaré inmediatamente, por el medio más idóneo.'
        ],
        ['10. En el evento de tener conocimiento o inclusión en listas de actividades relacionadas con lavado de activos o la financiación del terrorismo o financiación de armas de destrucción masiva, soborno transnacional y demás delitos contra la administración pública que me involucren; notificaré inmediatamente, por el medio más idóneo.'
        ],
        ['11. Al conocimiento de que llegare a ser señalado públicamente por cualquier medio de amplia difusión nacional (Prensa, Radio, televisión, etc.) como investigados por delitos de lavado de activos, financiación del terrorismo, financiamiento de proliferación de armas de destrucción masiva, soborno transnacional y demás delitos contra la administración pública que me involucren; notificaré inmediatamente, por el medio más idóneo.'
        ],
        ['12. Toda la información que he suministrado en este es documento es actualizada, veraz y verificable en cualquier momento. Obligándome a actualizar anualmente la información contenida en este documento.'
        ],
        ['13. De manera irrevocable autorizo a HONDA AUTOS, para solicitar, consultar, procesar, suministrar, reportar o divulgar a cualquier entidad válidamente autorizada para manejar o administrar en /con bases de datos, incluidas las entidades gubernamentales, la información contenida en este documento.'
        ],
        ['14. Qué conozco, declaro y acepto que HONDA AUTOS  está en la obligación legal de solicitar las aclaraciones que estime pertinentes en el evento en que se presenten circunstancias con base en las cuales HONDA AUTOS pueda tener dudas razonables sobre mis operaciones o las operaciones de la persona natural o jurídica que represento, así como del origen de nuestros activos, evento en el cual suministraremos las aclaraciones que sean del caso.'
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tableATDP_cabe = [
        ['Autorización para tratamiento de Datos Personales',
        ],
    ];

    // Configurar datos de la catorceabaaba tabla (Personas Politicamente Expuestas)
    const tableATDP_deta = [
        ['Autorizo expresamente y de manera voluntaria, a HONDA AUTOS y a las entidades financieras, como a sus subordinadas, filiales y/o subsidiarias, incluyendo a sus responsables o encargados, para: (i) recopilar, usar, archivar, almacenar, tratar, compartir, transmitir y/o transferir mis datos personales con fines estadísticos, comerciales, mercadeo, publicidad, manejo financiero, contable y/o gestión de cartera, todo con arreglo a la ley: (ii) consultar, solicitar y procesar mi información que se refiera a mi comportamiento crediticio, financiero, comercial y de servicios, ante las entidades de consultar u operadores de información y riesgo o ante cualquier otra entidad pública o privada que administre o maneje base de datos; (iii) solicitar, tratar, consultar, recolectar, almacenar, analizar, verificar, usar o circular la información personal comercial relativa a mis ingresos y aportes obligatorios y/o voluntarios en salud, pensión, y cesantías de las entidades de seguridad social, fondos de pensiones o cesantías y/o otra entidad similar en que se encuentre afiliado, que reposa o sea administrada por los operadores de información (PILA), aliados tecnológicos y demás entidades que formen parte del sistema de Segundad social, y a éstos a su vez, para que le suministren a dicha(s) entidad(es) financiera(s), por el medio que considere pertinente y seguro, mis datos personales relacionados con la afiliación y pago de los aportes al Sistema de Seguridad Social Integral, tales como ingreso base de cotización y demás información relacionada con mi situación laboral y empleador; Pudiendo dichas entidades financieras conocer la mencionada información cuando lo requiera, mantenerla actualizada y en general tratarla, directamente o a través de un encargado, con la finalidad analizar mi perfil crediticio en aras de establecer una relación comercial y/o de servicio conmigo, así como también contactarme y ofrecerme productos o servicios que se adecuen a mi perfil crediticio y en caso de ser aprobada esta solicitud de crédito, autorizo a las entidades financieras para que me contacten a través del envío de mensajes por correo electrónico y/o cualquier medio, para notificarme de dicha aprobación.',
        ],
        ['Manifiesto que he sido informado del uso que se le dará a mis datos personales, que esta información podrá ser transmitida a terceros encargados o responsables del manejo de datos personales o transferida a terceros países que cumplan los requisitos mínimos sobre protección de datos establecidos por la ley para su tratamiento y que así lo he aceptado libre y espontáneamente. Igualmente, manifiesto que la información proporcionada es completa, veraz, exacta y comprobable y que en cualquier momento podrá actualizarla, rectificarla, conocerla o solicitar su supresión con arreglo a la normatividad vigente aplicable.',
        ],
        ['Para conocer la Política para la administración de datos personales, ingrese el sitio web de las Entidades Financieras en referencia',
        ],
        ['\nEn constancia de haber leído, entendido y aceptado la anterior, firmo en (Ciudad y fecha):                 _________________________________________ \n\n',
        ],
    ];

    // Configurar los estilos de las celdas
    const styles = {
        //fillColor: [200, 200, 200], // Establecer un color de fondo (gris claro)
        lineColor: [0, 0, 0], // Color del borde
        lineWidth: 0.2,
        fontSize: 6,
        minCellHeight: 1, // Altura mínima de la celda
        //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
        cellPadding: 0.2,  // Añadir padding a las celdas para mejorar la legibilidad
    };

    // Crear tabla (0) con configuraciones de PDF (título del PDF)
    doc.autoTable({
        startY: 4,
        body: tableTitulo,
        ...options,
        tableWidth: 200,
        margin: margins,
    });

    // Checkbox Tipo de registro (Persona Natural) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(62, doc.autoTable.previous.finalY + 1, 2, 2);
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text(46, doc.autoTable.previous.finalY + 2.7, 'Persona Natural');

    // Checkbox Tipo de registro (Persona Juridica) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(92.5, doc.autoTable.previous.finalY + 1, 2, 2);
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text(76, doc.autoTable.previous.finalY + 2.7, 'Persona Juridica');

    // Checkbox lleno Tipo de registro (Persona Natural o Juridica)
    if (formData.tipo_regist === 'Persona Natural') {
        doc.line(62, doc.autoTable.previous.finalY + 1, 66, doc.autoTable.previous.finalY + 4);
        doc.line(62, doc.autoTable.previous.finalY + 4, 66, doc.autoTable.previous.finalY + 1);
    } else if (formData.tipo_regist === 'Persona Juridica') {
        doc.line(92.5, doc.autoTable.previous.finalY + 1, 96.5, doc.autoTable.previous.finalY + 4);
        doc.line(92.5, doc.autoTable.previous.finalY + 4, 96.5, doc.autoTable.previous.finalY + 1);
    }

    // Checkbox Tipo de registro (Credito) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(122.5, doc.autoTable.previous.finalY + 1, 2, 2);
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text(115, doc.autoTable.previous.finalY + 2.7, 'Credito');

    // Checkbox Tipo de registro (Leasing) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(153.5, doc.autoTable.previous.finalY + 1, 2, 2);
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text(145, doc.autoTable.previous.finalY + 2.7, 'Leasing');

    // Checkbox lleno Tipo de registro (Credito / Leasing)
    /**if (formData.form_pago === 'Credito / Leasing') {
        // Credito
        doc.line(122.5, doc.autoTable.previous.finalY + 2, 126.5, doc.autoTable.previous.finalY + 6);
        doc.line(122.5, doc.autoTable.previous.finalY + 6, 126.5, doc.autoTable.previous.finalY + 2);
        // Leasing
        doc.line(153.5, doc.autoTable.previous.finalY + 2, 157.5, doc.autoTable.previous.finalY + 6);
        doc.line(153.5, doc.autoTable.previous.finalY + 6, 157.5, doc.autoTable.previous.finalY + 2);
    }**/

    // Texto (Diligenciar sin tachones ni enmendaduras) pendiente
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 7, 'Diligenciar sin tachones ni enmendaduras');

    // Crear tabla (1) con configuraciones al pdf (Cabecera) 
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 8,
        //head: tableCabe.slice(0, 1),
        body: tableCabe,
        tableWidth: 200,
        margin: margins,
        //columnWidth: ['20', 'auto', 'wrap'],
        styles: styles
    });

    // Texto (Solicitud de producto) pendiente
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Solicitud de Producto');

    // Crear tabla (2) con configuraciones al pdf (Solicitud de producto)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableProdu,
        body: tableProdu,
        tableWidth: 200,
        margin: margins,
        //columnWidth: ['20', 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 70 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Checkbox Indicador de Uso (Nuevo)
    doc.setDrawColor(80, 80, 80);
    doc.rect(169.5, doc.autoTable.previous.finalY - 13.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(162.5, doc.autoTable.previous.finalY - 12, 'Nuevo');

    // Checkbox Indicador de Uso (Usado) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(186.5, doc.autoTable.previous.finalY - 13.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(179.5, doc.autoTable.previous.finalY - 12, 'Usado');

    // Checkbox lleno Indicador de Uso
    if (formData.id_uso === 'Nuevos' || formData.id_uso === 'Renting') {
        doc.line(169.5, doc.autoTable.previous.finalY - 13.7, 173.5, doc.autoTable.previous.finalY - 9.7);
        doc.line(169.5, doc.autoTable.previous.finalY - 9.7, 173.5, doc.autoTable.previous.finalY - 13.7);
    } else if (formData.id_uso === 'Usados') {
        doc.line(186.5, doc.autoTable.previous.finalY - 13.7, 190.5, doc.autoTable.previous.finalY - 9.7);
        doc.line(186.5, doc.autoTable.previous.finalY - 9.7, 190.5, doc.autoTable.previous.finalY - 13.7);
    }

    // Texto (Información General del Solicitante)
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Información General del Solicitante');

    // Crear tabla (3) con configuraciones al pdf (Información General del Solicitante)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        body: tableInfoGeneSolici,
        tableWidth: 200,
        margin: margins,
        //columnWidth: ['auto', 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 70 },  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
            1: { cellWidth: 74 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Checkbox Tipo de Documento (T.I) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(81.5, doc.autoTable.previous.finalY - 47.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(76.5, doc.autoTable.previous.finalY - 46, 'T.I');

    // Checkbox Tipo de Documento (C.C) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(92.5, doc.autoTable.previous.finalY - 47.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(87, doc.autoTable.previous.finalY - 46, 'C.C');

    // Checkbox Tipo de Documento (C.E) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(103.5, doc.autoTable.previous.finalY - 47.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(98, doc.autoTable.previous.finalY - 46, 'C.E');

    // Checkbox Tipo de Documento (PASAPORTE) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(124, doc.autoTable.previous.finalY - 47.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(109, doc.autoTable.previous.finalY - 46, 'PASAPORTE');

    // Checkbox Tipo de Documento (NIT) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(135, doc.autoTable.previous.finalY - 47.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(129.5, doc.autoTable.previous.finalY - 46, 'NIT');

    // Checkbox lleno Tipo de Documento 
    if (formData.tp_docu === 'Tarjeta de identidad') {
        doc.line(81.5, doc.autoTable.previous.finalY - 121.5, 85.5, doc.autoTable.previous.finalY - 117.5);
        doc.line(81.5, doc.autoTable.previous.finalY - 117.5, 85.5, doc.autoTable.previous.finalY - 121.5);
    } else if (formData.tp_docu === 'Cédula de ciudadanía') {
        doc.line(92.5, doc.autoTable.previous.finalY - 121.5, 96.5, doc.autoTable.previous.finalY - 117.5);
        doc.line(92.5, doc.autoTable.previous.finalY - 117.5, 96.5, doc.autoTable.previous.finalY - 121.5);
    } else if (formData.tp_docu === 'Cédula de extranjería') {
        doc.line(103.5, doc.autoTable.previous.finalY - 121.5, 107.5, doc.autoTable.previous.finalY - 117.5);
        doc.line(103.5, doc.autoTable.previous.finalY - 117.5, 107.5, doc.autoTable.previous.finalY - 121.5);
    } else if (formData.tp_docu === 'Pasaporte') {
        doc.line(127, doc.autoTable.previous.finalY - 121.5, 131, doc.autoTable.previous.finalY - 117.5);
        doc.line(127, doc.autoTable.previous.finalY - 117.5, 131, doc.autoTable.previous.finalY - 121.5);
    } else if (formData.tp_docu === 'NIT') {
        doc.line(138, doc.autoTable.previous.finalY - 121.5, 142, doc.autoTable.previous.finalY - 117.5);
        doc.line(138, doc.autoTable.previous.finalY - 117.5, 142, doc.autoTable.previous.finalY - 121.5);
    }

    // Checkbox Tipo de Vivienda (Familiar)
    doc.setDrawColor(80, 80, 80);
    doc.rect(159, doc.autoTable.previous.finalY - 30.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(150.5, doc.autoTable.previous.finalY - 29, 'Familiar');

    // Checkbox Tipo de Vivienda (Alquilada) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(177, doc.autoTable.previous.finalY - 30.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(167.5, doc.autoTable.previous.finalY - 29, 'Alquilada');

    // Checkbox Tipo de Vivienda (Propia) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(193.5, doc.autoTable.previous.finalY - 30.7, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(186.5, doc.autoTable.previous.finalY - 29, 'Propia');

    // Checkbox Tipo de Vivienda
    if (formData.tipo_vivienda === 'familiar') {
        doc.line(161.5, doc.autoTable.previous.finalY - 78.5, 165.5, doc.autoTable.previous.finalY - 74.5);
        doc.line(161.5, doc.autoTable.previous.finalY - 74.5, 165.5, doc.autoTable.previous.finalY - 78.5);
    } else if (formData.tipo_vivienda === 'alquilada') {
        doc.line(180.5, doc.autoTable.previous.finalY - 78.5, 184.5, doc.autoTable.previous.finalY - 74.5);
        doc.line(180.5, doc.autoTable.previous.finalY - 74.5, 184.5, doc.autoTable.previous.finalY - 78.5);
    }
    else if (formData.tipo_vivienda === 'propia') {
        doc.line(197.5, doc.autoTable.previous.finalY - 78.5, 201.5, doc.autoTable.previous.finalY - 74.5);
        doc.line(197.5, doc.autoTable.previous.finalY - 74.5, 201.5, doc.autoTable.previous.finalY - 78.5);
    }

    // Checkbox Tipo de Empresa (Privada)
    doc.setDrawColor(80, 80, 80);
    doc.rect(161.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(153.5, doc.autoTable.previous.finalY - 0.7, 'Privada');

    // Checkbox Tipo de Empresa (Publica) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(178.3, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(170.5, doc.autoTable.previous.finalY - 0.7, 'Publica');

    // Checkbox Tipo de Empresa (Mixta) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(192.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(186.5, doc.autoTable.previous.finalY - 0.7, 'Mixta');

    // Checkbox lleno Tipo de Empresa
    if (formData.tipo_empresa === 'privada') {
        doc.line(164, doc.autoTable.previous.finalY - 6, 168, doc.autoTable.previous.finalY - 2);
        doc.line(164, doc.autoTable.previous.finalY - 2, 168, doc.autoTable.previous.finalY - 6);
    } else if (formData.tipo_empresa === 'publica') {
        doc.line(180.5, doc.autoTable.previous.finalY - 6, 184.5, doc.autoTable.previous.finalY - 2);
        doc.line(180.5, doc.autoTable.previous.finalY - 2, 184.5, doc.autoTable.previous.finalY - 6);
    }
    else if (formData.tipo_empresa === 'mixta') {
        doc.line(194, doc.autoTable.previous.finalY - 6, 198, doc.autoTable.previous.finalY - 2);
        doc.line(194, doc.autoTable.previous.finalY - 2, 198, doc.autoTable.previous.finalY - 6);
    }

    // Texto (Actividad Economica) pendiente
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Actividad Económica');

    // Crear tabla (4.1) con configuraciones al pdf (Actividad Economica)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableActiEcono.slice(0, 1),
        body: tableActiEcono,
        tableWidth: 200,
        columnStyles: {
            0: { cellWidth: 120 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Checkbox Actividad Economica (Asalariado) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(18, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(6.5, doc.autoTable.previous.finalY - 0.7, 'Asalariado');

    // Checkbox Actividad Economica (Independiente) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(41.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(26.5, doc.autoTable.previous.finalY - 0.7, 'Independiente');

    // Checkbox Actividad Economica (Pensionado) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(64.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(51.5, doc.autoTable.previous.finalY - 0.7, 'Pensionado');

    // Checkbox Actividad Economica (Estudiante) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(85, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(73.5, doc.autoTable.previous.finalY - 0.7, 'Estudiante');

    // Checkbox Actividad Economica (Otro) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(99, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(93.5, doc.autoTable.previous.finalY - 0.7, 'Otro');

    // Checkbox lleno Actividad Economica 
    if (formData.act_econo === 'asalariado') {
        doc.line(20.5, doc.autoTable.previous.finalY - 6, 24.5, doc.autoTable.previous.finalY - 2);
        doc.line(20.5, doc.autoTable.previous.finalY - 2, 24.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo === 'independiente') {
        doc.line(45.5, doc.autoTable.previous.finalY - 6, 49.5, doc.autoTable.previous.finalY - 2);
        doc.line(45.5, doc.autoTable.previous.finalY - 2, 49.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo === 'pensionado') {
        doc.line(67, doc.autoTable.previous.finalY - 6, 71, doc.autoTable.previous.finalY - 2);
        doc.line(67, doc.autoTable.previous.finalY - 2, 71, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo === 'estudiante') {
        doc.line(87.5, doc.autoTable.previous.finalY - 6, 91.5, doc.autoTable.previous.finalY - 2);
        doc.line(87.5, doc.autoTable.previous.finalY - 2, 91.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo === 'otro') {
        doc.line(100, doc.autoTable.previous.finalY - 6, 104, doc.autoTable.previous.finalY - 2);
        doc.line(100, doc.autoTable.previous.finalY - 2, 104, doc.autoTable.previous.finalY - 6);
    }

    // Checkbox Tipo de contrato (Termino Fijo) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(139.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(126.5, doc.autoTable.previous.finalY - 0.7, 'Término Fijo');

    // Checkbox Tipo de contrato (Indefinido) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(160, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(149.5, doc.autoTable.previous.finalY - 0.7, 'Indefinido');

    // Checkbox Tipo de contrato (Obra o Labor) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(184.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(170.5, doc.autoTable.previous.finalY - 0.7, 'Obra o Labor');

    // Checkbox lleno Tipo de contrato
    if (formData.tipo_contra === 'term_fijo') {
        doc.line(143.5, doc.autoTable.previous.finalY - 6, 147.5, doc.autoTable.previous.finalY - 2);
        doc.line(143.5, doc.autoTable.previous.finalY - 2, 147.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.tipo_contra === 'indefinido') {
        doc.line(163.5, doc.autoTable.previous.finalY - 6, 167.5, doc.autoTable.previous.finalY - 2);
        doc.line(163.5, doc.autoTable.previous.finalY - 2, 167.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.tipo_contra === 'obra_labor') {
        doc.line(188.5, doc.autoTable.previous.finalY - 6, 192.5, doc.autoTable.previous.finalY - 2);
        doc.line(188.5, doc.autoTable.previous.finalY - 2, 192.5, doc.autoTable.previous.finalY - 6);
    }

    // Crear tabla (4.2) con configuraciones al pdf (Actividad Economica)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tableActiEcono.slice(0, 1),
        body: tableActiEcono_2,
        tableWidth: 200,
        margin: margins,
        columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Crear tabla (4.3) con configuraciones al pdf (Actividad Economica)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tableActiEcono.slice(0, 1),
        body: tableActiEcono_3,
        tableWidth: 200,
        margin: margins,
        columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Checkbox Tipo de Actividad Economica Principal (Comercial) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(17.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(6.5, doc.autoTable.previous.finalY - 0.7, 'Comercial');

    // Checkbox Tipo de Actividad Economica Principal (Industrial) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(36.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(26.5, doc.autoTable.previous.finalY - 0.7, 'Industrial');

    // Checkbox Tipo de Actividad Economica Principal (Transporte) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(58, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(46.5, doc.autoTable.previous.finalY - 0.7, 'Transporte');

    // Checkbox Tipo de Actividad Economica Principal (Construcción) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(82, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(68.5, doc.autoTable.previous.finalY - 0.7, 'Construcción');

    // Checkbox Tipo de Actividad Economica Principal (Agroindustria) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(106, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(92, doc.autoTable.previous.finalY - 0.7, 'Agroindustria');

    // Checkbox Tipo de Actividad Economica Principal (Servicios Financieros) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(138, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(116.5, doc.autoTable.previous.finalY - 0.7, 'Servicios Financieros');

    // Checkbox Tipo de Actividad Economica Principal (Otro) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(157, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(151.5, doc.autoTable.previous.finalY - 0.7, 'Otro');

    // Checkbox lleno Tipo de Actividad Economica Principal
    if (formData.act_econo_prin === 'comercial') {
        doc.line(20.5, doc.autoTable.previous.finalY - 6, 24.5, doc.autoTable.previous.finalY - 2);
        doc.line(20.5, doc.autoTable.previous.finalY - 2, 24.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'industrial') {
        doc.line(40.5, doc.autoTable.previous.finalY - 6, 44.5, doc.autoTable.previous.finalY - 2);
        doc.line(40.5, doc.autoTable.previous.finalY - 2, 44.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'transporte') {
        doc.line(62, doc.autoTable.previous.finalY - 6, 66, doc.autoTable.previous.finalY - 2);
        doc.line(62, doc.autoTable.previous.finalY - 2, 66, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'construccion') {
        doc.line(86, doc.autoTable.previous.finalY - 6, 90, doc.autoTable.previous.finalY - 2);
        doc.line(86, doc.autoTable.previous.finalY - 2, 90, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'agroindustria') {
        doc.line(110, doc.autoTable.previous.finalY - 6, 114, doc.autoTable.previous.finalY - 2);
        doc.line(110, doc.autoTable.previous.finalY - 2, 114, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'servi_finan') {
        doc.line(145, doc.autoTable.previous.finalY - 6, 149, doc.autoTable.previous.finalY - 2);
        doc.line(145, doc.autoTable.previous.finalY - 2, 149, doc.autoTable.previous.finalY - 6);
    } else if (formData.act_econo_prin === 'otro_2') {
        doc.line(158.5, doc.autoTable.previous.finalY - 6, 162.5, doc.autoTable.previous.finalY - 2);
        doc.line(158.5, doc.autoTable.previous.finalY - 2, 162.5, doc.autoTable.previous.finalY - 6);
    }

    // Texto (Información Laboral) pendiente
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Información Laboral');

    // Crear tabla (5) con configuraciones al pdf (Información Laboral)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableInfoLab.slice(0, 1),
        body: tableInfoLab,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 90 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Checkbox Relación con la Empresa (Dueño) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(14, doc.autoTable.previous.finalY - 8.1, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(6.5, doc.autoTable.previous.finalY - 6.4, 'Dueño');

    // Checkbox Relación con la Empresa (Empleado) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(32.5, doc.autoTable.previous.finalY - 8.1, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(21.5, doc.autoTable.previous.finalY - 6.4, 'Empleado');

    // Checkbox Relación con la Empresa (Contratista) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(52.5, doc.autoTable.previous.finalY - 8.1, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(40.5, doc.autoTable.previous.finalY - 6.4, 'Contratista');

    // Checkbox Relación con la Empresa (Socio) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(67.5, doc.autoTable.previous.finalY - 8.1, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(61, doc.autoTable.previous.finalY - 6.4, 'Socio');

    // Checkbox lleno Tipo de contrato
    if (formData.rela_empre === 'dueño') {
        doc.line(16, doc.autoTable.previous.finalY - 20, 20, doc.autoTable.previous.finalY - 16);
        doc.line(16, doc.autoTable.previous.finalY - 16, 20, doc.autoTable.previous.finalY - 20);
    } else if (formData.rela_empre === 'empleado') {
        doc.line(35, doc.autoTable.previous.finalY - 20, 39, doc.autoTable.previous.finalY - 16);
        doc.line(35, doc.autoTable.previous.finalY - 16, 39, doc.autoTable.previous.finalY - 20);
    } else if (formData.rela_empre === 'contratista') {
        doc.line(55, doc.autoTable.previous.finalY - 20, 59, doc.autoTable.previous.finalY - 16);
        doc.line(55, doc.autoTable.previous.finalY - 16, 59, doc.autoTable.previous.finalY - 20);
    } else if (formData.rela_empre === 'socio') {
        doc.line(69, doc.autoTable.previous.finalY - 20, 73, doc.autoTable.previous.finalY - 16);
        doc.line(69, doc.autoTable.previous.finalY - 16, 73, doc.autoTable.previous.finalY - 20);
    }

    // Texto (Información de Ingresos y Egresos) 
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Información de Ingresos y Egresos');

    // Crear tabla (6) con configuraciones al pdf (Información de Ingresos y Egresos)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableInfoInEg.slice(0, 1),
        body: tableInfoInEg,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 100 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Crear tabla (7) con configuraciones al pdf (Información de Ingresos y Egresos Continuación)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 2,
        //head: tableInfoInEg_2.slice(0, 1),
        body: tableInfoInEg_2,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 45 },  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
            1: { cellWidth: 60 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Texto (Información de Patrimonio)
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Información de Patrimonio');

    // Crear tabla (8.1) con configuraciones al pdf (Patrimonio)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tablePatri.slice(0, 1),
        body: tablePatri,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 55 },
            1: { cellWidth: 30 },
            2: { cellWidth: 48 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Crear tabla (8.1) con configuraciones al pdf (Patrimonio - Checkbox)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatriCheck,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 100 },
        },
    });

    // Checkbox Clase de Vivienda 1 (Apto) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(27.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(21.5, doc.autoTable.previous.finalY - 0.7, 'Apto');

    // Checkbox Clase de Vivienda 1 (Casa) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(41, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(34, doc.autoTable.previous.finalY - 0.7, 'Casa');

    // Checkbox Clase de Vivienda 1 (Local)
    doc.setDrawColor(80, 80, 80);
    doc.rect(55, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(48, doc.autoTable.previous.finalY - 0.7, 'Local');

    // Checkbox Clase de Vivienda 1
    if (formData.clase_inmueble_1 === 'apto') {
        doc.line(28, doc.autoTable.previous.finalY - 6, 32, doc.autoTable.previous.finalY - 2);
        doc.line(28, doc.autoTable.previous.finalY - 2, 32, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_1 === 'casa') {
        doc.line(42, doc.autoTable.previous.finalY - 6, 46, doc.autoTable.previous.finalY - 2);
        doc.line(42, doc.autoTable.previous.finalY - 2, 46, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_1 === 'local') {
        doc.line(56, doc.autoTable.previous.finalY - 6, 60, doc.autoTable.previous.finalY - 2);
        doc.line(56, doc.autoTable.previous.finalY - 2, 60, doc.autoTable.previous.finalY - 6);
    }

    // Checkbox Certificado de Tradicion 1 (Si) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(123, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(120, doc.autoTable.previous.finalY - 0.7, 'Si');

    // Checkbox Certificado de Tradicion 1 (No)
    doc.setDrawColor(80, 80, 80);
    doc.rect(134.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(130, doc.autoTable.previous.finalY - 0.7, 'No');

    // Checkbox Certificado de Tradicion 1
    if (formData.certi_inmueble_1 === 'si_1') {
        doc.line(124, doc.autoTable.previous.finalY - 6, 128, doc.autoTable.previous.finalY - 2);
        doc.line(124, doc.autoTable.previous.finalY - 2, 128, doc.autoTable.previous.finalY - 6);
    } else if (formData.certi_inmueble_1 === 'no_1') {
        doc.line(136, doc.autoTable.previous.finalY - 6, 140, doc.autoTable.previous.finalY - 2);
        doc.line(136, doc.autoTable.previous.finalY - 2, 140, doc.autoTable.previous.finalY - 6);
    }

    // Crear tabla (8.2) con configuraciones al pdf (Patrimonio)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatri_2,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 55 },
            1: { cellWidth: 30 },
            2: { cellWidth: 48 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Crear tabla (8.2) con configuraciones al pdf (Patrimonio Checkbox)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatriCheck,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 100 },
        },
    });

    // Checkbox Clase de Vivienda 2 (Apto) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(27.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(21.5, doc.autoTable.previous.finalY - 0.7, 'Apto');

    // Checkbox Clase de Vivienda 2 (Casa) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(41, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(34, doc.autoTable.previous.finalY - 0.7, 'Casa');

    // Checkbox Clase de Vivienda 2 (Local)
    doc.setDrawColor(80, 80, 80);
    doc.rect(55, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(48, doc.autoTable.previous.finalY - 0.7, 'Local');

    // Checkbox Clase de Vivienda 2
    if (formData.clase_inmueble_2 === 'apto') {
        doc.line(28, doc.autoTable.previous.finalY - 6, 32, doc.autoTable.previous.finalY - 2);
        doc.line(28, doc.autoTable.previous.finalY - 2, 32, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_2 === 'casa') {
        doc.line(42, doc.autoTable.previous.finalY - 6, 46, doc.autoTable.previous.finalY - 2);
        doc.line(42, doc.autoTable.previous.finalY - 2, 46, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_2 === 'local') {
        doc.line(56, doc.autoTable.previous.finalY - 6, 60, doc.autoTable.previous.finalY - 2);
        doc.line(56, doc.autoTable.previous.finalY - 2, 60, doc.autoTable.previous.finalY - 6);
    }

    // Checkbox Certificado de Tradicion 2 (Si)
    doc.setDrawColor(80, 80, 80);
    doc.rect(123, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(120, doc.autoTable.previous.finalY - 0.7, 'Si');

    // Checkbox Certificado de Tradicion 2 (No)
    doc.setDrawColor(80, 80, 80);
    doc.rect(134.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(130, doc.autoTable.previous.finalY - 0.7, 'No');

    // Checkbox Certificado de Tradicion 2
    if (formData.certi_inmueble_2 === 'si_1') {
        doc.line(124, doc.autoTable.previous.finalY - 6, 128, doc.autoTable.previous.finalY - 2);
        doc.line(124, doc.autoTable.previous.finalY - 2, 128, doc.autoTable.previous.finalY - 6);
    } else if (formData.certi_inmueble_1 === 'no_1') {
        doc.line(136, doc.autoTable.previous.finalY - 6, 140, doc.autoTable.previous.finalY - 2);
        doc.line(136, doc.autoTable.previous.finalY - 2, 140, doc.autoTable.previous.finalY - 6);
    }

    // Crear tabla (8.3) con configuraciones al pdf (Patrimonio)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatri_3,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 55 },
            1: { cellWidth: 30 },
            2: { cellWidth: 48 }  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
        },
    });

    // Crear tabla (8.3) con configuraciones al pdf (Patrimonio Checkbox)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatriCheck,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 100 },
        },
    });

    // Checkbox Clase de Vivienda 3 (Apto) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(27.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(21.5, doc.autoTable.previous.finalY - 0.7, 'Apto');

    // Checkbox Clase de Vivienda 3 (Casa) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(41, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(34, doc.autoTable.previous.finalY - 0.7, 'Casa');

    // Checkbox Clase de Vivienda 3 (Local)
    doc.setDrawColor(80, 80, 80);
    doc.rect(55, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(48, doc.autoTable.previous.finalY - 0.7, 'Local');

    // Checkbox Clase de Vivienda 3
    if (formData.clase_inmueble_3 === 'apto') {
        doc.line(28, doc.autoTable.previous.finalY - 6, 32, doc.autoTable.previous.finalY - 2);
        doc.line(28, doc.autoTable.previous.finalY - 2, 32, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_3 === 'casa') {
        doc.line(42, doc.autoTable.previous.finalY - 6, 46, doc.autoTable.previous.finalY - 2);
        doc.line(42, doc.autoTable.previous.finalY - 2, 46, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_inmueble_3 === 'local') {
        doc.line(56, doc.autoTable.previous.finalY - 6, 60, doc.autoTable.previous.finalY - 2);
        doc.line(56, doc.autoTable.previous.finalY - 2, 60, doc.autoTable.previous.finalY - 6);
    }

    // Checkbox Certificado de Tradicion 3 (Si) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(123, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(120, doc.autoTable.previous.finalY - 0.7, 'Si');

    // Checkbox Certificado de Tradicion 3 (No)
    doc.setDrawColor(80, 80, 80);
    doc.rect(134.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(130, doc.autoTable.previous.finalY - 0.7, 'No');

    // Checkbox Certificado de Tradicion 3
    if (formData.certi_inmueble_3 === 'si_1') {
        doc.line(124, doc.autoTable.previous.finalY - 6, 128, doc.autoTable.previous.finalY - 2);
        doc.line(124, doc.autoTable.previous.finalY - 2, 128, doc.autoTable.previous.finalY - 6);
    } else if (formData.certi_inmueble_1 === 'no_1') {
        doc.line(136, doc.autoTable.previous.finalY - 6, 140, doc.autoTable.previous.finalY - 2);
        doc.line(136, doc.autoTable.previous.finalY - 2, 140, doc.autoTable.previous.finalY - 6);
    }

    // Crear tabla (8) con configuraciones al pdf (Patrimonio Vehiculo)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tablePatri.slice(0, 1),
        body: tablePatriVehi,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 36 },
            1: { cellWidth: 25 },
            2: { cellWidth: 53 },  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
            3: { cellWidth: 35 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 }
        },
    });

    // Checkbox Clase de Vehiculo 1 (Moto)
    doc.setDrawColor(80, 80, 80);
    doc.rect(76.5, doc.autoTable.previous.finalY - 8, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(70, doc.autoTable.previous.finalY - 6.3, 'Moto');

    // Checkbox Clase de Vehiculo 1 (Camioneta) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(95, doc.autoTable.previous.finalY - 8, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(83, doc.autoTable.previous.finalY - 6.3, 'Camioneta');

    // Checkbox Clase de Vehiculo 1 (Otro)
    doc.setDrawColor(80, 80, 80);
    doc.rect(109.5, doc.autoTable.previous.finalY - 8, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(103.5, doc.autoTable.previous.finalY - 6.3, 'Otro');

    // Checkbox Clase de Vehiculo 1
    if (formData.clase_vehi_1 === 'moto') {
        doc.line(77, doc.autoTable.previous.finalY - 20.5, 81, doc.autoTable.previous.finalY - 16.5);
        doc.line(77, doc.autoTable.previous.finalY - 16.5, 81, doc.autoTable.previous.finalY - 20.5);
    } else if (formData.clase_vehi_1 === 'camioneta') {
        doc.line(97.5, doc.autoTable.previous.finalY - 20.5, 101.5, doc.autoTable.previous.finalY - 16.5);
        doc.line(97.5, doc.autoTable.previous.finalY - 16.5, 101.5, doc.autoTable.previous.finalY - 20.5);
    } else if (formData.clase_vehi_1 === 'otro') {
        doc.line(110, doc.autoTable.previous.finalY - 20.5, 114, doc.autoTable.previous.finalY - 16.5);
        doc.line(110, doc.autoTable.previous.finalY - 16.5, 114, doc.autoTable.previous.finalY - 20.5);
    }

    // Checkbox Clase de Vehiculo 2 (Moto)
    doc.setDrawColor(80, 80, 80);
    doc.rect(76.5, doc.autoTable.previous.finalY - 5.2, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(70, doc.autoTable.previous.finalY - 3.5, 'Moto');

    // Checkbox Clase de Vehiculo 2 (Camioneta) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(95, doc.autoTable.previous.finalY - 5.2, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(83, doc.autoTable.previous.finalY - 3.5, 'Camioneta');

    // Checkbox Clase de Vehiculo 2 (Otro)
    doc.setDrawColor(80, 80, 80);
    doc.rect(109.5, doc.autoTable.previous.finalY - 5.2, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(103.5, doc.autoTable.previous.finalY - 3.5, 'Otro');

    // Checkbox Clase de Vehiculo 2
    if (formData.clase_vehi_2 === 'moto') {
        doc.line(77, doc.autoTable.previous.finalY - 13.5, 81, doc.autoTable.previous.finalY - 9.5);
        doc.line(77, doc.autoTable.previous.finalY - 9.5, 81, doc.autoTable.previous.finalY - 13.5);
    } else if (formData.clase_vehi_2 === 'camioneta') {
        doc.line(97.5, doc.autoTable.previous.finalY - 13.5, 101.5, doc.autoTable.previous.finalY - 9.5);
        doc.line(97.5, doc.autoTable.previous.finalY - 9.5, 101.5, doc.autoTable.previous.finalY - 13.5);
    } else if (formData.clase_vehi_2 === 'otro') {
        doc.line(110, doc.autoTable.previous.finalY - 13.5, 114, doc.autoTable.previous.finalY - 9.5);
        doc.line(110, doc.autoTable.previous.finalY - 9.5, 114, doc.autoTable.previous.finalY - 13.5);
    }

    // Checkbox Clase de Vehiculo 3 (Moto)
    doc.setDrawColor(80, 80, 80);
    doc.rect(76.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(70, doc.autoTable.previous.finalY - 0.7, 'Moto');

    // Checkbox Clase de Vehiculo 3 (Camioneta) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(95, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(83, doc.autoTable.previous.finalY - 0.7, 'Camioneta');

    // Checkbox Clase de Vehiculo 3 (Otro)
    doc.setDrawColor(80, 80, 80);
    doc.rect(109.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(103.5, doc.autoTable.previous.finalY - 0.7, 'Otro');

    // Checkbox Clase de Vehiculo 3
    if (formData.clase_vehi_3 === 'moto') {
        doc.line(77, doc.autoTable.previous.finalY - 6, 81, doc.autoTable.previous.finalY - 2);
        doc.line(77, doc.autoTable.previous.finalY - 2, 81, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_vehi_3 === 'camioneta') {
        doc.line(97.5, doc.autoTable.previous.finalY - 6, 101.5, doc.autoTable.previous.finalY - 2);
        doc.line(97.5, doc.autoTable.previous.finalY - 2, 101.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.clase_vehi_3 === 'otro') {
        doc.line(110, doc.autoTable.previous.finalY - 6, 114, doc.autoTable.previous.finalY - 2);
        doc.line(110, doc.autoTable.previous.finalY - 2, 114, doc.autoTable.previous.finalY - 6);
    }

    // Texto (Referencias Personales) 
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Referencias Personales');

    // Crear tabla (9) con configuraciones al pdf (Referencias Personales)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableRefPerson.slice(0, 1),
        body: tableRefPerson,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Texto (Referencias Familiares)
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Referencias Familiares');

    // Crear tabla (10) con configuraciones al pdf (Referencias Familiares)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableRefFami.slice(0, 1),
        body: tableRefFami,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Texto (Operaciones en Moneda Extranjera)
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Operaciones en Moneda Extranjera');


    // Crear tabla (11) con configuraciones al pdf (Operaciones en Moneda Extranjera)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableMonExtra.slice(0, 1),
        body: tableMonExtra,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles
    });

    // Texto (Residencia Fiscal)
    doc.setFontSize(8);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(5, doc.autoTable.previous.finalY + 3.5, 'Residencia Fiscal');

    // Crear tabla (12) con configuraciones al pdf (Residencia Fiscal)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 4.5,
        //head: tableResFiscal.slice(0, 1),
        body: tableResFiscal,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: styles,
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 60 },  // Columna 0 (Actividad economica) tendrá un ancho fijo de 120 unidades
            2: { cellWidth: 80 },
        },
    });

    // Checkbox Declara Impuestos (Si) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(44, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(40.5, doc.autoTable.previous.finalY - 0.7, 'Si');

    // Checkbox Declara Impuestos (No)
    doc.setDrawColor(80, 80, 80);
    doc.rect(55.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(51.5, doc.autoTable.previous.finalY - 0.7, 'No');

    // Checkbox Declara Impuestos
    if (formData.declara_imp === 'si_2') {
        doc.line(44.5, doc.autoTable.previous.finalY - 6, 48.5, doc.autoTable.previous.finalY - 2);
        doc.line(44.5, doc.autoTable.previous.finalY - 2, 48.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.declara_imp === 'no_2') {
        doc.line(56, doc.autoTable.previous.finalY - 6, 60, doc.autoTable.previous.finalY - 2);
        doc.line(56, doc.autoTable.previous.finalY - 2, 60, doc.autoTable.previous.finalY - 6);
    }

    // Checkbox Declara Impuestos en otros Paises (Si) 
    doc.setDrawColor(80, 80, 80);
    doc.rect(94, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(90.5, doc.autoTable.previous.finalY - 0.7, 'Si');

    // Checkbox Declara Impuestos en otros Paises (No)
    doc.setDrawColor(80, 80, 80);
    doc.rect(105.5, doc.autoTable.previous.finalY - 2.4, 2, 2);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(101.5, doc.autoTable.previous.finalY - 0.7, 'No');

    // Checkbox Declara Impuestos en otros Paises
    if (formData.decla_paises === 'si_3') {
        doc.line(94.5, doc.autoTable.previous.finalY - 6, 98.5, doc.autoTable.previous.finalY - 2);
        doc.line(94.5, doc.autoTable.previous.finalY - 2, 98.5, doc.autoTable.previous.finalY - 6);
    } else if (formData.decla_paises === 'no_3') {
        doc.line(106, doc.autoTable.previous.finalY - 6, 110, doc.autoTable.previous.finalY - 2);
        doc.line(106, doc.autoTable.previous.finalY - 2, 110, doc.autoTable.previous.finalY - 6);
    }

    // Crear tabla (13) con configuraciones al pdf (Espacio Exclusivo para la Entidad Financiera)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 2,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tableEspEntiFinan,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 6,
            halign: 'center',
            1: { rowHeight: 20 },
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (14.1) con configuraciones al pdf (Personas Politicamente Expuestas)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 2,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tablePPE_cabe,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 7,
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (14.2) con configuraciones al pdf (Personas Politicamente Expuestas)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tablePPE_deta,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 6,
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (15.1) con configuraciones al pdf (DECLARACIÓN DE ORIGEN DE FONDOS Y PREVENCIÓN DE LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 2,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tableDOFPLAFT_cabe,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 7,
            halign: 'center',
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (15.2) con configuraciones al pdf (DECLARACIÓN DE ORIGEN DE FONDOS Y PREVENCIÓN DE LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tableDOFPLAFT_deta,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 6,
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (16.1) con configuraciones al pdf (Autorización para tratamiento de Datos Personales)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 2,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tableATDP_cabe,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 7,
            halign: 'center',
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        }
    });

    // Crear tabla (16.2) con configuraciones al pdf (Autorización para tratamiento de Datos Personales)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        //head: tableEspEntiFinan.slice(0, 1),
        body: tableATDP_deta,
        tableWidth: 200,
        margin: margins,
        //columnWidth: [30, 'auto', 'wrap'],
        styles: {
            lineColor: [0, 0, 0], // Color del borde
            lineWidth: 0.2,
            fontSize: 6,
            fontStyle: 'bold',
            //overflow: 'linebreak',  // Habilitar el ajuste de línea si el texto es demasiado largo
            cellPadding: 1,  // Añadir padding a las celdas para mejorar la legibilidad
        },
    });

    // Texto (Firma) 
    doc.setFontSize(7);
    // Establece la fuente a negrita
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(127, doc.autoTable.previous.finalY - 3.5, 'Firma');

    // Obtiene la fecha y hora actual
    const fechaHoraActual = new Date();

    // Obtiene la hora, minutos y segundos
    const hora = fechaHoraActual.getHours().toString().padStart(2, '0'); // Asegura que la hora tenga dos dígitos
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0'); // Asegura que los segundos tengan dos dígitos

    // Nombre del archivo PDF
    doc.save(formData.name_oportunidad + '_' + formData.razon_social + '_' + anio + mes + dia + '_' +hora + minutos + segundos + '.pdf');


}

export async function generarFormato2(doc, formData) {
  const margins = { top: 5, bottom: 5, left: 5 };

  // Configuración de las celdas de la tabla
  const options = {
    // Estilos para el cuerpo y cabecera de la tabla
    headStyles: { fillColor: [51, 122, 183], textColor: 253 },
    bodyStyles: { textColor: [255, 255, 255], fontSize: 25 },
    //Alinear texto al centro de manera horizontal
    styles: { halign: "center" },
    columnStyles: {
      0: {
        // Índice de la columna donde se aplicará el estilo (Primera columna)
        fillColor: [41, 128, 186] // Cambiar el color de fondo de la primera columna
      }
    }
  };

  // Texto (Opcional)
  //doc.setFontSize(22);
  //doc.text('Formato de Crédito', 10, 10);
  //doc.text(formData.N, 10, 20);
  // Calcula las posiciones x e y de la imagen
  const x = 5; // Posición x de la imagen
  const y = 1; // Posición y de la imagen

  // Simulación de una operación asíncrona
  const base64Image = await toBase64(image);
  // Agregar imagen al PDF
  doc.addImage(base64Image, "PNG", x, y, 60, 10); // Parámetros: imagen, formato, x, y, ancho, alto

  const imgY = y + 10 + 5;

  // Configurar título del PDF
  const tableTitulo = [["FORMATO DE CREDITO"]];
  // Crear tabla con configuraciones
  doc.autoTable({
    startY: imgY,
    body: tableTitulo,
    ...options,
    tableWidth: 200,
    margin: margins
  });

  // Configurar datos de la primera tabla
  const tableData = [
    [
      "Nombre de cuenta",
      "Nombre oportunidad",
      "Rating",
      "Cuenta padre",
      "Telefono",
      "Numero cuenta"
    ],
    [
      formData.overview,
      formData.N,
      formData.overview1,
      formData.overview2,
      formData.overview3,
      formData.overview99
    ]
  ];

  // Configurar datos de la segunda tabla
  const tableData_n = [
    [
      "Stage oportunidad",
      "Tipo oportunidad",
      "Descripción",
      "Apellido contacto",
      "Email",
      "Nombre Contacto",
      "Cumpleaños",
      "Primer nombre"
    ],
    [
      formData.O,
      formData.S,
      formData.T,
      formData.Ap,
      formData.E,
      formData.No,
      formData.B,
      formData.P
    ]
  ];

  // Crear tabla (1) con configuraciones al pdf
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 5,
    head: tableData.slice(0, 1),
    body: tableData.slice(1),
    tableWidth: 200,
    margin: margins
  });

  // Crear tabla (2) con configuraciones al pdf
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 5,
    head: tableData_n.slice(0, 1),
    body: tableData_n.slice(1),
    tableWidth: 200,
    margin: margins,
    columnWidth: [30, "auto", "wrap"]
  });

  doc.save("Guardar.pdf");
  //generarPDF(doc);
}
