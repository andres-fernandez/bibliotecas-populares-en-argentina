import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderBibliotecasHeatmap(bibliotecas_data, argentina_data, islas_malvinas_data, provincias_data, width, height) {

  const bibliotecas = d3.select('#bpa-heatmap');

  const canvasLayer = bibliotecas.append('canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);
  const      canvas = canvasLayer.node();
  const     context = canvas.getContext("2d");
  const        heat = simpleheat(canvas);        

  const svg = bibliotecas.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    .attr('title', 'Bibliotecas populares en Argentina');
  
  const        provincias = svg.append('g').attr('id', 'limites-provinciales');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const  public_libraries = svg.append('g').attr('id', 'public-libraries');
  const         argentina = svg.append('g').attr('id', 'argentina');
  
  renderArgentina(argentina, argentina_data);
  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);
  renderProvincias(provincias, provincias_data);
  renderBibliotecas(public_libraries, bibliotecas_data)
  
  heat.data(bibliotecas_data.map(d => {                                        
    const x = projection([d.long, d.lat])[0].toFixed(2);
    const y = projection([d.long, d.lat])[1].toFixed(2);
    const value = 1;     
    return [x, y, value];
  }));      
              
  heat.radius(4, 6);            
  heat.gradient({ 0.2: '#341648', 0.4: '#62205f', 0.5: '#9f2d55', 0.6: '#bb292c', 0.7: '#de4f33', 0.8: '#ef8737', 0.9: '#ffb242', 1: '#ffd353' });      
  heat.draw(0.05);
  heat.resize();  
  
  /* //////////////////////////////////////////////////////////////////// */

};