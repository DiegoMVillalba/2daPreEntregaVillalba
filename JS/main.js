const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("email");
const celular = document.getElementById("celular");
const password = document.getElementById("password");
const password2 = document.getElementById("repeatPassword");
const terminosYCondiciones = document.getElementById("termsAndConditions");
const form = document.getElementById("form");
const listInputs = document.querySelectorAll(".form-input");
//FUNCION DE "REGISTRATE"
function registrarse(registro){
    if(registro == "registra2" ){
    document.querySelector("#logIn").style.display="none";
    document.querySelector("#registra2").style.display="block";
}   else if (registro == "logIn") {
    document.querySelector("#registra2").style.display="none";
    document.querySelector("#logIn").style.display="block";   
// }   else if (registro == "logIn"){
//     document.querySelector("#logIn").style.display="none";
//     document.querySelecto("#kuma").style.display="block";
};
}

//FUNCION DE INGRESAR
function ingresar(e){
    e.preventDefault();
   
    //DATOS A DEL USUARIO PARA INGRESAR
    const email = document.getElementById("mail").value;
    const password = document.getElementById("contrasenia").value;
    //LOCAL STORAGE 
    const arrayDatos = JSON.parse(localStorage.getItem("arrayUsuarios"));
    let resultadoDatos = arrayDatos.find(personita => personita.correo == email);
    resultadoDatos = arrayDatos.find(personita => personita.password == password);

    let personaDatos;
    if(resultadoDatos != undefined){
        
        document.querySelector("#logIn").style.display="none";
        document.querySelector("#kuma").style.display="block";
    }else{
        personaDatos = `No existe este usuario`;
    }
    
    document.querySelector("#usuarioEncontrado").innerHTML= personaDatos;
}




//EVENTO ONCLICK "REGISTRATE"
document.querySelector("#registrate").addEventListener("click", () => registrarse ("registra2"));
//EVENTO ONCLICK "ATRAS"
document.querySelector("#atras").addEventListener("click", () => registrarse ("logIn") );
//EVENTO ONCLIK "LOGIN"
document.querySelector("#logIn").addEventListener("submit", ingresar );


//ARRAYS
const nuevoUsuarioArr =[];
//FUNCION DE REGISTRO DE NUEVO USUARIO //FUNCION DE PREVENIR ENVIO DEL FORMULARIO Y RECOPILACION DE DATOS
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    //INFORMACION RECUPERADA DEL USUARIO
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("repeatPassword").value;
    //CREAR OBJETO USUARIO
    const persona1 = new Persona(nombre, apellido, correo, celular, password, password2);
    //PUSHEO LOS DATOS AL ARRAY
    nuevoUsuarioArr.push(persona1);
    console.log(nuevoUsuarioArr);
    //LOCAL STORAGE Y JSON
    let condicion = validacionForm();
    console.log(condicion);
    if(condicion == false) {
        
        localStorage.setItem("arrayUsuarios", JSON.stringify(nuevoUsuarioArr));
        enviarFormulario();
    
    swal({
        title: "Bienvenido!",
        text: "Te haz registrado exitosamente!",
        icon: "success",
        button: "OK",
      });
    }else{
        swal({
            title: "Error!",
            text: "No te haz registrado, por favor introduce todos los datos !",
            icon: "error",
            button: "OK",
          });

    }
    
});


function validacionForm() {
    form.lastElementChild.innerHTML = "";
    let condicion = true ;
    listInputs.forEach((element) => {
        element.lastElementChild.innerHMTL = "";
    
    });
    console.log(nombre.value.length, nombre.value.trim());
    (nombre.value.length < 1 || nombre.value.trim()== "" ) ? mostrarMensajeError("nombre", "Nombre no válido") : condicion = false;
    
    (apellido.value.length < 1 || apellido.value.trim()== "" ) ? mostrarMensajeError("apellido", "Apellido no válido") : condicion = false;
    
    (email.value.length < 1 || email.value.trim()== "" ) ? mostrarMensajeError("email", "Email no válido") : condicion = false;
    
    (celular.value.lenght == 10 || celular.value.trim()== "" || isNaN(celular.value)) ? mostrarMensajeError("celular", "Celular no válido") : condicion = false;
        
    (password.value.lenght < 1 || password.value.trim()== "") ? mostrarMensajeError("password", "Password incorrecto") : condicion = false;
        
    (repeatPassword.value != password.value) ? mostrarMensajeError("repeatPassword", "Password incorrecto") : condicion = false;
        
    (termsAndConditions.checked) ? mostrarMensajeError("termsAndConditions", "Aceptó") :  condicion = false;
   
    (termsAndConditions.checked) ? mostrarMensajeError("termsAndConditions", ""): condicion = true;
    
    return condicion;
    }


  
    
    


    function mostrarMensajeError (claseInput, mensaje){
        let elemento = document.querySelector(`.${claseInput}`);
        elemento.lastElementChild.innerHTML = mensaje;
    };

    function enviarFormulario (){
        form.reset();
        form.lastElementChild.innerHTML ="listo!!";
    };