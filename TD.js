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

        this.nbr_mine = 0;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.grid[x][y] === 'M') {
                    this.grid[x][y] = new Mine();
                    this.nbr_mine++;
                } else {
                    this.grid[x][y] = new Nombre(this.grid[x][y]);
                }
            }
        }
    }

    displax() {
        let chaine = "";
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (!this.grid[x][y].visible) {
                    if (this.grid[x][y].flag) {
                        chaine += '►';
                    } else {
                        chaine += '■';
                    }
                } else {
                    if (this.grid[x][y] instanceof Mine) {
                        chaine += 'M';
                    } else if (this.grid[x][y] instanceof Nombre) {
                        chaine += this.grid[x][y].value;
                    }
                }
                chaine += ' ';
            }
            chaine += `\n`;
        }
        console.log(chaine);
    }

    flag(x, y) {
        if (this.grid[x][y] instanceof Cellule && this.grid[x][y].visible === false) {
            this.grid[x][y].flag = true;
        } else {
            console.log("Cette case n'a pas été flag.");
        }
        if (this.grid[x][y].visible === true) {
            console.log("Cette case a déja été flag.");
        }
        if (this.grid[x][y] instanceof Mine) {
            console.log('\nLa mine situé en y=' + y + ' et en x=' + x + ' a été flag.');
            this.nbr_mine = this.nbr_mine - 1;
        }
    }

    clic(x, y, joueur) {
        if (this.grid[x][y] instanceof Nombre && this.grid[x][y].visible === false) {
            this.grid[x][y].visible = true;
            if (this.grid[x][y].value === 0) {
                if (y === 0) {
                    if (x === 0) {
                        console.log("sup gauche");
                        this.clic(x + 1, y);
                        this.clic(x, y + 1);
                        this.clic(x + 1, y + 1);
                    } else if (y === 4) {
                        console.log("sup droit");
                        this.clic(x - 1, y);
                        this.clic(x, y - 1);
                        this.clic(x - 1, y - 1);
                    } else {
                        console.log("bord haut");
                        this.clic(x - 1, y);
                        this.clic(x, y - 1);
                        this.clic(x + 1, y + 1);
                        this.clic(x + 1, y);
                        this.clic(x, y + 1);
                    }
                } else if (x === 4) {
                    if (y === 0) {
                        console.log("inf gauche");
                        this.clic(x, y - 1);
                        this.clic(x + 1, y - 1);
                        this.clic(x - 1, y);
                    } else if (y === 4) {
                        console.log("inf droit");
                        this.clic(x - 1, y);
                        this.clic(x, y - 1);
                        this.clic(x - 1, y - 1);
                    } else {
                        console.log("bord inf");
                        this.clic(x - 1, y);
                        this.clic(x, y - 1);
                        this.clic(x - 1, y - 1);
                        this.clic(x + 1, y);
                        this.clic(x, y + 1);
                    }
                }
            } else {
                if (y === 0) {
                    console.log("gauche inf");
                    this.clic(x - 1, y);
                    this.clic(x, y - 1);
                    this.clic(x - 1, y + 1);
                    this.clic(x + 1, y);
                    this.clic(x, y + 1);
                } else if (y === 4) {
                    console.log("droit inf");
                    this.clic(x - 1, y);
                    this.clic(x, y - 1);
                    this.clic(x - 1, y - 1);
                    this.clic(x - 1, y + 1);
                    this.clic(x, y + 1);
                } else {
                    console.log("milieux");
                    this.clic(x - 1, y);
                    this.clic(x + 1, y);
                    this.clic(x, y - 1);
                    this.clic(x, y + 1);
                    this.clic(x - 1, y - 1);
                    this.clic(x + 1, y + 1);
                    this.clic(x - 1, y + 1);
                    this.clic(x + 1, y - 1);

                }
            }
        } else if (this.grid[x][y] instanceof Mine) {
            joueur = joueur.enVie = false;
            console.log("Vous avez cliqué sur une mine, c'est perdue.\nNouvelle partie.");
            game();
        }
    }
}
function game() {
    let demineur = new Demineur();
    let joueur = new Personne();
    let bool = false;
    while (joueur.enVie === true || bool === false) {
        console.log("DEMINEUR");
        demineur.displax();
        console.log("1 pour flag, 2 pour clic.");
        let choiy = scanf('%d');
        console.log("Quel est le x ? 0 ou 4")
        let x = scanf('%d');
        console.log("Vous avez rentrez x=" + x + ", il reste la position en y ? 0 ou 4")
        let y = scanf('%d');
        console.clear()
        switch (choiy) {
            case choiy = 1:
                demineur.flag(x, y);
                break;
            case choiy = 2:
                demineur.clic(x, y, joueur);
                break;
        }
        if (joueur.enVie !== false) {
            console.log("Tour suivant.");
        }

        //parcours la grille pour verifier la victoire
        for (y = 0; y < 5; y++) {
            for (x = 0; x < 5; x++) {
                if (demineur.grid[x][y] instanceof Nombre) {
                    if (bool === true) {
                        if (demineur.grid[x][y].visible === true) {
                            bool = true;
                        } else {
                            bool = false;
                        }
                    }
                }
            }
        }

        if (bool === true || demineur.nbr_mine === 0) {
            console.clear();
            console.log("Vous avez gagnez !");
            return 1;
        }
    }
    if (joueur.enVie === false) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                demineur.grid[x][y].visible = true;
            }
        }
    }
    delete joueur.enVie;
    return 0;
}

game();