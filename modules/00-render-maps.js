// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Projection & geopath generator ///////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const projection = d3.geoAzimuthalEqualArea()
	.scale(1200)
	.rotate([63.5, 0])
	.center([0, -38.5])
	.translate([(450 / 2), (750 / 2)])
	.precision(0.1);

export const geoPathGenerator = d3.geoPath().projection(projection);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Render Argentina /////////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function renderArgentina(container, JSON_data, strokeColor = '#bbb', strokeWidth = 1.05) {
	container.selectAll('path')
		.data(JSON_data.features)
		.join('path')
		.attr('d', geoPathGenerator)
		.attr('fill', d => 'none')
		.attr('stroke', strokeColor)
		.attr('stroke-linejoin', 'round')
		.attr('stroke-width', strokeWidth);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Render Islas Malvinas ////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
export function renderIslasMalvinas(container, JSON_data) {
	const strokeColor = '#bbb';
	const strokeWidth = 0.25;
	container.attr('fill', 'none')
		.selectAll('path')
		.data(JSON_data.features)
		.join('path')
		.attr('d', geoPathGenerator)
		.attr('stroke', strokeColor)
		.attr('stroke-width', strokeWidth);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Render Provincias /////////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
export function renderProvincias(container, JSON_data, strokeColor = '#ddd', strokeWidth = 0.35) {
	container.attr('fill', 'none')
		.selectAll('path')
		.data(JSON_data.features)
		.join('path')
		.attr('d', geoPathGenerator)
		.attr('stroke', strokeColor)
		.attr('stroke-width', strokeWidth);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Render Departamentos /////////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
export function renderDepartamentos(container, JSON_data, strokeColor = '#bbb', strokeWidth = 0.1) {
	container.attr('fill', 'none')
		.selectAll('path')
		.data(JSON_data.features)
		.join('path')
		.attr('d', geoPathGenerator)
		.attr('stroke', strokeColor)
		.attr('stroke-width', strokeWidth);
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Bibliotecas populares  ///////////////////////////////////////////////////////
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function renderBibliotecas(container, JSON_data, radius = 0.75, fill_color = '#fff') {
	container.attr('stroke', '#222')
		.attr('stroke-width', 0)
		.attr('fill', fill_color)
		.selectAll('circle')
		.data(JSON_data)
		.join('circle')
		// .attr('library', d => d.biblioteca)
		.attr('cx', d => projection([d.long, d.lat])[0].toFixed(2))
		.attr('cy', d => projection([d.long, d.lat])[1].toFixed(2))
		.attr('r', radius);
}