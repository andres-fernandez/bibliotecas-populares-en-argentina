import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderCementerios(bibliotecas_data, argentina_data, islas_malvinas_data, provincias_data, cementerios_data, width, height) {

  const cementerios_container = d3.select('#bpa-cementerios-arg div');

  const svg = cementerios_container.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    .attr('title', 'Bibliotecas populares en Argentina');
  
  const        provincias = svg.append('g').attr('id', 'limites-provinciales');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const       cementerios = svg.append('g').attr('id', 'cementerios');
  const         argentina = svg.append('g').attr('id', 'argentina');
  
  renderArgentina(argentina, argentina_data);
  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);
  renderProvincias(provincias, provincias_data);

  // Un dot para cada cementerio en Argentina /////////////////////////////////////
  
  cementerios.attr('stroke', '#222')
    .attr('stroke-width', 0)
    .attr('fill', '#f50009')
    .selectAll('circle')
    .data(cementerios_data)
    .join('circle')
    .attr('cementerio', d => d.fna)
    .attr('cx', d => projection([d.long, d.lat])[0].toFixed(2))
    .attr('cy', d => projection([d.long, d.lat])[1].toFixed(2))
    .attr('r', .75);
  
  // Un dot para cada biblioteca popular en Argentina /////////////////////////////////////

  const bibliotecas_container = d3.select('#bpa-bibliotecas-arg div');

    const svg_b = bibliotecas_container.append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('viewBox', [0, 0, width, height])
      .attr('title', 'Bibliotecas populares en Argentina');
    
    const     provincias_b = svg_b.append('g').attr('id', 'limites-provinciales');
    const islas_malvinas_b = svg_b.append('g').attr('id', 'islas-malvinas');
    const public_libraries = svg_b.append('g').attr('id', 'public-libraries');
    const      argentina_b = svg_b.append('g').attr('id', 'argentina');
    
    renderArgentina(argentina_b, argentina_data);
    renderIslasMalvinas(islas_malvinas_b, islas_malvinas_data);
    renderProvincias(provincias_b, provincias_data);
    renderBibliotecas(public_libraries, bibliotecas_data, 0.75, '#2ebcd1');

};