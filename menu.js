var entree
var jouer
var tutoriel
var quitter
var choixcontrole

var controlechoisi = 1

var ingame = false;

class Menu extends Phaser.Scene{
    constructor(){
        super("scenemenu");
    }
    init(data){
    }


    preload(){
        this.load.image('fondmenu', 'assets_alpha/fondmenu.png');
        this.load.spritesheet('jouer', 'assets_alpha/jouer.png', { frameWidth: 250, frameHeight: 110 });
        this.load.spritesheet('tutoriel', 'assets_alpha/tutoriel.png', { frameWidth: 265, frameHeight: 90 });
        this.load.spritesheet('quitter', 'assets_alpha/quitter.png', { frameWidth: 232, frameHeight: 90 });
        this.load.spritesheet('ordi', 'assets_alpha/parametresordi.png', { frameWidth: 154, frameHeight: 154 });
        this.load.spritesheet('portable', 'assets_alpha/portable.png', { frameWidth: 154, frameHeight: 154 });
    }

    create(){
        entree = entree = this.input.keyboard.addKeys('enter');
        this.add.image(448, 224, 'fondmenu')

        jouer = this.add.sprite(565,98,'jouer').setInteractive({ cursor: 'pointer' })
        tutoriel = this.add.sprite(575,238,'tutoriel').setInteractive({ cursor: 'pointer' })
        quitter = this.add.sprite(620,380,'quitter').setInteractive({ cursor: 'pointer' })
        choixcontrole = this.add.sprite(80, 370,'ordi').setInteractive({ cursor: 'pointer' })

        this.anims.create({
            key: 'jouer',
            frames: [ { key: 'jouer', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'jouerglow',
            frames: [ { key: 'jouer', frame: 2} ],
            framerate : 10
        });

        this.anims.create({
            key: 'tutoriel',
            frames: [ { key: 'tutoriel', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'tutorielglow',
            frames: [ { key: 'tutoriel', frame: 2} ],
            framerate : 10
        });

        this.anims.create({
            key: 'quitter',
            frames: [ { key: 'quitter', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'quitterglow',
            frames: [ { key: 'quitter', frame: 2} ],
            framerate : 10
        });

        this.anims.create({
            key: 'portable',
            frames: [ { key: 'portable', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'portableglow',
            frames: [ { key: 'portable', frame: 2} ],
            framerate : 10
        });
        
        this.anims.create({
            key: 'ordi',
            frames: [ { key: 'ordi', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'ordiglow',
            frames: [ { key: 'ordi', frame: 2} ],
            framerate : 10
        });
    }

    update(){

        jouer.on('pointerover', function (event) {

            jouer.anims.play('jouer',true);


        });

        jouer.on('pointerout', function (event) {

            jouer.anims.play('jouerglow',true);

        });

        jouer.on('pointerdown', function(){

            if (ingame == false){
                ingame = true
                this.scene.start("scenelevel");
            }

        }, this);



        tutoriel.on('pointerover', function (event) {

            tutoriel.anims.play('tutoriel',true);


        });

        tutoriel.on('pointerout', function (event) {

            tutoriel.anims.play('tutorielglow',true);

        });

        /*jouer.on('pointerdown', function(){

            this.scene.start("scenelevel");

        }, this);*/



        quitter.on('pointerover', function (event) {

            quitter.anims.play('quitter',true);


        });

        quitter.on('pointerout', function (event) {

            quitter.anims.play('quitterglow',true);

        });

        quitter.on('pointerdown', function(){

            return;

        }, this);




        choixcontrole.on('pointerover', function (event) {

            if (choixcontrole == 1){
                choixcontrole.anims.play('ordi',true);
            }
            else if (choixcontrole == 2){
                choixcontrole.anims.play('portable',true);
            }

        });

        choixcontrole.on('pointerout', function (event) {

            if (choixcontrole == 1){
                choixcontrole.anims.play('ordiglow',true);
            }
            else if (choixcontrole == 2){
                choixcontrole.anims.play('portableglow',true);
            }

        });

        choixcontrole.on('pointerdown', function(){

            if(choixcontrole == 1){
                choixcontrole = 2
            }
            if(choixcontrole == 1){
                choixcontrole = 1
            }

        }, this);

        /*const passer = Phaser.Input.Keyboard.JustDown(entree.enter);
        if (passer){
            this.scene.start("scenelevel")
        }
        this.input.on('pointerdown', function (pointer) {
            if (this.input.manager.activePointer.isDown && cooldownclic == 0){
                this.scene.start("scenelevel")
                cooldownclic = 1
            }  
        }, this);
        */
    }

}