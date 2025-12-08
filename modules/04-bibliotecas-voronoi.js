import { projection, geoPathGenerator, renderArgentina, renderIslasMalvinas, renderProvincias, renderDepartamentos, renderBibliotecas } from './00-render-maps.js';

export function renderBibliotecasVoronoi(bibliotecas_data, voronoi_geojson, argentina_data, islas_malvinas_data, width, height) {

  const dataviz = d3.select('#bpa-voronoi');

  const svg = dataviz.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('viewBox', [0, 0, width, height])
    .attr('title', 'Bibliotecas populares en Argentina');
  
  const             frame = svg.append('g').attr('id', 'frame');
  const    islas_malvinas = svg.append('g').attr('id', 'islas-malvinas');
  const           voronoi = svg.append('g').attr('id', 'voronoi');
  const  public_libraries = svg.append('g').attr('id', 'public-libraries');
  const         argentina = svg.append('g').attr('id', 'argentina');
  
  renderBibliotecas(public_libraries, bibliotecas_data, 0.45)
    
  let scaleColor = d3.scaleLog().domain([0.08, 1.85, 4.2, 6.6402, 11.2, 22.4, 56, 107, 229, 321, 444.2, 559, 725, 906, 1167, 1500, 1945, 2881, 4120, 7900]).range(['#fffeab','#fef39f','#fce793','#f9d18c','#f5b985','#f3aa81','#f29c7e','#e7917b','#d68777','#c47f75','#b17873','#9f7171','#8c6a6f','#7f646d','#7b626d','#745f6e','#645d71','#565a73','#51556e','#4d5068']);
        
  voronoi.selectAll('path')
    .data(voronoi_geojson.features)
    .join('path')
    .attr('d', geoPathGenerator)
    .attr('data-area-km2', d => d.properties.area_km2)
    .attr('fill', d => scaleColor(parseFloat(d.properties.area_km2)))
    .attr('stroke', '#333')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', d => { return .1 });

  renderArgentina(argentina, argentina_data);
  renderIslasMalvinas(islas_malvinas, islas_malvinas_data);      

/* ///////////////////////////////////////////////////////////////////////////////// */  

}
