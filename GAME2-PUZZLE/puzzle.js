var rows = 3;
var columns = 3;

var currTile;
var emptyTile;  // Pieza vacía

var turns = 0;
var gameSolved = false;  // Para saber si el juego está resuelto

// Definir el orden original de las piezas
var imgOrder = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"]
];

var imgOrderReal = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"]
];

window.onload = function() {
    let board = document.getElementById("board");

    // Crear las piezas del puzzle
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "imagenespuzzle/" + imgOrder[r][c] + ".jpeg";
            tile.draggable = true;

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.appendChild(tile);
        }
    }

    // Establecer la pieza vacía (invisible)
    emptyTile = document.createElement("img");
    emptyTile.id = "empty"; // Para identificarla fácilmente
    emptyTile.src = ""; // No tiene imagen
    emptyTile.style.visibility = "hidden"; // La ocultamos visualmente
    board.appendChild(emptyTile);
};

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // Esto no hace nada por ahora, pero puedes agregar efectos visuales
}

function dragDrop() {
    let targetTile = this;

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let targetCoords = targetTile.id.split("-");
    let r2 = parseInt(targetCoords[0]);
    let c2 = parseInt(targetCoords[1]);

    // Comprobar si la pieza caída está adyacente a la pieza vacía
    let isAdjacent = (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

    if (isAdjacent) {
        let tempSrc = targetTile.src;
        targetTile.src = currTile.src;
        currTile.src = tempSrc;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}

function dragEnd() {
    checkPuzzleSolved();
}

function checkPuzzleSolved() {
    if (gameSolved) return;  // Si ya está resuelto, no hacer nada más

    let tiles = document.querySelectorAll("#board img");
    let solved = true;

    // Verificar si las piezas están en las posiciones correctas
    tiles.forEach((tile) => {
        if (tile.id !== "empty") {
            let coords = tile.id.split("-");  // Obtener las coordenadas de la pieza
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // La ruta esperada para la pieza (sin el directorio completo)
            let expectedSrc = "imagenespuzzle/" + imgOrderReal[r][c] + ".jpeg";

            // Extraer el nombre del archivo de tile.src
            let tileSrc = tile.src.split('/').pop();  // Obtener solo el nombre del archivo (00.jpeg, etc.)

            // Comprobar si tile.src contiene la ruta esperada
            if (tileSrc !== expectedSrc.split('/').pop()) {
                solved = false;
            }
        }
    });

    if (solved) {
        gameSolved = true;  // Marcar el juego como resuelto
        alert("¡Felicidades, completaste el puzzle!");
    }
}
