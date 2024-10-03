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

function ordenarPuntos(puntos) {
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

function orientacion(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    return (val > 0) ? 1 : (val < 0) ? -1 : 0; // 1 para horario, -1 antihorario, 0 colineal
}

function esConvexo(puntos) {
    let orientaciones = [];
    const numPuntos = puntos.length;
    
    for (let i = 0; i < numPuntos; i++) {
        const p0 = puntos[i];
        const p1 = puntos[(i + 1) % numPuntos];
        const p2 = puntos[(i + 2) % numPuntos];
        const orient = orientacion(p0, p1, p2);
        orientaciones.push(orient);
    }

    const todasIguales = orientaciones.every(val => val === orientaciones[0]);

    return todasIguales;
}

function actualizarTipoPoligono(puntos) {
    const tipoPoligono = esConvexo(puntos) ? "convexa" : "cóncava";
    document.getElementById("tipoPoligono").innerText = `La figura es ${tipoPoligono}`;
  }

function limpiarCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPolygon(puntos) {
    limpiarCanvas(); // Limpiar el contenido anterior

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const puntosOrdenados = ordenarPuntos(puntos);

    ctx.beginPath();
    ctx.moveTo(puntosOrdenados[0].x, puntosOrdenados[0].y);
    puntosOrdenados.forEach((p, index) => {
        if (index > 0) {
            ctx.lineTo(p.x, p.y);
        }
    });
    ctx.closePath();
    ctx.stroke();

    puntosOrdenados.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    });

    actualizarTipoPoligono(puntosOrdenados);

    return puntosOrdenados;
}
function generarFiguraConcava() {
    const puntos = [];
    const numPoints = Math.floor(Math.random() * 6) + 4; // Entre 4 y 8 puntos
    let angleStep = (Math.PI * 2) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        let angle = i * angleStep;
        let radioBase = 100 + Math.random() * 50; // Radio base
        let radio = radioBase;

        // Introducir concavidades aleatoriamente
        if (i % 2 === 0) {
            radio *= 0.8 + 0.4 * Math.random(); // Reducir radio en algunos puntos
        }

        let x = 250 + Math.cos(angle) * radio;
        let y = 250 + Math.sin(angle) * radio;

        puntos.push(new Punto(x, y));
    }
    return puntos;
}
function generatePolygon() {
    if (Math.random() < 0.5) {
        currentPoints = generarFiguraConvexa();
    } else {
        currentPoints = generarFiguraConcava();
    }
    drawPolygon(currentPoints);
    centroidVisible = false;
}
function drawCentroid(centroid, puntos) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    ctx.beginPath();
    ctx.arc(centroid.x, centroid.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  
    // Dibujar líneas solo a los puntos en el polígono ordenado
    const puntosOrdenados = ordenarPuntos(puntos);
    puntosOrdenados.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(centroid.x, centroid.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    });
  }

let centroidVisible = false;
let currentPoints = [];
let generarConvexa = true; // Bandera para alternar entre convexa y cóncava

function generarFiguraConvexa() {
    const puntos = [];
    const numPoints = Math.floor(Math.random() * 6) + 3; // Entre 3 y 8 puntos
    let angleStep = (Math.PI * 2) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        let angle = i * angleStep;
        let x = 250 + Math.cos(angle) * (100 + Math.random() * 50); // Radio variable para convexidad
        let y = 250 + Math.sin(angle) * (100 + Math.random() * 50);
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

function generarFiguraConcava() {
    const puntos = [];
    const numPoints = Math.floor(Math.random() * 6) + 4;
    let angleStep = (Math.PI * 2) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        let angle = i * angleStep;
        let radioBase = 100 + Math.random() * 50;
        let radio = radioBase;

        // Introducir concavidades de forma más aleatoria y controlada
        if (Math.random() < 0.5) {
            radio *= 0.8 + 0.4 * Math.random();
        }

        let x = 250 + Math.cos(angle) * radio;
        let y = 250 + Math.sin(angle) * radio;

        puntos.push(new Punto(x, y));
    }
    return puntos;
}


function generatePolygon() {
    if (Math.random() < 0.5) {
        currentPoints = generarFiguraConvexa();
    } else {
        currentPoints = generarFiguraConcava();
    }
    drawPolygon(currentPoints);
    centroidVisible = false;
}
function toggleCentroid() {
    if (!centroidVisible) {
        const centroid = calcularCentroide(currentPoints);
        drawCentroid(centroid, currentPoints);
    } else {
        drawPolygon(currentPoints);
    }
    centroidVisible = !centroidVisible;
}

generatePolygon();
