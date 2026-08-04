

const colors = [
    "red",
    "blue",
    "yellow",
    "lime",
    "purple",
    "orange",
    "pink"
];

const confeti=() => {

    // Crear 100 pedazos de confeti
    for (let i = 0; i < 100; i++) {

    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    // Posición horizontal aleatoria
    confetti.style.left =
        Math.random() * 100 + "vw";

    // Color aleatorio
    confetti.style.backgroundColor =
        colors[
        Math.floor(
            Math.random() * colors.length
        )
        ];

    // Tamaño aleatorio
    confetti.style.width =
        Math.random() * 10 + 5 + "px";

    confetti.style.height =
        Math.random() * 15 + 5 + "px";

    // Velocidad aleatoria
    confetti.style.animationDuration =
        Math.random() * 2 + 2 + "s";

    document.body.appendChild(confetti);

    // Eliminar el confeti cuando termine
    setTimeout(() => {
        confetti.remove();
    }, 4000);

    }

};