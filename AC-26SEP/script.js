//Primera parte de java


// Definición de la clase Punto
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    toString() {
        return `(${this.#x}, ${this.#y})`;
    }
}

// Definición de la clase Linea
class Linea {
    #puntoInicio;
    #puntoFin;

    constructor(puntoInicio, puntoFin) {
        this.#puntoInicio = puntoInicio;
        this.#puntoFin = puntoFin;
    }

    get puntoInicio() {
        return this.#puntoInicio;
    }

    set puntoInicio(punto) {
        this.#puntoInicio = punto;
    }

    get puntoFin() {
        return this.#puntoFin;
    }

    set puntoFin(punto) {
        this.#puntoFin = punto;
    }

    // Método para dibujar la línea en SVG usando createElementNS
    dibujar(svg) {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", this.#puntoInicio.x);
        linea.setAttribute("y1", this.#puntoInicio.y);
        linea.setAttribute("x2", this.#puntoFin.x);
        linea.setAttribute("y2", this.#puntoFin.y);
        linea.setAttribute("stroke", "black");
        svg.appendChild(linea);
    }
}

// Definición de la clase Circunferencia
class Circunferencia {
    #centro;
    #radio;

    constructor(centro, radio) {
        this.#centro = centro;
        this.#radio = radio;
    }

    get centro() {
        return this.#centro;
    }

    set centro(value) {
        this.#centro = value;
    }

    get radio() {
        return this.#radio;
    }

    set radio(value) {
        this.#radio = value;
    }

    // Método para dibujar la circunferencia en SVG usando createElementNS
    dibujar(svg) {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.#centro.x);
        circunferencia.setAttribute("cy", this.#centro.y);
        circunferencia.setAttribute("r", this.#radio);
        circunferencia.setAttribute("stroke", "black");
        circunferencia.setAttribute("fill", "none");
        svg.appendChild(circunferencia);
    }
}

// Definición de la clase Elipse
class Elipse {
    #centro;
    #radioX;
    #radioY;

    constructor(centro, radioX, radioY) {
        this.#centro = centro;
        this.#radioX = radioX;
        this.#radioY = radioY;
    }

    get centro() {
        return this.#centro;
    }

    set centro(value) {
        this.#centro = value;
    }

    get radioX() {
        return this.#radioX;
    }

    set radioX(value) {
        this.#radioX = value;
    }

    get radioY() {
        return this.#radioY;
    }

    set radioY(value) {
        this.#radioY = value;
    }

    // Método para dibujar la elipse en SVG usando createElementNS
    dibujar(svg) {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.#centro.x);
        elipse.setAttribute("cy", this.#centro.y);
        elipse.setAttribute("rx", this.#radioX);
        elipse.setAttribute("ry", this.#radioY);
        elipse.setAttribute("stroke", "black");
        elipse.setAttribute("fill", "none");
        svg.appendChild(elipse);
    }
}

// Ejemplo de uso en el archivo HTML
function crearPrimitivas() {
    // Seleccionar el contenedor SVG
    const svg = document.getElementById("svgCanvas");

    // Crear instancias de Punto para definir las posiciones
    const p1 = new Punto(50, 50);
    const p2 = new Punto(200, 50);
    const p3 = new Punto(150, 150);

    // Crear instancias de las primitivas
    const linea = new Linea(p1, p2);
    const circunferencia = new Circunferencia(p3, 40);
    const elipse = new Elipse(p3, 70, 30);

    // Dibujar las primitivas en el contenedor SVG
    linea.dibujar(svg);
    circunferencia.dibujar(svg);
    elipse.dibujar(svg);
}
