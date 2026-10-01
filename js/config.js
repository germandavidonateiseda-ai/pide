/**
 * MUEBLES DUARTE — configuración del sitio
 * ---------------------------------
 * Este archivo es la fuente de verdad de los datos de la casa.
 * Al abrirse cualquier página, js/main.js lee estos valores y
 * actualiza nombre, responsable, rubro, dirección, teléfonos,
 * correo, ID de campaña, misión, visión, historia, enlaces
 * de WhatsApp y el campo oculto del formulario.
 *
 * Cómo editar:
 * 1. Cambie solo los textos entre comillas.
 * 2. Conserve las comas entre campos.
 * 3. En misión y visión, una línea en blanco separa párrafos.
 * 4. En historia puede agregar, quitar o reordenar hitos.
 * 5. Guarde el archivo y recargue el sitio en el navegador.
 *
 * Los años e hitos de «historia» están redactados como relato
 * de la casa. Ajústelos a la trayectoria real antes de publicar
 * si alguna fecha debe corregirse.
 *
 * Dirección: Calle 45 #63, Medellín, Antioquia, 050016, Colombia.
 * Si cambia el celular o el ID de campaña, escríbalos en
 * «celular», «celularE164», «whatsapp» y «campanaId».
 * Si esos campos quedan vacíos, el sitio no muestra teléfono,
 * WhatsApp ni campaña.
 */
(function () {
  function img(id, w) {
    return (
      "https://images.unsplash.com/" +
      id +
      "?auto=format&fit=crop&w=" +
      (w || 1600) +
      "&q=80"
    );
  }

  window.PINEDA_CONFIG = {
    nombre: "MUEBLES DUARTE",
    responsable: "Victor Duarte Romero",
    rubro: "Mueblería y fabricación de muebles",
    slogan: "Mobiliario de autor, concebido para permanecer.",

    direccion: "Calle 45 #63",
    ciudad: "Medellín, Antioquia, 050016",

    celular: "",
    celularE164: "",
    whatsapp: "",

    email: "yorgelisferre151@gmail.com",
    campanaId: "",

    horario: "Lunes a viernes de 8:00 a 17:30 · Sábados de 9:00 a 13:00",

    mision:
      "En MUEBLES DUARTE fabricamos mobiliario que responde, con exactitud y sobriedad, a la manera en que cada persona habita, trabaja y recibe. Nuestra misión es convertir la madera, el textil y el metal en piezas durables, bien medidas y honestas en su material, ejecutadas en el taller de Medellín con oficio directo y un acompañamiento claro desde la primera conversación hasta la instalación.\n\nNo perseguimos la novedad pasajera. Buscamos que cada encargo encuentre su medida, su proporción y su lugar, y que quien lo encarga sepa en todo momento quién construye aquello que va a vivir durante años. El estándar de esta casa es simple de enunciar y exigente de cumplir: material verdadero, unión bien hecha y trato sin ambigüedad.",

    vision:
      "Aspiramos a que MUEBLES DUARTE sea, en Medellín y para quienes proyectan con exigencia, la casa de referencia cuando se busca mobiliario fabricado con criterio y permanencia. Queremos un taller reconocido por la precisión de su medida, la verdad de sus materiales y la discreción de su trato.\n\nNuestra visión es que arquitectos, familias y empresas encuentren aquí un interlocutor único, capaz de escuchar un espacio y devolverlo habitable; y que cada pieza conserve su dignidad con el paso del tiempo. Desde Medellín queremos seguir formando un estándar de fabricación sereno, responsable y de alta gama.",

    historia: [
      {
        anio: "1986",
        titulo: "El primer banco del taller",
        texto:
          "En Medellín abre un taller pequeño dedicado a la carpintería fina. La casa toma el nombre MUEBLES DUARTE y fija un principio que el tiempo no ha vuelto negociable: medir con calma y construir para que la pieza permanezca. Aquellos primeros encargos —mesas, bancos, estanterías— enseñan el ritmo del oficio. La madera no se apura, y quien encarga merece saber qué manos sostienen la herramienta.",
        imagen: img("photo-1452860606245-08befc0ff44b", 1400),
        alt: "Manos de un ebanista trabajando la madera en el taller"
      },
      {
        anio: "1995",
        titulo: "Los interiores completos",
        texto:
          "El trabajo deja de limitarse a la pieza suelta. Familias de la ciudad confían a MUEBLES DUARTE comedores, bibliotecas y alcobas enteras. Nace la costumbre de visitar la obra antes de cortar la primera tabla. El mueble empieza a entenderse como parte de una arquitectura, no como un objeto que llega al final para ocupar un hueco que nadie midió.",
        imagen: img("photo-1493663284031-b7e3aefcae8e", 1400),
        alt: "Sala residencial amueblada con sofá y mesa de centro"
      },
      {
        anio: "2004",
        titulo: "La sede de la Calle 45",
        texto:
          "La producción se reúne en la Calle 45 #63. El taller gana espacio para el corte, el armado, el lijado y el acabado, y con ello la capacidad de asumir encargos de mayor escala sin soltar el control de cada unión. Tener los oficios bajo el mismo techo se vuelve la manera MUEBLES DUARTE de responder por lo que se entrega.",
        imagen: img("photo-1504148455328-c376907d081c", 1400),
        alt: "Herramientas de carpintería ordenadas en el taller"
      },
      {
        anio: "2011",
        titulo: "El mobiliario del trabajo",
        texto:
          "Estudios, salas de reunión y recepciones entran al día a día de la casa. MUEBLES DUARTE aprende a conjugar la sobriedad que pide un espacio profesional con la calidez de la madera maciza. El mismo criterio de medida que sirve a una alcoba sirve a un despacho: resistencia diaria, silencio visual y una presencia que no estorba la tarea.",
        imagen: img("photo-1497366216548-37526070297c", 1400),
        alt: "Oficina contemporánea con mobiliario de trabajo"
      },
      {
        anio: "2018",
        titulo: "La medida como método",
        texto:
          "Se escribe el proceso que hoy rige cada encargo: conversación, visita, propuesta de materiales, fabricación e instalación. El cliente deja de recibir un mueble aislado y empieza a recorrer un método con responsables, plazos y decisiones visibles. Desde entonces, la alta gama se entiende como claridad tanto como acabado.",
        imagen: img("photo-1618221195710-dd6b41faaea6", 1400),
        alt: "Interior residencial contemporáneo con mobiliario a medida"
      },
      {
        anio: "2026",
        titulo: "La casa en plena actividad",
        texto:
          "Desde Medellín, MUEBLES DUARTE sigue fabricando mobiliario residencial y corporativo a medida. El taller de la Calle 45 #63 y el trato directo ordenan cada conversación. El propósito no ha cambiado: construir piezas sobrias, exactas y capaces de acompañar una vida durante años.",
        imagen: img("photo-1600210492486-724fe5c67fb0", 1400),
        alt: "Sala terminada con mobiliario de líneas serenas"
      }
    ]
  };
})();
