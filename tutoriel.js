var bouton

class Tutoriel extends Phaser.Scene{

    constructor(){
        super("scenetutoriel");
    }
    init(data){
    }


    preload(){
        this.load.image('tuto', 'assets/tuto.png');
        this.load.spritesheet('retour', 'assets/retour.png', { frameWidth: 125, frameHeight: 125 });
    }

    create(){
        this.add.image(448, 224, 'tuto')

        this.anims.create({
            key: 'retour',
            frames: [ { key: 'retour', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'retourglow',
            frames: [ { key: 'retour', frame: 2} ],
            framerate : 10
        });

        bouton = this.add.sprite(830,390,'retour').setInteractive({ cursor: 'pointer' })
    }

    update(){
        bouton.on('pointerover', function (event) {

            bouton.anims.play('retour',true);

        });

        bouton.on('pointerout', function (event) {

            bouton.anims.play('retourglow',true);

        });

        bouton.on('pointerdown', function(){

            this.scene.start("scenemenu");

        }, this);
    }
}