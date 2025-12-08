import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderBibliotecasDots(bibliotecas_data, argentina_data, islas_malvinas_data, provincias_data, width, height) {

  const bp_dots_container = d3.select('#bpa-dots');
  const svg = bp_dots_container.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    // .attr('width', width)
    // .attr('height', height)
    .attr('title', 'Bibliotecas populares en Argentina');
  
  const              defs = svg.append('defs');
  const     departamentos = svg.append('g').attr('id', 'departamentos');
  const        provincias = svg.append('g').attr('id', 'limites-provinciales');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const  public_libraries = svg.append('g').attr('id', 'public-libraries');
  const         argentina = svg.append('g').attr('id', 'argentina');

  renderBibliotecas(public_libraries, bibliotecas_data)
  renderProvincias(provincias, provincias_data);
  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);
  renderArgentina(argentina, argentina_data);

 ///////////////////////////////////////////////////////////////////////////////
    
}