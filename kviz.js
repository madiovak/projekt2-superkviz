
let otazky = [
    {
        cislo: "Otázka 1",
        otazka: "Která hora je symbolem oblasti Zell am see - Kaprun?",
        foto: "foto/01_kitzsteinhorn.jpg",
        varianty: ["Maiskogel", "Schmittenhöhe", "Kitzsteinhorn"],
        spravnaOdpoved: 2
    },
    {
        cislo: "Otázka 2",
        otazka: "Údajně nejkrásnější a nejnavštěvovanější místo v Rakousku. Jeho repliku si dokonce vytvořili v Číně. Řeč je o :",
        foto: "foto/02_hallstatt.jpg",
        varianty: ["Tuxu", "Hallstattu", "Alpbachu"],
        spravnaOdpoved: 1
    },
]



zobrazOtazku(0);
let zvoleneVarianty = [];

function zobrazOtazku(cisloOtazky) {
    let kviz = document.createElement("div");
    kviz.classList.add("kviz");
    kviz.id = "kviz";
    document.querySelector("body").appendChild(kviz);


    let poradi = document.createElement("div");
    poradi.id = "poradi";
    kviz.appendChild(poradi);
    poradi.textContent = otazky[cisloOtazky].cislo + " / " + otazky.length;

    let otazkaDiv = document.createElement("div");
    otazkaDiv.id = "otazka";
    poradi.appendChild(otazkaDiv);
    otazkaDiv.textContent = otazky[cisloOtazky].otazka;

    let obsah = document.createElement("div");
    obsah.className = "obsah";
    kviz.appendChild(obsah);


    let obrazek = document.createElement("img");
    obrazek.id = "obrazek";
    obrazek.className = "foto";
    obsah.appendChild(obrazek);
    obrazek.src = otazky[cisloOtazky].foto;


    let moznosti = document.createElement("div");
    moznosti.id = "moznosti";
    obsah.appendChild(moznosti);

    let odpovedi = document.createElement("ul");
    odpovedi.id = "odpovedi";
    moznosti.appendChild(odpovedi);



    for (let i = 0; i < otazky[cisloOtazky].varianty.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = otazky[cisloOtazky].varianty[i];
        li.id = "odpovedi";
        odpovedi.appendChild(li);

        li.onclick = function () { priKliknuti(i, ++cisloOtazky) };

    }

}



function priKliknuti(index, cisloOtazky) {
    // Zjistit na co se kliklo

    // Uložit zvolenou variantu

    zvoleneVarianty.push(index);

    // Vygenerovat další otázku nebo vyhodnocení
    let kviz = document.querySelector("#kviz");
    document.querySelector("body").removeChild(kviz);

    if (cisloOtazky < otazky.length) {
        zobrazOtazku(cisloOtazky);
    } else {
        console.log("hodnoceni");
        let kviz = document.createElement("div");
        kviz.classList.add("kviz");
        kviz.id = "kviz";
        document.querySelector("body").appendChild(kviz);



        let nadpis = document.createElement("h2");
        nadpis.id = "poradi";
        kviz.appendChild(nadpis);
        nadpis.innerHTML = "Tvoje hodnocení";

        let pocetSpravnych = 0;





        for (let j = 0; j < otazky.length; j++) {



            let otazkaDiv = document.createElement("div");
            otazkaDiv.id = "odpovedi";
            kviz.appendChild(otazkaDiv);
            let dotaz = document.createElement("h3");
            otazkaDiv.appendChild(dotaz);
            dotaz.innerHTML = (j + 1) + ". " + otazky[j].otazka;

            let vyhodnoceni = document.createElement("p");
            otazkaDiv.appendChild(vyhodnoceni);
            let y = otazky[j].varianty[zvoleneVarianty[j]];
            vyhodnoceni.innerHTML = "Tvoje odpověď je: " + y;

            let spravnost = document.createElement("p");
            otazkaDiv.appendChild(spravnost);


            if (otazky[j].spravnaOdpoved == zvoleneVarianty[j]) {
                spravnost.innerHTML = "To je SPRÁVNĚ."
                pocetSpravnych++;
            } else {
                let x = otazky[j].spravnaOdpoved;
                spravnost.innerHTML = "Správná odpověď je: " + otazky[j].varianty[x];
            }


        }

        let vysledek = document.createElement("h2");
        vysledek.id = "poradi";
        kviz.appendChild(vysledek);


        let uspesnost = (pocetSpravnych / otazky.length) * 100;
        vysledek.innerHTML = "Správně " + pocetSpravnych + " ze " + otazky.length + " otázek. Úspěšnost " + uspesnost + "%.";


    }




}



