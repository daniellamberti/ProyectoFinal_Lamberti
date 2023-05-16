
    // Se resetean los valores acumulados en el Local Storage para permitir su posterior actualización

localStorage.setItem("Teoria",JSON.stringify([]));
localStorage.setItem("Armonia",JSON.stringify([]));
localStorage.setItem("Ensamble",JSON.stringify([]));
localStorage.setItem("Instrumento",JSON.stringify([]));

        // Se crean las variables necesarias para el formulario de ingreso nombre y apellido del usuario.

let nombreAlumno="";
let saludar="";
let saludoPlace=""
const botonInicio = document.getElementById("enviarSaludo");

botonInicio.addEventListener("click", ()=>{
    nombreAlumno = document.getElementById("input-nombre").value;

    // Se validan los datos para el formulario de ingreso nombre y apellido del usuario.

    if(nombreAlumno == "" || nombreAlumno >= 0 && nombreAlumno <=10000) {
        Swal.fire ({  // Se utiliza la librería SweetAlert para informar al usuario
            text: "Es necesario que ingreses tu nombre y apellido",
            icon: "info",
            confirmButtonText: "Aceptar",
            background: "orange"
        })
    }
    else {
    saludar = document.createElement('p');
    saludar.innerHTML = "Hola " + nombreAlumno + ", bienvenido. Ingresa las notas de todos los examenes rendidos";
    saludoPlace = document.getElementById('saludar');
    saludoPlace.appendChild(saludar);
    }
})

        // Se vinculan los formularios que se usarán para almacenar la información brindada por el usuario:

const formInst = document.getElementById("formInst");
const formTeor = document.getElementById("formTeor");
const formArm = document.getElementById("formArm");
const formEns = document.getElementById("formEns");


                /* =================  F  U  N  C  I  O  N  E  S    ================= */

        /* Se crea una FUNCIÓN para obtener el promedio de las notas en cada asignatura.
                    Se usará la misma función en las 4 materias.  */

function promediosMaterias(materia,cantExam) {
    prom = 0;
    suma = 0;

    for(let i = 0; i < materia.length; i++) {
        suma = materia[i] + suma;
    }
    prom = suma / cantExam;
    return prom.toFixed(2);
}

            /* Se crea una FUNCIÓN para determinar si el alumno aprobó o no cada materia.
                    Es una misma función que se utilizará en las 4 Asignaturas. */

function aprobadoReprobado(asignatura,notafinal,lugar) {
    if(notafinal >=6) {
    let aprob = document.createElement('p');
    aprob.innerHTML = `El promedio de tus notas de ${asignatura} es igual o mayor que 6 por lo tanto
    tenes esta materia aprobada`;
    let aprobPlace = document.getElementById(lugar);
    aprobPlace.appendChild(aprob);
    }
    else {
        let aprob = document.createElement('p');
    aprob.innerHTML = `El promedio de tus notas de ${asignatura} es menor que 6 por lo tanto
    tenes que recursar la materia o materias reprobadas`;
    let aprobPlace = document.getElementById(lugar);
    aprobPlace.appendChild(aprob);
    }
}

// Se crea una FUNCIÓN para darle al usuario la devolución del promedio de los exámenes de determinada materia.

function DevolPromedioMateria(var1,var2,promedioAsig,botAsig,asignatura) {
    var1 = document.createElement('p');
    var1.innerHTML = "El promedio de tus notas de " + asignatura + " es " + promedioAsig.toFixed(2);
    var2 = document.getElementById(botAsig);
    var2.appendChild(var1);
}

            // Comenzamos a recopilar los datos del usuario via FORMULARIOS.

            // Se crean las variables para las notas de los exámenes de Instrumento.

let exInst1;
let exInst2;
let exInst3;

let notasInst = [];  // Se declara el array que luego contendrá las notas de los exámenes de INSTRUMENTO
let notaFinalInst ="";  // Se declara la variable que tendrá la nota promedio de los exámenes de INSTRUMENTO
let instNotas;

             // Se evita el comportamiento "default" del formulario de Instrumento


formInst.addEventListener("submit", (e)=>{
    e.preventDefault();

     // Se asignan a las variables de los exámenes de INSTRUMENTO los valores que ingresará el usuario

    exInst1 = (document.getElementById("instrumento1").value);
    exInst2 = (document.getElementById("instrumento2").value);
    exInst3 = (document.getElementById("instrumento3").value);

        // Se validan los datos para el formulario de ingreso de las notas de INSTRUMENTO.

    if(exInst1 < 0 || exInst1 > 10 || exInst2 < 0 || exInst2 > 10 || exInst3 < 0 || exInst3 > 10) {
        swal.fire("Debes ingresar numeros entre 0 y 10");
    }

    else if(exInst1 == "" || exInst2 == "" || exInst3 == "") {
        swal.fire("Debes rellenar todos los campos");
    }

    else if(isNaN(exInst1) || isNaN(exInst2) || isNaN(exInst3)) {
        swal.fire("No puedes ingresar texto en estos campos, solo numeros");
    }

    else {          // Se convierte la data ingresada de "string" a "number"

        exInst1 = parseFloat(exInst1);
        exInst2 = parseFloat(exInst2);
        exInst3 = parseFloat(exInst3);

             // Se ingresan las notas de INSTRUMENTO en su correspondiente array (notasInst)

        notasInst[0] = exInst1;
        notasInst[1] = exInst2;
        notasInst[2] = exInst3;

        // Se guarda el array que contiene todas las notas de los exámenes de Instrumento en el Local Storage

        localStorage.setItem("Instrumento",JSON.stringify(notasInst));

    // Se recuperan los datos de las notas de INSTRUMENTO desde el Local Storage para posterior utilización.

        const backNotasInst = localStorage.getItem("Instrumento");
        instNotas = JSON.stringify(backNotasInst);

                    // Se calcula la nota promedio de los exámenes de INSTRUMENTO

        notaFinalInst = (exInst1 + exInst2 + exInst3) / 3;

            // Se declaran las variables globales necesarias para la función DevolverPromedioMateria.

        pInst = "";
        instPlace = "";

            // Se da al usuario la devolución del promedio de las notas ingresadas en la asignatura en cuestión.

        DevolPromedioMateria(pInst,instPlace,notaFinalInst,"botonInstAqui","Instrumento");

            // Se le confirma al usuario si, segun el promedio obtenido en la materia, la aprobó o no.

        aprobadoReprobado("Instrumento",notaFinalInst,"aprobAquiInst");

                                //Reseteamos el form al mandar los datos
        formInst.reset();
    }
})

                // Se crean las variables para las notas de los exámenes de Instrumento.

let exTeor1;
let exTeor2;
let exTeor3;
let exTeor4;
let exTeor5;

let notasTeor = [];  // Se declara el array que luego contendrá las notas de los exámenes de TEORIA
let notaFinalTeor =""; // Se declara la variable que tendrá la nota promedio de los exámenes de TEORIA
let teorNotas;

                // Se evita el comportamiento "default" del formulario de Teoría

formTeor.addEventListener("submit", (e)=>{
    e.preventDefault();

    // Se asignan a las variables de los exámenes de TEORÍA los valores que ingresará el usuario

    exTeor1 = document.getElementById("teoria1").value;
    exTeor2 = document.getElementById("teoria2").value;
    exTeor3 = document.getElementById("teoria3").value;
    exTeor4 = document.getElementById("teoria4").value;
    exTeor5 = document.getElementById("teoria5").value;

            // Se validan los datos para el formulario de ingreso de las notas de TEORÍA.

    if(exTeor1 < 0 || exTeor1 > 10 || exTeor2 < 0 || exInst2 > 10 || exTeor3 < 0 || exTeor3 > 10 || exTeor4 < 0 || exTeor4 > 10 || exTeor5 < 0 || exTeor5 > 10) {
        swal.fire("Debes ingresar numeros entre 0 y 10");
    }

    else if(exTeor1 == "" || exTeor2 == "" || exTeor3 == "" || exTeor4 == "" || exTeor5 == "") {
        swal.fire("Debes rellenar todos los campos");
    }

    else if(isNaN(exTeor1) || isNaN(exTeor2) || isNaN(exTeor3) || isNaN(exTeor4) || isNaN(exTeor5)) {
        swal.fire("No puedes ingresar texto en estos campos, solo numeros");
    }

    else {           // Se convierte la data ingresada de "string" a "number"

    exTeor1 = parseFloat(exTeor1);
    exTeor2 = parseFloat(exTeor2);
    exTeor3 = parseFloat(exTeor3);
    exTeor4 = parseFloat(exTeor4);
    exTeor5 = parseFloat(exTeor5);

            // Se ingresan las notas de TEORÍA en su correspondiente array (notasTeor)

    notasTeor[0] = exTeor1;
    notasTeor[1] = exTeor2;
    notasTeor[2] = exTeor3;
    notasTeor[3] = exTeor4;
    notasTeor[4] = exTeor5;

        // Se guarda el array que contiene todas las notas de los exámenes de Teoría en el Local Storage.

    localStorage.setItem("Teoria",JSON.stringify(notasTeor));

    // Se recuperan los datos de las notas de TEORÍA desde el Local Storage para posterior utilización.

    const backNotasTeor = localStorage.getItem("Teoria");
    teorNotas = JSON.stringify(backNotasTeor);

               // Se calcula la nota promedio de los exámenes de INSTRUMENTO

    notaFinalTeor = (exTeor1 + exTeor2 + exTeor3 + exTeor4 + exTeor5) / 5;

        // Se declaran las variables globales necesarias para la función DevolverPromedioMateria.

    pTeor = "";
    teorPlace = "";

    // Se da al usuario la devolución del promedio de las notas ingresadas en la asignatura en cuestión.

    DevolPromedioMateria(pTeor,teorPlace,notaFinalTeor,"botonTeorAqui","Teoria");

        // Utilizando la FUNCION aprobadoReprobadoTeor se le confirma al usuario si aprobó en la materia Teoria.

    aprobadoReprobado("Teoria",notaFinalTeor,"aprobAquiTeor");

                             //Reseteamos el form al mandar los datos
    formTeor.reset();
    }
})

                    // Se crean las variables para las notas de los examenes de Armonia.

let exArm1;
let exArm2;
let exArm3;
let exArm4;

let notasArm = [];  // Se declara el array que luego contendrá las notas de los exámenes de ARMONIA
let notaFinalArm =""; // Se declara la variable que tendrá la nota promedio de los exámenes de INSTRUMENTO
let armNotas;

                // Se evita el comportamiento "default" del formulario de Armonia


formArm.addEventListener("submit", (e)=>{
    e.preventDefault();

    // Se asignan a las variables de los exámenes de ARMONIA los valores que ingresará el usuario

    exArm1 = document.getElementById("armonia1").value;
    exArm2 = document.getElementById("armonia2").value;
    exArm3 = document.getElementById("armonia3").value;
    exArm4 = document.getElementById("armonia4").value;

            // Se validan los datos para el formulario de ingreso de las notas de ARMONÍA.

    if(exArm1 < 0 || exArm1 > 10 || exArm2 < 0 || exArm2 > 10 || exArm3 < 0 || exArm3 > 10 || exArm4 < 0 || exArm4 > 10) {
        swal.fire("Debes ingresar numeros entre 0 y 10");
    }

    else if(exArm1 == "" || exArm2 == "" || exArm3 == "" || exArm4 == "") {
        swal.fire("Debes rellenar todos los campos");
    }

    else if(isNaN(exArm1) || isNaN(exArm2) || isNaN(exArm3) || isNaN(exArm4)) {
        swal.fire("No puedes ingresar texto en estos campos, solo numeros");
    }

    else {               // Se convierte la data ingresada de "string" a "number"

    exArm1 = parseFloat(exArm1);
    exArm2 = parseFloat(exArm2);
    exArm3 = parseFloat(exArm3);
    exArm4 = parseFloat(exArm4);

                // Se ingresan las notas de ARMONÍA en su correspondiente array (notasArm)

    notasArm[0] = exArm1;
    notasArm[1] = exArm2;
    notasArm[2] = exArm3;
    notasArm[3] = exArm4;

    // Se guarda el array que contiene todas las notas de los exámenes de Armonía en el Local Storage

    localStorage.setItem("Armonia",JSON.stringify(notasArm));

    // Se recuperan los datos de las notas de ARMONÍA desde el Local Storage para posterior utilización.

    const backNotasArm = localStorage.getItem("Armonia");
    armNotas = JSON.stringify(backNotasArm);

                 // Se calcula la nota promedio de los exámenes de ARMONÍA

    notaFinalArm = (exArm1 + exArm2 + exArm3 + exArm4) / 4;

        // Se declaran las variables globales necesarias para la función DevolverPromedioMateria.

    pArm = "";
    armPlace = "";

    // Se da al usuario la devolución del promedio de las notas ingresadas en la asignatura en cuestión.

    DevolPromedioMateria(pArm,armPlace,notaFinalArm,"botonArmAqui","Armonia");

    // Utilizando la FUNCION aprobadoReprobadoArm se le confirma al usuario si aprobó en la materia Armonia.

    aprobadoReprobado("Armonia",notaFinalArm,"aprobAquiArm");

                            //  Reseteamos el form al mandar los datos
    formArm.reset();
    }
})

                // Se crean las variables para las notas de los examenes de Ensamble.

let exEns1;
let exEns2;
let exEns3;

let notasEns = [];  // Se declara el array que luego contendrá las notas de los exámenes de ENSAMBLE
let notaFinalEns =""; // Se declara la variable que tendrá la nota promedio de los exámenes de ENSAMBLE
let ensNotas;

                // Se evita el comportamiento "default" del formulario de Ensamble.

formEns.addEventListener("submit", (e)=>{
    e.preventDefault();

    // Se asignan a las variables de los exámenes de ENSAMBLE los valores que ingresará el usuario

    exEns1 = document.getElementById("ensamble1").value;
    exEns2 = document.getElementById("ensamble2").value;
    exEns3 = document.getElementById("ensamble3").value;

            // Se validan los datos para el formulario de ingreso de las notas de ENSAMBLE

    if(exEns1 < 0 || exEns1 > 10 || exEns2 < 0 || exEns2 > 10 || exEns3 < 0 || exEns3 > 10) {
        swal.fire("Debes ingresar numeros entre 0 y 10");
    }

    else if(exEns1 == "" || exEns2 == "" || exEns3 == "") {
        swal.fire("Debes rellenar todos los campos");
    }

    else if(isNaN(exEns1) || isNaN(exEns2) || isNaN(exEns3)) {
        swal.fire("No puedes ingresar texto en estos campos, solo numeros");
    }

    else {             // Se convierte la data ingresada de "string" a "number"

    exEns1 = parseFloat(exEns1);
    exEns2 = parseFloat(exEns2);
    exEns3 = parseFloat(exEns3);

            // Se ingresan las notas de ENSAMBLE en su correspondiente array (notasEns)

    notasEns[0] = exEns1;
    notasEns[1] = exEns2;
    notasEns[2] = exEns3;

    // Se guarda el array que contiene todas las notas de los exámenes de Ensamble en el Local Storage

    localStorage.setItem("Ensamble",JSON.stringify(notasEns));

    // Se recuperan los datos de las notas de ENSAMBLE desde el Local Storage para posterior utilización.

    const backNotasEns = localStorage.getItem("Ensamble");
    ensNotas = JSON.stringify(backNotasEns);

                    // Se calcula la nota promedio de los exámenes de ENSAMBLE

    notaFinalEns = (exEns1 + exEns2 + exEns3) / 3;

     // Se declaran las variables globales necesarias para la función DevolverPromedioMateria.

    pEns = "";
    ensPlace = "";

    DevolPromedioMateria(pEns,ensPlace,notaFinalEns,"botonEnsAqui","Ensamble");

    // Utilizando la FUNCION aprobadoReprobadoEns se le confirma al usuario si aprobó en la materia Ensamble.

    aprobadoReprobado("Ensamble",notaFinalEns,"aprobAquiEns");

                        //  Reseteamos el form al mandar los datos
    formEns.reset();
    }
})

                // Se informa al usuario sobre todos los promedios obtenidos en cada Materia.

const boton = document.getElementById("verPromedios");
boton.addEventListener("click", ()=>{

    let ul = document.createElement('ul');
    ul.textContent = "";
    listadoPromedios.appendChild(ul);

    let li = document.createElement('li');
    li.textContent = "Instrumento: " + notaFinalInst;
    listadoPromedios.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Teoria: " + notaFinalTeor;
    listadoPromedios.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Armonia: " + notaFinalArm;
    listadoPromedios.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Ensamble: " + notaFinalEns;
    listadoPromedios.appendChild(li);
})

    // Se informa al usuario sobre las notas de todos los exámenes ingresados de las 4 materias rendidas.

const botonNotas = document.getElementById("verNotas");
botonNotas.addEventListener("click", ()=> {

    let ul = document.createElement('ul');
    ul.textContent = "";
    listadoNotas.appendChild(ul);

    let li = document.createElement('li');
    li.textContent = "Instrumento: " + instNotas;
    listadoNotas.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Teoria: " + teorNotas;
    listadoNotas.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Armonia: " + armNotas;
    listadoNotas.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Ensamble: " + ensNotas;
    listadoNotas.appendChild(li);
})

                // Se informa al usuario la nota PROMEDIO FINAL de curso obtenida.

const verNotaFinal = document.getElementById("promedioFinal");

verNotaFinal.addEventListener("click", ()=> {

    let promedioNotaFinal = (notaFinalInst + notaFinalTeor + notaFinalArm + notaFinalEns) / 4;

    textoFinal = document.createElement('p');
    textoFinal.innerHTML ="Tu nota promedio final de curso es: " + promedioNotaFinal.toFixed(2);
    despedidaPlace = document.getElementById(`despedir`);
    despedir.appendChild(textoFinal);

// Se informa al usuario si aprobó el curso o si debe rendir nuevamente alguna o algunas de las asignaturas

    if(promedioNotaFinal >= 6) {
        setTimeout(()=> {  // Se utiliza asincronismo con setTimeOut
            Swal.fire ({
                text: "Tu nota promedio final es igual o mayor que 6, aprobaste el curso!",
                icon: "info",
                confirmButtonText: "Aceptar",
                background: "orange"
            })
            }, 2000)
    }
    else if(promedioNotaFinal < 6) {
        setTimeout(()=> {  // Se utiliza asincronismo con setTimeOut
            Swal.fire ({
                text: "Tu nota promedio final es menor que 6 por lo tanto debes rendir nuevamente las materias desaprobadas",
                icon: "info",
                confirmButtonText: "Aceptar",
                background: "orange"
            })
            }, 2000)
    }
})

    /* Para efectivizar la utilización del FETCH, se da la opción de verificar los nombres de los supuestos
    docentes y revisores */

const ulRevisores = document.getElementById("revisores");
const botonRevisores = document.getElementById("botRev");

botonRevisores.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {
        return res.json();
    })
    .then(data => {
    data.forEach(user => {
        const nombre = `<li>${user.name}</li>`;
        document.querySelector(`#revisores`).insertAdjacentHTML(`beforeEnd`, nombre);
    });
})
.catch(error => console.log(error));
})


