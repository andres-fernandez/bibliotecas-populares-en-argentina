import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderHabitantesPorBiblioteca(biblio_data, habs_y_biblio_data, argentina_data, islas_malvinas_data, provincias_data, departamentos_data, width, height) {

  const habitantes_container = d3.select('#bap-habitantes-por-biblioteca');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SVG setup ////////////////////////////////////////////////////////////////////
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const svg = habitantes_container.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    // .attr('width', width)
    // .attr('height', height)
    .attr('title', 'Habitantes por biblioteca popular por departamento en Argentina');
  
  const              defs = svg.append('defs');
  const             dptos = svg.append('g').attr('id', 'departamentos');
  const        provincias = svg.append('g').attr('id', 'limites-provinciales');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const  libraries_as_dot = svg.append('g').attr('id', 'bibliotecas');
  const         argentina = svg.append('g').attr('id', 'argentina');
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Pattern: hatches /////////////////////////////////////////////////////////////
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const pattern = defs.append('pattern')
    .attr('id', 'hatches-2')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', '3')
    .attr('height', '10')
    .attr('patternTransform', 'rotate(45)');

  const pattern_inner = pattern.selectAll('rect')
    .data( [{ color: '#fff', x: 0, w: 2 }, { color: '#ddd', x: 2, w: 1 }] )
    .join('rect')
    .attr('x', d => d.x)
    .attr('y', 0)
    .attr('width', d => d.w)
    .attr('height', 10)
    .attr('fill', d => d.color)
    
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Render mapas ///////////////////////////////////////////////////////////////// 
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Departamentos ///////////////////////////////////////////////////////////////////
  
  let colorScale = d3.scaleLinear().domain([400,2000,9300,18000,28900,42100,63000,91000,132000,187000,249000]).range(['#2ebcd1', '#a6d8de', '#f7f3ea', '#fb947e', '#e3051b', '#c10517', '#a10413', '#75010c', '#4b0000', '#3c0000', '#280000']);

  dptos.attr('fill', 'none')
    .selectAll('path')
    .data(habs_y_biblio_data.features)
    .join('path')
    .attr('d', geoPathGenerator)
    // .attr('data-name', d => d.properties.fna)
    // .attr('data-bibliotecas', d => d.properties.libraries_in_dpto)
    // .attr('data-habitantes-por-biblioteca', d => d.properties.hab_x_biblio)
    .attr('fill', d => {
      const habs = d.properties.hab_x_biblio;
      let filling_colour = '';
      switch(true) {
        case(!habs):         filling_colour = 'url(#hatches-2)'; break;
        case(habs < 2000):   filling_colour = '#2ebcd1'; break;
        case(habs < 9300):   filling_colour = '#a6d8de'; break;
        case(habs < 18000):  filling_colour = '#f7f3ea'; break;
        case(habs < 28900):  filling_colour = '#fb947e'; break;
        case(habs < 42100):  filling_colour = '#e3051b'; break;
        case(habs < 63000):  filling_colour = '#c10517'; break;
        case(habs < 91000):  filling_colour = '#a10413'; break;
        case(habs < 132000): filling_colour = '#75010c'; break;
        case(habs < 187000): filling_colour = '#4b0000'; break;
        case(habs < 249000): filling_colour = '#3c0000'; break;
        case(habs < 581000): filling_colour = '#280000'; break;
        default: filling_colour = '#ccc';
      }
      return filling_colour;
    })
    .attr('stroke', '#000')
    .attr('stroke-width', .1);

    ///////////////////////////////////////////////////////////////////

    renderIslasMalvinas(islas_malvinas, islas_malvinas_data);
    renderArgentina(argentina, argentina_data);
    renderProvincias(provincias, provincias_data, '#222', 0.35);
    // renderBibliotecas(libraries_as_dot, biblio_data);
  
    ///////////////////////////////////////////////////////////////////

    }
