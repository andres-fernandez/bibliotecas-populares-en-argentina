import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderBibliotecasConnectTheDots(bibliotecas_data, argentina_data, islas_malvinas_data, provincias_data, width, height) {

  const connect_the_dots_container = d3.select('#bpa-path');

  const svg = connect_the_dots_container.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    .attr('title', 'Bibliotecas | Connect the dots');
  
  const      departamentos = svg.append('g').attr('id', 'departamentos');
  const         provincias = svg.append('g').attr('id', 'limites-provinciales');
  const     islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const   public_libraries = svg.append('g').attr('id', 'public-libraries');
  const  libraries_as_dots = svg.append('g').attr('id', 'libraries-as-dots');
  const          argentina = svg.append('g').attr('id', 'argentina');
  
  // Una línea para cada grupo de bibliotecas populares /////////////////////////////////

  const bbpp_sorted = d3.sort(bibliotecas_data, d => d.nro_registro);           
  const xy_from_latlong = bbpp_sorted.map(d => [parseFloat(projection([d.long, d.lat])[0].toFixed(2)), parseFloat(projection([d.long, d.lat])[1].toFixed(2))]);

  const          _300 = xy_from_latlong.slice().slice(0,300);
  const   _300_to_600 = xy_from_latlong.slice().slice(300,600);
  const  _600_to_900 = xy_from_latlong.slice().slice(600,900);
  const _900_to_1200 = xy_from_latlong.slice().slice(900, 1200);
  const _1200_to_1500 = xy_from_latlong.slice().slice(1200);

  const bbpp_segments = [_300, _300_to_600, _600_to_900, _900_to_1200, _1200_to_1500];
    
  // Line generator /////////////////////////////////////////////////////////////////////////

  const lineGenerator = d3.line().curve(d3.curveMonotoneX);
  
  const path = public_libraries.attr('stroke-width', .65)
    .attr('stroke-opacity', 1)
    .attr('fill', 'none')
    .selectAll('path')
    .data(bbpp_segments)
    .join('path')
    .attr('id', (d,i) => ['one', 'two', 'three', 'four', 'five'][i])
    .attr('class', 'curveMonotoneX')
    .attr('d',  d => lineGenerator(d))
    .attr('stroke', '#dcd6b2');

  // Render Argentina, Islas Malvinas y provincias //////////////////////////////////////

  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);
  renderArgentina(argentina, argentina_data);
  renderBibliotecas(libraries_as_dots, bibliotecas_data, 0.35)
 
 ///////////////////////////////////////////////////////////////////////////////
    
}