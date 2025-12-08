 
'use strict';
import {                   renderBibliotecasDots } from './modules/01-bibliotecas-dots.js';
import {                renderBibliotecasHeatmap } from './modules/02-bibliotecas-heatmap.js';
import {                renderBibliotecasVoronoi } from './modules/04-bibliotecas-voronoi.js';
import {         renderBibliotecasContourDensity } from './modules/05-bibliotecas-contour-density.js';
import {           renderHabitantesPorBiblioteca } from './modules/08-habitantes-por-biblioteca.js';
import {         renderBibliotecasConnectTheDots } from './modules/12-bibliotecas-connect-the-dots.js';
import {                       renderCementerios } from './modules/13-bibliotecas-y-cementerios.js';
import {    renderBibliotecasPorProvinciaBooksII } from './modules/15-bibliotecas-por-provincia-books-II.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// //////////////////////////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 

document.addEventListener("DOMContentLoaded", function() {

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Fetching data ////////////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 

	let w = 450;
	let h = 750;

	Promise.all([
		d3.csv('./data/bibliotecas_populares_[1475].csv'),
		d3.json('./data/habitantes_y_biblioteca_por_departamento__[1475]_sanitized.json'),
		d3.json('./data/argentina_sanitized.json'),
		d3.json('./data/islas_malvinas_sanitized.json'),
		d3.json('./data/limites-provinciales.json'),
		d3.json('./data/departamentos_sanitized.json'),
		d3.json('./data/voronoi_for_D3_sanitized__[1475].json'),
		d3.csv('./data/cementerios_en_argentina.csv')

	]).then(([bibliotecas, hab_y_biblio_x_dpto, argentina, malvinas, provincias, departamentos, voronoi, cementerios]) => {
		renderBibliotecasDots(bibliotecas, argentina, malvinas, provincias, w, h);
		renderBibliotecasHeatmap(bibliotecas, argentina, malvinas, provincias, w, h) ;
		renderBibliotecasVoronoi(bibliotecas, voronoi, argentina, malvinas, w, h);
		renderBibliotecasContourDensity(bibliotecas, argentina, malvinas, provincias, departamentos, w, h);
		renderHabitantesPorBiblioteca(bibliotecas, hab_y_biblio_x_dpto, argentina, malvinas, provincias, departamentos, w, h);
		renderBibliotecasConnectTheDots(bibliotecas, argentina, malvinas, provincias, w, h);
		renderCementerios(bibliotecas, argentina, malvinas, provincias, cementerios, w, h);
		renderBibliotecasPorProvinciaBooksII();
	}).catch(error => {
		console.error('Error loading files:', error);
	});

	document.querySelector('#bpa-path').addEventListener('click', e => { 
		const eTarget = e.currentTarget;
		eTarget.classList.remove('play-animation');
		void eTarget.offsetWidth; 										// This line forces a DOM reflow
		eTarget.classList.add('play-animation');		
	});



// No tocar debajo de esto ////////////////////////////////////////////////////

});