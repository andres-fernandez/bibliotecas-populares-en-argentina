import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderBibliotecasContourDensity(bibliotecas_data, argentina_data, islas_malvinas_data, provincias_data, departamentos_data, width, height) {

  const bibliotecas = d3.select('#bpa-density');

  const svg = bibliotecas.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    .attr('title', 'Bibliotecas populares en Argentina');
  
  const     departamentos = svg.append('g').attr('id', 'departamentos');
  const        provincias = svg.append('g').attr('id', 'limites-provinciales');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const   contour_density = svg.append('g').attr('id', 'contour-density');
  const  public_libraries = svg.append('g').attr('id', 'public-libraries').attr('opacity', 0.25);
  const         argentina = svg.append('g').attr('id', 'argentina');

  renderArgentina(argentina, argentina_data);
  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);

  let colorramp = ['#341648', '#62205f', '#9f2d55', '#bb292c', '#de4f33', '#ef8737', '#ffb242', '#ffd353'];
  const colorScale = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateRgbBasis(colorramp));

  const contoursGenerator = d3.contourDensity()
    .x(d => projection([d.long, d.lat])[0])    
    .y(d => projection([d.long, d.lat])[1])    
    .size([width, height])                     
    .bandwidth(12)                             
    .thresholds(40);                            
    
    const contours = contoursGenerator(bibliotecas_data)
    
    contour_density.selectAll('path')
    .data(contours)
    .join('path')
    .attr('d', d3.geoPath())       
    .attr('fill', (d, i) => {
      let colour = d3.interpolateSpectral(i / contours.length)     
          colour = d3.interpolateTurbo(i / contours.length)       
          colour = d3.interpolatePlasma(i / contours.length)
          colour = colorScale(i / contours.length)         
      return colour;
    })
    .attr('fill-opacity', 0.5)
    .attr('stroke', '#fff')
    .attr('stroke-width', .25);
  
    renderBibliotecas(public_libraries, bibliotecas_data)
    
  /* //////////////////////////////////////////////////////////////////// */

};