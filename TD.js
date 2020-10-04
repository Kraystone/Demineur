var scanf = require('scanf');


/*
    flag ok
    clic manque recurcive 0
    win ok
    mort ok
 */

class Personne {
    constructor() {
        this.enVie = true;
    }

}

class Cellule {
    constructor() {
        this.visible = false;
        this.flag = false;
    }
}

class Mine extends Cellule {
    constructor() {
        super();
        this.mine = 'M';
    }
}

class Nombre extends Cellule {
    constructor(value) {
        super();
        this.value = value;
    }
}

class Demineur {
    constructor() {
        this.grid = [
            [0, 1, 1, 1, 0],
            [0, 2, 'M', 2, 0],
            [0, 2, 'M', 2, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ];

        this.counter_mine = 0;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.grid[y][x] === 'M') {
                    this.grid[y][x] = new Mine();
                    this.counter_mine++;
                } else {
                    this.grid[y][x] = new Nombre(this.grid[y][x]);
                }
            }
        }
    }

    display() {
        let chaine = "";
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (!this.grid[y][x].visible) {
                    if (this.grid[y][x].flag) {
                        chaine += '►';
                    } else {
                        chaine += '■';
                    }
                } else {
                    if (this.grid[y][x] instanceof Mine) {
                        chaine += 'M';
                    } else if (this.grid[y][x] instanceof Nombre) {
                        chaine += this.grid[y][x].value;
                    }
                }
                chaine += ' ';
            }
            chaine += `\n`;
        }
        console.log(chaine);
    }

    flag(y, x) {
        if (this.grid[y][x] instanceof Cellule && this.grid[y][x].visible === false) {
            this.grid[y][x].flag = true;
        } else {
            console.log("Cette case n'a pas été flag.");
        }
        if (this.grid[y][x].visible === true) {
            console.log("Cette case a déja été flag.");
        }
        if (this.grid[y][x] instanceof Mine) {
            console.log('\nLa mine situé en X=' + x + ' et en Y=' + y + ' a été flag.');
            this.counter_mine = this.counter_mine - 1;
        }
    }

    clic(y, x, joueur) {
        if (this.grid[y][x] instanceof Mine) {
            joueur = joueur.enVie = false;
            console.log("Vous avez cliqué sur une mine, c'est perdue.");
            game();
        } else if (this.grid[y][x] instanceof Nombre) {
            this.grid[y][x].visible = true;
            console.log("Clic sur un nombre.");
            if (this.grid[y][x].value === 0) {
                console.log("clic sur 0. v1");
                for (x; x - 1 < x + 1; x++) {
                    for (y; y - 1 < y + 1; y++) {
                        if (this.grid[y][x].value === 0) {
                            console.log("clic sur 0. v2");
                            //this.clic(y, x);
                        }
                    }
                }
            }
        }
    }
}

function game() {
    let demineur = new Demineur();
    let joueur = new Personne();
    let bool = false;
    while (joueur.enVie === true || bool === false) {
        console.log("DEMINEUR");
        demineur.display();
        console.log("1 pour flag, 2 pour clic.");
        let choix = scanf('%d');
        console.log("Quel est le Y ? 0 ou 4")
        let y = scanf('%d');
        console.log("Vous avez rentrez Y=" + y + ", il reste la position en X ? 0 ou 4")
        let x = scanf('%d');
        console.clear()
        switch (choix) {
            case choix = 1:
                demineur.flag(y, x);
                break;
            case choix = 2:
                demineur.clic(y, x, joueur);
                break;
        }
        if (joueur.enVie !== false) {
            console.log("Tour suivant.");
        }

        //parcours la grille pour verifier la victoire
        for (x = 0; x < 5; x++) {
            for (y = 0; y < 5; y++) {
                if (demineur.grid[y][x] instanceof Nombre) {
                    if (bool === true) {
                        if (demineur.grid[y][x].visible === true) {
                            bool = true;
                        } else {
                            bool = false;
                        }
                    }
                }
            }
        }
        if (bool === true || demineur.counter_mine === 0) {
            console.clear();
            console.log("Vous avez gagnez !")
            return 1;
        }
    }
    if (joueur.enVie === false) {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                demineur.grid[y][x].visible = false;
            }
        }
    }
    delete joueur.enVie;
    return 0;
}

if (!game()) {
    console.log("Nouvelle partie !");
    game();
}