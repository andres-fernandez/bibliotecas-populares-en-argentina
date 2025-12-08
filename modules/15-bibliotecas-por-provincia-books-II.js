// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Bibliotecas populares por provincia en Argentina  ////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 

export function renderBibliotecasPorProvinciaBooksII(){

  const width = 185;
  const height = 55;
  const book_height = 55;
  const center_x = width / 2;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Data /////////////////////////////////////////////////////////////////////////
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
  const db = {
    'Buenos Aires': 399,
    'Santa Fe': 219,
    'Córdoba': 135,
    'La Pampa': 69,
    'Entre Ríos': 63,
    'Río Negro': 59,
    'Chaco': 54,
    'Mendoza': 48,
    'Corrientes': 45,
    'Neuquén': 44,
    'San Juan': 42,
    'Santiago del Estero': 39,
    'Chubut': 36,
    'CABA': 36,
    'Salta': 34,
    'Misiones': 34,
    'San Luis': 25,
    'Jujuy': 24,
    'Tucumán': 21,
    'Formosa': 12,
    'La Rioja': 11,
    'Catamarca': 10,
    'Santa Cruz': 8,
    'Tierra del Fuego': 8
  }
  // Recordar que .data() no opera sobre objetos, sólo acepta un array como parámetro
  // Por eso es necesario convertir el objeto original a un array con Object.entries()
  // El resultado será un array de arrays con esta estructura: [ ["Neuquén", 69], ... ['Tierra del Fuego': 11] ] 

  function splitAsArray(numb, divisor){
    let arr = [];
    if (numb < divisor) { 
      arr.push(numb);
    } else {
      const parts = Math.trunc(numb / divisor);
      arr = new Array(parts).fill(divisor);
      arr.unshift(numb % divisor)
    }
    return arr;
  }

const db_TEMP = Object.entries(db); 
const db_as_array = [];

db_TEMP.forEach(curr_arr => {
    const TEMP_arr = [];
    TEMP_arr.push(curr_arr[0]);
    TEMP_arr.push(splitAsArray(curr_arr[1], 100));
    db_as_array.push(TEMP_arr);
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Scale ////////////////////////////////////////////////////////////////////////
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let yScale = d3.scaleLinear().domain([0, 100]).range([.5, 41]);   

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Una sección por cada provincia [por cada elemento de db_as_array] ////////////
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Crear un section para cada elemento del array 'db_as_array' y asignarle como ID una versión sanitizada del primer elemento de cada array interno
  const sections = d3.select('#bpa-bibliotecas-por-provincia').selectAll('section')
    .data(db_as_array)
    .join('section')
    .attr('id', d => d[0].toLowerCase().split(' ').join('-').normalize('NFKD').replace(/[\u0300-\u036f]/g, ''));

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Crear un SVG dentro de cada section. No hace falta bindear nuevamente los ////
  // datos, por se heredan de la asignación original al crear los divs ////////////
  // document.querySelector('section#buenos-aires').__data__  >>  ['Buenos Aires, [99, 100, 100, 100]']   
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  sections.each(function([provincia, bibliotecas]) {
    const section = d3.select(this);
    // console.log(provincia, biblioteca)

    // En cada section, crear el número de divs igual al length del array que se pasa como parámetro con el nombre de 'bibliotecas'
    const divs = section.selectAll('div')
      .data(bibliotecas)
      .join('div')
      .attr('data-number', d => d)
      .append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('viewBox', [0, 0, width, height])
      .attr('widt', width)
      .attr('height', height)

    divs.each(function(bibliotecas) {
      const svg = d3.select(this);
      svg.append('defs')
        .append('mask')
        .attr('id', 'book-mask')
        .append('image')
        .attr('width', width)
        .attr('height', book_height)
        .attr('href', './img/book_mask.svg')

      const svg_group = svg.append('g')

      svg_group.append('image')
        .attr('href', './img/book_inner.svg')
        .attr('opacity', 0.4)
        .attr('width', width)
        .attr('height', book_height);

      svg_group.append('rect')
        .attr('mask', 'url(#book-mask)')
        .attr('y', d => 47 - yScale(bibliotecas))    // 47 es la base de las hojas del libro, desde donde el rectángulo debe crecer
        .attr('width', width)
        .attr('height', 38)                   // Esta es la altura de la zona de las hojas afectada por la máscara. Es el alto máximo que debería tener el rectángulo que representa datos
        .attr('height', d => yScale(bibliotecas))
        .attr('fill', '#5ad4d8');

      svg_group.append('image')
        .attr('href', './img/book_outer.svg')   
        .attr('width', width)
        .attr('height', book_height);
    });

    section.append('div')
        .attr('class', 'books-data')
        .html(() => `<p>${provincia}<br>${bibliotecas.reduce((acc,value) => acc + value, 0)}</p>`)
  });

/* //////////////////////////////////////////////////////////////////// */

}