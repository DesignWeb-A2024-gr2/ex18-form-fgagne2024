const monForm = document.getElementById("password");
const carac = document.querySelector(".validation-longueur");
const icoCarac = document.querySelector(".validation-longueur i");
const Verifmaj = document.querySelector(".validation-majuscule");
const icoMaj = document.querySelector(".validation-majuscule i");
const speciaux = document.querySelector(".validation-caractere");
const icoSpe = document.querySelector(".validation-caractere i");
const confirme  =document.getElementById("confirm-password");
const invalide = document.querySelector(".invalide");

const force = document.querySelector(".password-meter-unit");
const force2 = document.getElementsByClassName("password-meter-unit");


const image = document.querySelector("section img");

const caractereSpecial_regex = /[!@#$%^&*(),.?":{}|<>]/;


monForm.addEventListener("input",ValidationPassWord);
confirme.addEventListener("input",Confirme);

function ValidationPassWord(){
    
    nbCarac();
    MaJMin();
    CaracSpeciaux();
    Force();
}

function Force(){
    const resultatForce = zxcvbn(monForm.value);
    let niveau = resultatForce.score;

    for(let j=4;j>0;j--){
        force2[j].style.background = "white";
    }

    for(let i=niveau;i>=0;i--)
    {
        if(niveau<2){

            force2[i].style.background = "red";
            image.src = "img/1.jpg";
        }
        else if (niveau==2)
        {
            force2[i].style.background = "yellow";
    
            image.src = "img/2.jpg";
        }
        else{
            force2[i].style.background = "green";
    
            image.src = "img/3.jpg";
    
        }

    }


}


function nbCarac(){
    if(monForm.value.length>=8)
    {
        
        carac.style.color = "green";

        icoCarac.classList.add("fa-check");
        icoCarac.classList.remove("fa-ban")
        
        return true;
        
        
    }
    else{
        icoCarac.classList.remove("fa-check");
        icoCarac.classList.add("fa-ban");
        carac.style.color = "red";
        return false;
    }

}

function MaJMin(){
    let maj = /[A-Z]/.test(monForm.value);
    let min = /[a-z]/.test(monForm.value);

    if (maj && min)
    {
        Verifmaj.style.color = "green";
        icoMaj.classList.add("fa-check");
        icoMaj.classList.remove("fa-ban");
        return true;
    }
    else{

        Verifmaj.style.color = "red";
        icoMaj.classList.add("fa-ban");
        icoMaj.classList.remove("fa-check");
        return false;
    }
}

function CaracSpeciaux(){
    if(caractereSpecial_regex.test(monForm.value)){

        speciaux.style.color = "green";
        icoSpe.classList.add("fa-check");
        icoSpe.classList.remove("fa-ban");
        return true;
    }
    else{
        speciaux.style.color = "red";
        icoSpe.classList.add("fa-ban");
        icoSpe.classList.remove("fa-check");
        return false;
    }
}

function Confirme(){
    if (monForm.value==confirme.value){
        invalide.style.display = "none";
        return true;
    }
    else{
        invalide.style.display = "flex";
        return false;
    }
}

function ValideSubmit(){
    let formValide = false;

    if(MaJMin()&&nbCarac()&&CaracSpeciaux()&&Confirme())
    {
        formValide = true;
    }

    return formValide;
}