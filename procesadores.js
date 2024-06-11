
var procesador = localStorage.getItem('procesador')? JSON.parse(localStorage.getItem('procesador')): ['Intel i9-11900KF','Intel i5-12600H','Ryzen 7 6800H',
'Intel i7-1265U','Ryzen 3 5300G','Intel i3-9100','Ryzen 9 5900X','Ryzen 5 5600X',
'Intel Atom c3750','AMD A12 9800E'];
var nucleos = localStorage.getItem('nucleos')? JSON.parse(localStorage.getItem('nucleos')): [8,12,8,10,4,4,12,6,8,4];
var freloj = localStorage.getItem('freloj')? JSON.parse(localStorage.getItem('freloj')): [5.3,4.5,4.7,4.8,4.2,4.2,4.8,4.6,2.4,3.8];
var congraficos = localStorage.getItem('congraficos')? JSON.parse(localStorage.getItem('congraficos')): [false,true,true,true,true,true,false,false,false,true]
var cache= localStorage.getItem('cache')? JSON.parse(localStorage.getItem('cache')):['16MB','4MB','4MB','4MB','3MB','3MB','8MB','5MB','2MB','2MB'];
var hilos= localStorage.getItem('hilos')? JSON.parse(localStorage.getItem('hilos')):[16,16,16,12,8,4,24,12,8,4];

//Funcion para crear la tabla

function crearTabla(array1, array2, array3, array4, array5, array6){
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var filaEncabezado = document.createElement('tr');
    var celdasencabezado = ['Indice', 'Procesadores', 'Nucleos', 'Vel Reloj', 'Graficos integrados', 'Cache', 'Hilos'];

    celdasencabezado.forEach(function (header){
        var th = document.createElement('th');
        th.textContent = header;
        filaEncabezado.appendChild(th);

    })
    thead.appendChild(filaEncabezado);
    table.appendChild(thead);
    for (var i = 0; i< array1.length; i++){
        var tr = document.createElement('tr');
        var datos = [i, array1[i], array2[i], array3[i], array4[i], array5[i], array6[i]];
        
        datos.forEach(function (dato){
            var td = document.createElement('td');
            td.textContent = dato;
            tr.appendChild(td);

        })
        tbody.appendChild(tr);

    }
    table.appendChild(tbody);
    return table;

}
function actualizarTabla(){
    var contenedorTabla = document.getElementById('contenedorTabla');
    var tablaExistente = contenedorTabla.querySelector('table');

    if (tablaExistente){
        contenedorTabla.removeChild(tablaExistente);
    }
    contenedorTabla.appendChild(crearTabla(procesador, nucleos, freloj, congraficos, cache, hilos));
}
function agregarElemento(){
    var nuevoProce = document.getElementById('nuevoProce').value;
    var nuevoNuc = parseInt(document.getElementById('nuevoNuc').value);
    var nuevaVel = document.getElementById('nuevaVel').value;
    var nuevoCache  = document.getElementById('nuevoCache').value;
    var nuevoHilo = document.getElementById('nuevoHilo').value;
    

    procesador.push(nuevoProce); 
    nucleos.push(nuevoNuc);
    freloj.push(nuevaVel);
    cache.push(nuevoCache);
    hilos.push(nuevoHilo);
    
    
    
    var inputBooleano = document.getElementById('valorBooleano');
    var valor = inputBooleano.checked;

    if (valor) {
      
      congraficos.push(true);
    } else {
      
      congraficos.push(false);
    }

    
    guardarEnLocalStorage();
    actualizarTabla();

}
function reemplazarElemento(){
    var ind = document.getElementById('indiceReemplazar').value;

    var nuevoProce = document.getElementById('nuevoProce').value;
    var nuevoNuc = document.getElementById('nuevoNuc').value;
    var nuevaVel = document.getElementById('nuevaVel').value;
    var nuevoCache  = document.getElementById('nuevoCache').value;
    var nuevoHilo = document.getElementById('nuevoHilo').value;

    var inputBooleano = document.getElementById('valorBooleano');
    var valor = inputBooleano.checked;

    if (ind >= 0 && ind < procesador.length){
      procesador[ind] = nuevoProce;
      nucleos[ind] = nuevoNuc;
      freloj[ind] = nuevaVel;
      cache[ind] = nuevoCache;
      hilos[ind] = nuevoHilo;
      
      if (valor) {
      
        congraficos[ind] = true;
      } else {
        
        congraficos[ind] = false;
      }
      guardarEnLocalStorage();
      actualizarTabla();

    }else{
        alert('Índice no válido');
    }
}
function quitarElemento(){
    var ind1 = document.getElementById('elimElem').value;
    if (ind1 >= 0 && ind1 < procesador.length) {
        procesador.splice(ind1,1);
        nucleos.splice(ind1,1);
        freloj.splice(ind1,1);
        cache.splice(ind1,1);
        hilos.splice(ind1,1);
        congraficos.splice(ind1,1);
        
        guardarEnLocalStorage();
        actualizarTabla();
      } else {
        alert('Índice no válido');
      }
    
}

function guardarEnLocalStorage() {
    localStorage.setItem('procesador', JSON.stringify(procesador));
    localStorage.setItem('nucleos', JSON.stringify(nucleos));
    localStorage.setItem('freloj', JSON.stringify(freloj));
    localStorage.setItem('congraficos', JSON.stringify(congraficos));
    localStorage.setItem('cache', JSON.stringify(cache));
    localStorage.setItem('hilos', JSON.stringify(hilos));
}

function ordenarPorNucleos(){
  var indices = Array.from(Array(nucleos.length).keys());
  indices.sort(function(a, b){
    return nucleos[a]- nucleos[b];
  });
  var procesadorOrdenado = indices.map(function(i) {
    return procesador[i];
  });
  var nucleosOrdenado = indices.map(function(i){
    return nucleos[i];
  });
  var frelojOrdenado = indices.map(function(i){
    return freloj[i];
  });
  var congraficosOrdenado = indices.map(function(i){
    return congraficos[i];
  });
  var cacheOrdenado = indices.map(function(i){
    return cache[i];
  });
  var hilosOrdenado = indices.map(function(i){
    return hilos[i];
  });

  procesador = procesadorOrdenado;
  nucleos = nucleosOrdenado;
  freloj = frelojOrdenado;
  congraficos = congraficosOrdenado;
  cache = cacheOrdenado;
  hilos = hilosOrdenado;

  actualizarTabla();
  guardarEnLocalStorage();

}


document.addEventListener('DOMContentLoaded', function () {
    actualizarTabla();
  });

//_______________________________________________________________________________________________________________________________________

function filtrarPorNucleos() {
  var procesadoresFiltrados = [];
  var nucleosFiltrados = [];
  var frelojFiltrados = [];
  var congraficosFiltrados = [];
  var cacheFiltrados = [];
  var hilosFiltrados = [];

  for (var i = 0; i < nucleos.length; i++) {
      if (nucleos[i] > 6) {
          procesadoresFiltrados.push(procesador[i]);
          nucleosFiltrados.push(nucleos[i]);
          frelojFiltrados.push(freloj[i]);
          congraficosFiltrados.push(congraficos[i]);
          cacheFiltrados.push(cache[i]);
          hilosFiltrados.push(hilos[i]);
      }
  }

  var contenedorTabla = document.getElementById('contenedorTabla');
  var tablaExistente = contenedorTabla.querySelector('table');

  if (tablaExistente) {
      contenedorTabla.removeChild(tablaExistente);
  }

  contenedorTabla.appendChild(crearTabla(procesadoresFiltrados, nucleosFiltrados, frelojFiltrados, congraficosFiltrados, cacheFiltrados, hilosFiltrados));
}
function filtrarPorGraficos() {
  var procesadoresFiltrados = [];
  var nucleosFiltrados = [];
  var frelojFiltrados = [];
  var congraficosFiltrados = [];
  var cacheFiltrados = [];
  var hilosFiltrados = [];

  for (var i = 0; i < nucleos.length; i++) {
      if (congraficos[i]) {
          procesadoresFiltrados.push(procesador[i]);
          nucleosFiltrados.push(nucleos[i]);
          frelojFiltrados.push(freloj[i]);
          congraficosFiltrados.push(congraficos[i]);
          cacheFiltrados.push(cache[i]);
          hilosFiltrados.push(hilos[i]);
      }
  }

  var contenedorTabla = document.getElementById('contenedorTabla');
  var tablaExistente = contenedorTabla.querySelector('table');

  if (tablaExistente) {
      contenedorTabla.removeChild(tablaExistente);
  }

  contenedorTabla.appendChild(crearTabla(procesadoresFiltrados, nucleosFiltrados, frelojFiltrados, congraficosFiltrados, cacheFiltrados, hilosFiltrados));
}