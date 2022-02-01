//Récupération des données contenues dans le fichier .JSON
fetch('analogies.json').then(function (response) {
    response.json().then(function (data) {
        function ajouteanal(data) {
            var indx = 0
            data.forEach(function (f) { //Création des analogies dans le fichier .HTML
                var blocAnal = document.createElement("li");
                blocAnal.innerHTML = '<div class="if" >' +
                    '<h1 class="title">' +
                    'Si j’étais ' + f.analogie + ', je serais...' +
                    '</h1>' +
                    '<p class="bttn"><a class="dscvr" alt="Cliquer pour faire défiler la page vers le bas" href="#' + indx + '">Découvrir</a></p>' +
                    '</div>' +
                    '<div class="be" id="' + indx + '" >' +
                    '<h1 class="val">' +
                    f.valeur +
                    '</h1>' +
                    f.url +
                    '<div class="txt">' + f.txt + '</div>' +
                    '<img class="arrow" src="img/arrow.png" alt="Cliquer pour faire défiler la page vers le bas">' +
                    '</div>'
                document.querySelector("ul").append(blocAnal);
                indx = indx + 1
                document.querySelectorAll(".arrow").forEach(function (arrow) {
                    arrow.addEventListener('click', function (e) {
                        window.scrollBy({
                            top: 900,
                            behavior: 'smooth'
                        });
                    })
                })
            });
        }
        ajouteanal(data)

    })
});


document.addEventListener("DOMContentLoaded", function () { //Appel du DOM pour envoyer des requêtes
    document.querySelector(".fil").addEventListener('click', function (e) { //Scroll de la page après avoir cliqué sur 'link.png'
        document.querySelector(".fil").src = "img/link1.png";
        document.getElementById('scroll').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
    var form = document.getElementById("form");
    var indx = 7
    document.querySelector(".valide").addEventListener("click", function () { //Envoi du formulaire à l'API et création de la nouvelle analogie
        var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=gambette&courriel=" + document.querySelector('[id="url"]').value + "&message=Si j'étais ... " + document.querySelector('[id="thm"]').value + " je serais ... " + document.querySelector('[id="ana"]').value + "parce que ... " + document.querySelector('[id="mark"]').value;
        fetch(urlVisitee).then(function (response) {
            response.json().then(function (data) {
                console.log("Réponse reçue : ")
                console.log(data);
                if (data.status == "success") {
                    console.log("Votre message a bien été reçu");
                } else {
                    console.log("Problème : votre message n'a pas été reçu");
                }
            })
        })
        var blocAnal = document.createElement("li");
        blocAnal.innerHTML = '<div class="if">' +
            '<h1 class="title">' +
            'Si j’étais ' + document.querySelector('[id="thm"]').value + ', je serais...' +
            '</h1>' +
            '<p class="bttn"><a class="dscvr" href="#' + indx + '">Découvrir</a></p>' +
            '</div>' +
            '<div class="be" id="' + indx + '" >' +
            '<h1 class="val">' +
            document.querySelector('[id="ana"]').value +
            '</h1>' +
            '<img class="illu" src="' + document.querySelector('[id="url"]').value + '" alt="' + document.querySelector('[id="ana"]').value + '">' +
            '<span class="txt">' + document.querySelector('[id="mark"]').value + '</span>' +
            '<img class="arrow2" src="img/arrow2.png" alt="Cliquer pour faire défiler la page vers le haut">' +
            '</div>'
        document.querySelector("footer").style.display = "none";
        document.querySelector("ul").append(blocAnal);
        indx = indx + 1
        document.querySelectorAll(".arrow2").forEach(function (arrow) {
            arrow.addEventListener('click', function (e) {
                document.querySelector(".fil").src = "img/link.png";
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })
        })
    });
})

window.onbeforeunload = function () { //Réinitialisation de la page au rechargement
    window.scrollTo(0, 0);
}

function openCrdt() { //Ferme les crédits
    document.getElementById("mycrdt").style.display = "block";
}

function closeCrdt() { //Ouvre les crédits
    document.getElementById("mycrdt").style.display = "none";
}