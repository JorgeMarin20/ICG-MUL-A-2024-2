// Clase Linea
class Linea {
    constructor(x1, y1, x2, y2, color = "black", strokeWidth = 2) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._color = color;
        this._strokeWidth = strokeWidth;
    }

    dibujar(svg) {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", this._x1);
        linea.setAttribute("y1", this._y1);
        linea.setAttribute("x2", this._x2);
        linea.setAttribute("y2", this._y2);
        linea.setAttribute("stroke", this._color);
        linea.setAttribute("stroke-width", this._strokeWidth);
        svg.appendChild(linea);
    }
}

// Clase Circunferencia
class Circunferencia {
    constructor(cx, cy, radio, color = "black", strokeWidth = 2, fill = "none") {
        this._cx = cx;
        this._cy = cy;
        this._radio = radio;
        this._color = color;
        this._strokeWidth = strokeWidth;
        this._fill = fill;
    }

    dibujar(svg) {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", this._cx);
        circ.setAttribute("cy", this._cy);
        circ.setAttribute("r", this._radio);
        circ.setAttribute("stroke", this._color);
        circ.setAttribute("stroke-width", this._strokeWidth);
        circ.setAttribute("fill", this._fill);
        svg.appendChild(circ);
    }
}

// Clase Elipse
class Elipse {
    constructor(cx, cy, rx, ry, color = "black", strokeWidth = 2, fill = "none") {
        this._cx = cx;
        this._cy = cy;
        this._rx = rx;
        this._ry = ry;
        this._color = color;
        this._strokeWidth = strokeWidth;
        this._fill = fill;
    }

    dibujar(svg) {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this._cx);
        elipse.setAttribute("cy", this._cy);
        elipse.setAttribute("rx", this._rx);
        elipse.setAttribute("ry", this._ry);
        elipse.setAttribute("stroke", this._color);
        elipse.setAttribute("stroke-width", this._strokeWidth);
        elipse.setAttribute("fill", this._fill);
        svg.appendChild(elipse);
    }
}

// Función para dibujar las primitivas
function dibujarPrimitivas() {
    const svg = document.getElementById('canvas');

    // Crear y dibujar una línea
    const linea = new Linea(50, 50, 200, 200, "red", 4);
    linea.dibujar(svg);

    // Crear y dibujar una circunferencia
    const circunferencia = new Circunferencia(300, 150, 50, "blue", 3, "yellow");
    circunferencia.dibujar(svg);

    // Crear y dibujar una elipse
    const elipse = new Elipse(150, 300, 100, 50, "green", 2, "pink");
    elipse.dibujar(svg);
}

// Asegurarse de que el código se ejecute cuando el DOM esté cargado
window.addEventListener('load', dibujarPrimitivas);
