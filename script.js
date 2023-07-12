var jet = document.getElementById("jet");  // Récupère l'élément avec l'ID "jet"
var board = document.getElementById("board");  // Récupère l'élément avec l'ID "board"
var score = 0;  // Initialise la variable de score à 0

// Scoreboard
score += 0;  // Incrémente le score de 0 (inutile)
document.getElementById("points").innerHTML = score;  // Affiche le score dans l'élément avec l'ID "points"

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));  // Récupère la position "left" de l'élément "jet" et la convertit en entier

  if (e.key == "ArrowLeft" && left > 0) {  // Si la touche enfoncée est la flèche gauche et la position "left" du "jet" est supérieure à 0
    jet.style.left = left - 10 + "px";  // Déplace le "jet" de 10 pixels vers la gauche
  }
  // 460  =>  largeur du "board" - largeur du "jet"
  else if (e.key == "ArrowRight" && left <= 460) {  // Sinon, si la touche enfoncée est la flèche droite et la position "left" du "jet" est inférieure ou égale à 460
    jet.style.left = left + 10 + "px";  // Déplace le "jet" de 10 pixels vers la droite
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {  // Si la touche enfoncée est la flèche haut ou la barre d'espace
    var bullet = document.createElement("div");  // Crée un nouvel élément de type "div" pour représenter le projectile
    bullet.classList.add("bullets");  // Ajoute la classe "bullets" à l'élément du projectile
    board.appendChild(bullet);  // Ajoute le projectile à l'élément "board"

    var movebullet = setInterval(() => {  // Définit une fonction à exécuter périodiquement pour déplacer le projectile
      var rocks = document.getElementsByClassName("rocks");  // Récupère tous les éléments avec la classe "rocks" (représentant les obstacles)

      for (var i = 0; i < rocks.length; i++) {  // Parcourt tous les obstacles
        var rock = rocks[i];  // Récupère un obstacle
        if (rock != undefined) {  // Si l'obstacle existe
          var rockbound = rock.getBoundingClientRect();  // Récupère les coordonnées de la zone de l'obstacle
          var bulletbound = bullet.getBoundingClientRect();  // Récupère les coordonnées de la zone du projectile

          // Condition pour vérifier si l'obstacle et le projectile sont à la même position
          // Si c'est le cas, on doit détruire cet obstacle et supprimer le projectile
          var collisionOffset = 10;  // Valeur de décalage pour augmenter la zone de collision

          if (
            bulletbound.left + collisionOffset >= rockbound.left &&
            bulletbound.right - collisionOffset <= rockbound.right &&
            bulletbound.top - collisionOffset <= rockbound.top &&
            bulletbound.bottom + collisionOffset >= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock);  // Supprime l'obstacle
            bullet.parentElement.removeChild(bullet);  // Supprime le projectile
            // Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;  // Incrémente le score affiché de 1
            clearInterval(movebullet);  // Arrête le mouvement du projectile
            return;  // Quitte la fonction
          }
        }
      }

      var bulletbottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));  // Récupère la position "bottom" du projectile et la convertit en entier

      // Empêche le projectile de sortir du "gamebox"
      if (bulletbottom >= 500) {  // Si la position "bottom" du projectile est supérieure ou égale à 500
        clearInterval(movebullet);  // Arrête le mouvement du projectile
        bullet.parentElement.removeChild(bullet);  // Supprime le projectile s'il sort du "gamebox"
      }

      bullet.style.left = left + "px";  // Place le projectile au-dessus du "jet"
      bullet.style.bottom = bulletbottom + 3 + "px";  // Déplace le projectile de 3 pixels vers le haut
    });
  }
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");  // Crée un nouvel élément de type "div" pour représenter un obstacle
  rock.classList.add("rocks");  // Ajoute la classe "rocks" à l'élément d'obstacle
  // Obtient la valeur "left" de l'obstacle pour le placer à une position aléatoire
  var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
  // Génère une valeur entre 0 et 450 où 450 => largeur du "board" - largeur de l'obstacle
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);  // Ajoute l'obstacle au "board"
}, 1000);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");  // Récupère tous les éléments avec la classe "rocks"

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {  // Parcourt tous les obstacles
      var rock = rocks[i];  // Récupère un obstacle
      var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));  // Récupère la position "top" de l'obstacle et la convertit en entier
      // 475 => hauteur du "board" - hauteur de l'obstacle + 25
      if (rocktop >= 475) {  // Si la position "top" de l'obstacle est supérieure ou égale à 475
        alert("Game Over");  // Affiche une alerte avec le message "Game Over"
        clearInterval(moverocks);  // Arrête le mouvement des obstacles
        window.location.reload();  // Recharge la page
      }

      rock.style.top = rocktop + 25 + "px";  // Déplace l'obstacle de 25 pixels vers le bas
    }
  }
}, 600);

