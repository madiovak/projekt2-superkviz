
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
    {
        cislo: "Otázka 3",
        otazka: "Se svými 85 metry na šířku je nejširším vodopádem ve Východních Alpách. Řeč je o :",
        foto: "foto/03_grawa.jpg",
        varianty: ["Grawa Wasserfall", "Gollinger Wasserfall", "Eifersbacher Wasserfall"],
        spravnaOdpoved: 0
    },
    {
        cislo: "Otázka 4",
        otazka: "Z Trisselwandu uvidíš jezera :",
        foto: "foto/04_trisselwand.jpg",
        varianty: ["Altausseer See a Toplitzsee", "Altausseer See a Grundlsee", "Grundlsee a Toplitzsee"],
        spravnaOdpoved: 1
    },
    {
        cislo: "Otázka 5",
        otazka: "Rakouské ledovce se za rok zmenší přibližně o :",
        foto: "foto/05_hintertux.jpg",
        varianty: ["10 m", "25 m", "50 m"],
        spravnaOdpoved: 2
    },
    {
        cislo: "Otázka 6",
        otazka: "Pokud chcete nejtypičtější fotku z Zillertalských Alp musí vyrazit na:",
        foto: "foto/06_olpererhutte.jpg",
        varianty: ["Olpererhütte", "Ahornspitze", "Wasserfallweg Hintertux"],
        spravnaOdpoved: 0
    },
    {
        cislo: "Otázka 7",
        otazka: "Na nejvyšší vodopády v Rakousku budete muset do: ",
        foto: "foto/07_krimml.jpg",
        varianty: ["Hinterglemmu", "Zell am See", "Krimmlu"],
        spravnaOdpoved: 2
    },
    {
        cislo: " Otázka 8",
        otazka: "Alpenzoo najdete v ",
        foto: "foto/08_alpenzoo.jpg",
        varianty: ["Salzburgu", "Innsbrucku", "Kitzbuhelu"],
        spravnaOdpoved: 1
    },
    {
        cislo: "Otázka 9",
        otazka: "Úplně nejlepší relax si užijete na lodi na :",
        foto: "foto/09_zellersee.jpg",
        varianty: ["Mondsee", "Achensee", "Zeller See"],
        spravnaOdpoved: 2
    },
    {
        cislo: "Otázka 10",
        otazka: "Cestou do Alp nebo z Alp se nezapomeňtě stavit na skvělou zmzlinu v :",
        foto: "foto/10_eisfee.jpg",
        varianty: ["Mondsee", "Salzburgu", "Saalbachu"],
        spravnaOdpoved: 0
    }
]



zobrazOtazku(0);
let zvoleneVarianty = [];

function vytvorElement(konfigurace) {
    let element = document.createElement(konfigurace.typ);

    if (konfigurace.id != undefined) {
        element.id = konfigurace.id;
    }

    if (konfigurace.trida != undefined) {
        element.classList.add(konfigurace.trida);
    }

    if (konfigurace.text != undefined) {
        element.textContent = konfigurace.text;
    }

    if (konfigurace.src != undefined) {
        element.src = konfigurace.src;
    }

    if (konfigurace.innerHTML != undefined) {
        element.innerHTML = konfigurace.innerHTML;
    }

    return element;
}

function zobrazOtazku(cisloOtazky) {
    let kviz = vytvorElement({
        typ: "div",
        id: "kviz",
        trida: "kviz"
    });
    document.querySelector("body").appendChild(kviz);

    let poradi = vytvorElement({
        typ: "div",
        id: "poradi",
        text: otazky[cisloOtazky].cislo + " / " + otazky.length
    });
    kviz.appendChild(poradi);

    let otazkaDiv = vytvorElement({
        typ: "div",
        id: "otazka",
        text: otazky[cisloOtazky].otazka
    })
    poradi.appendChild(otazkaDiv);

    let obsah = vytvorElement({
        typ: "div",
        trida: "obsah"
    })
    kviz.appendChild(obsah);

    let obrazek = vytvorElement({
        typ: "img",
        id: "obrazek",
        trida: "foto",
        src: otazky[cisloOtazky].foto
    })
    obsah.appendChild(obrazek);

    let moznosti = vytvorElement({
        typ: "div",
        id: "moznosti"
    })
    obsah.appendChild(moznosti);

    let odpovedi = vytvorElement({
        typ: "ul",
        id: "odpovedi"
    })
    moznosti.appendChild(odpovedi);

    for (let i = 0; i < otazky[cisloOtazky].varianty.length; i++) {
        let li = vytvorElement({
            typ: "li",
            id: "odpovedi",
            innerHTML: otazky[cisloOtazky].varianty[i]
        })
        odpovedi.appendChild(li);

        li.onclick = function () { priKliknuti(i, ++cisloOtazky) };

    }
}


function priKliknuti(index, cisloOtazky) {
    // Uložit zvolenou variantu
    zvoleneVarianty.push(index);

    // Vygenerovat další otázku nebo vyhodnocení
    let kviz = document.querySelector("#kviz");
    document.querySelector("body").removeChild(kviz);

    if (cisloOtazky < otazky.length) {
        zobrazOtazku(cisloOtazky);
    } else {
        let kviz = vytvorElement({
            typ: "div",
            id: "kviz",
            trida: "kviz"
        })
        document.querySelector("body").appendChild(kviz);

        let nadpis = vytvorElement({
            typ: "h2",
            id: "poradi",
            innerHTML: "Tvoje hodnocení"
        })
        kviz.appendChild(nadpis);

        let pocetSpravnych = 0;

        for (let j = 0; j < otazky.length; j++) {
            let konkretniOtazka = otazky[j];
            let otazkaDiv = vytvorElement({
                typ: "div",
                id: "odpovedi",
            })
            kviz.appendChild(otazkaDiv);

            let dotaz = vytvorElement({
                typ: "h3",
                innerHTML: (j + 1) + ". " + konkretniOtazka.otazka
            })
            otazkaDiv.appendChild(dotaz);

            let vyhodnoceni = vytvorElement({
                typ: "p",
                innerHTML: "Tvoje odpověď je: " + konkretniOtazka.varianty[zvoleneVarianty[j]]
            })
            otazkaDiv.appendChild(vyhodnoceni);

            let spravnostObsah;
            if (konkretniOtazka.spravnaOdpoved == zvoleneVarianty[j]) {
                spravnostObsah = "To je SPRÁVNĚ."
                pocetSpravnych++;
            } else {
                spravnostObsah = "Správná odpověď je: " + konkretniOtazka.varianty[otazky[j].spravnaOdpoved];
            }

            let spravnost = vytvorElement({
                typ: "p",
                innerHTML: spravnostObsah
            })
            otazkaDiv.appendChild(spravnost);


        }

        let uspesnost = (pocetSpravnych / otazky.length) * 100;
        let vysledek = vytvorElement({
            typ: "h2",
            id: "poradi",
            innerHTML: "Správně " + pocetSpravnych + " ze " + otazky.length + " otázek. Úspěšnost " + uspesnost + "%."
        })

        kviz.appendChild(vysledek);
    }
}



