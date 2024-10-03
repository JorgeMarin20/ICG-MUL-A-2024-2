class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static generarPuntosAleatorios(n) {
        const puntos = [];
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 480 + 10; // Entre 10 y 490 para mantener margen
            const y = Math.random() * 480 + 10;
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }
}

function calcularCentroide(puntos) {
    let xSum = 0, ySum = 0;
    puntos.forEach(p => {
        xSum += p.x;
        ySum += p.y;
    });
    return new Punto(xSum / puntos.length, ySum / puntos.length);
}

// Algoritmo de Envoltura de Regalo (Gift Wrapping) para ordenar los puntos y formar un polígono válido
function ordenarPuntos(puntos) {
    // Encuentra el punto más a la izquierda (base del algoritmo)
    let puntoInicial = puntos[0];
    for (let i = 1; i < puntos.length; i++) {
        if (puntos[i].x < puntoInicial.x) {
            puntoInicial = puntos[i];
        }
    }

    const ordenados = [];
    let puntoActual = puntoInicial;
    let siguientePunto;
    do {
        ordenados.push(puntoActual);
        siguientePunto = puntos[0];

        for (let i = 1; i < puntos.length; i++) {
            if (
                siguientePunto === puntoActual ||
                orientacion(puntoActual, siguientePunto, puntos[i]) > 0
            ) {
                siguientePunto = puntos[i];
            }
        }

        puntoActual = siguientePunto;
    } while (puntoActual !== puntoInicial);

    return ordenados;
}

// Función auxiliar para calcular la orientación de tres puntos
function orientacion(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

function drawPolygon(puntos) {
    const svg = document.getElementById("svgCanvas");
    svg.innerHTML = ''; // Limpiar el contenido anterior

    // Ordenar los puntos para evitar cruces
    const puntosOrdenados = ordenarPuntos(puntos);

    // Dibujar líneas entre los puntos
    let polygonPoints = "";
    puntosOrdenados.forEach(p => {
        polygonPoints += `${p.x},${p.y} `;
    });

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", polygonPoints);
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("fill", "none");
    svg.appendChild(polygon);

    // Dibujar los puntos
    puntosOrdenados.forEach(p => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", p.x);
        circle.setAttribute("cy", p.y);
        circle.setAttribute("r", 5);
        circle.setAttribute("class", "point");
        svg.appendChild(circle);
    });

    return polygonPoints;
}

function drawCentroid(centroid, puntos) {
    const svg = document.getElementById("svgCanvas");

    // Dibujar el centroide
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centroid.x);
    circle.setAttribute("cy", centroid.y);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "blue");
    svg.appendChild(circle);

    // Dibujar las líneas desde el centroide a cada punto
    puntos.forEach(p => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centroid.x);
        line.setAttribute("y1", centroid.y);
        line.setAttribute("x2", p.x);
        line.setAttribute("y2", p.y);
        line.setAttribute("class", "centroid-line");
        svg.appendChild(line);
    });
}

let centroidVisible = false;
let currentPoints = [];

function generatePolygon() {
    const numPoints = Math.floor(Math.random() * 6) + 3; // Entre 3 y 8 puntos
    currentPoints = Punto.generarPuntosAleatorios(numPoints);
    drawPolygon(currentPoints);
    centroidVisible = false; // Ocultar centroide al generar nueva figura
}

function toggleCentroid() {
    if (!centroidVisible) {
        const centroid = calcularCentroide(currentPoints);
        drawCentroid(centroid, currentPoints);
    } else {
        generatePolygon(); // Redibujar la figura sin el centroide
    }
    centroidVisible = !centroidVisible;
}

// Generar la primera figura al cargar la página
generatePolygon();
