        let filas =  100                                              //parseInt( prompt("numero de filas"));
        let columnas =   100                                                               //parseInt( prompt("numnero de columnas"));
        let lado =    10                                                                    //parseInt( prompt("tamanyo celulas"));
        let reproducir = false;
        let fotografia = [];
        let fotoAnterior= [];

     /*   document.addEventListener("keydown", (e) => {
            e.preventDefault()
            switch (e.keyCode) {
                case 39:

                    siguienteEstado()
                    break;
                case 32:
                    intercambiarReproduccion();
                    break;
                case 37:

                    random();
                    break;
                default:
                    break;
            }
        })*/

        setInterval(() => {
            if (reproducir) {
                siguienteEstado()
             

            }
        }, 50)
        
        function intercambiarReproduccion() {
            reproducir = !reproducir
        }

        generarTablero()

        function generarTablero() {
            let html = "<table cellpadding=0 cellspacing=0 id= 'tablero' finalborder=5>" //generamos el tablero
            for (let y = 0; y < filas; y++) {
                html += "<tr>"
                for (let x = 0; x < columnas; x++) {
                    html += `<td id="celula-${x + "-" + y}" onmouseup ="cambiarEstado(${x},${y})">`
                    html += "</td>"
                }
                html += "</tr>"
            }
            html + -"</table>"
            let contenedor = document.getElementById("contenedor-tablero")
            contenedor.innerHTML = html
            let tablero = document.getElementById("tablero")
            tablero.style.width = lado * columnas + "px"
            tablero.style.height = lado * filas + "px"
            fotografiar()
        }


        function cambiarEstado(x, y) {

            let celula = document.getElementById(`celula-${x + "-" + y}`)
            if (celula.style.background != "black") {
                celula.style.background = "black"
            } else {
                celula.style.background = "white"
            }
        }


        function fotografiar() {
            fotografia = []
            for (let x = 0; x < columnas; x++) {
                fotografia.push([])
                for (let y = 0; y < columnas; y++) {
                    let celula = document.getElementById(`celula-${x + "-" + y}`)
                    fotografia[x][y] = celula.style.background == "black"
                }
            }
             
               

        }

       

        function contarVivas(x, y) {
            let vivas = 0
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0)
                        continue
                    try {
                        if (fotografia[x + i][y + j])
                            vivas++
                    } catch (e) { }
                    if (vivas > 3) {
                        return vivas
                    }
                }
            }
            return vivas
        }

        function siguienteEstado() {
            
            fotografiar()
            fotoAnterior = fotografia;
            for (let x = 0; x < columnas; x++) {
                for (let y = 0; y < columnas; y++) {
                    let vivas = contarVivas(x, y)
                    let celula = document.getElementById(`celula-${x + "-" + y}`)
                    if (fotografia[x][y]) {//celula esta viva
                        if (vivas < 2 || vivas > 3)
                            celula.style.background = "white"//muere por sobrepoblacion
                    } else {//celula esta muerta
                        if (vivas == 3)
                            celula.style.background = "black"
                    }
                }
            }

        }


        function estadoAnterior(){  
            fotoAnterior = fotografia;

            for (let x = 0; x < columnas; x++) {
                for (let y = 0; y < columnas; y++) {
                    let celula = document.getElementById(`celula-${x + "-" + y}`)
                    if (fotoAnterior[x][y]) {                    
                            celula.style.background = "black"
                    } else {                 
                            celula.style.background = "white"
                    }
                }
            }
        
        }

        function random() {
            for (let x = 0; x < columnas; x++) {
                for (let y = 0; y < filas; y++) {
                    if (Math.random() < 0.3) {
                        cambiarEstado(x, y)
                    }
                }
            }
        }