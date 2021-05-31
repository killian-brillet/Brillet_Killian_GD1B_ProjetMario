var up;
var down;
var left;
var right;

var player;
var onGround;
var gameOver = false;

var ennemiGD;

var ennemiVol;

var tourelle;
var balletourelle;
var timertourelle = 0;
var balleennemi;
var tourelleexist;

var boss;
var bossexist = true;
var timerboss = 0;
var vieboss = 3;
var timerinvuboss = 0;
var invuboss = true;

var laseractif = false;
var timerlaser = 0;

var balleboss;
var balleboss2;
var balleboss3;
var compteurmeca = 1;

var mana;
var potion;
var comptPot = 0;
var boutonpot;
var interPot;

var plateforme;
var bloc;
var timerplateforme = 0;
var plateformeexist = false;

var boutontir;
var balle;
var ballegroupe;
var sensperso;

var timersort = 0;
var etatsort = false;

var vie;
var inv = false;
var timer = 0;

var timerclic = 0;
var cooldown = false;

var afficheVie;
var afficheMana;
var afficheCooldown;

var fond;
var parallax1;
var parallax2;

class Level extends Phaser.Scene{
    constructor(){
        super("scenelevel");
    }
    init(data){
    }

    preload(){

        /*Divers*/
        this.load.image('ciel', 'assets_alpha/ciel.png');
        this.load.image('parallax', 'assets_alpha/parallax1.png');
        this.load.image('parallax2', 'assets_alpha/parallax2.png');
        this.load.image('assetblocs', 'assets_alpha/blocs.png');
        this.load.image('plateforme', 'assets_alpha/plateforme.png');
        this.load.image('balle', 'assets_alpha/balle.png');
        this.load.image('balleennemi', 'assets_alpha/balleennemi.png');
        this.load.image('potion', 'assets_alpha/potion.png');
        this.load.image('rouages', 'assets_alpha/objet.png');

        /*Interface*/
        this.load.image('interface4', 'assets_alpha/interface_4.png');
        this.load.image('interface3', 'assets_alpha/interface_3.png');
        this.load.image('interface2', 'assets_alpha/interface_2.png');
        this.load.image('interface1', 'assets_alpha/interface_1.png');
        this.load.image('interface0', 'assets_alpha/interface_0.png');

        this.load.image('interface2_4', 'assets_alpha/interface_2_4.png');
        this.load.image('interface2_3', 'assets_alpha/interface_2_3.png');
        this.load.image('interface2_2', 'assets_alpha/interface_2_2.png');
        this.load.image('interface2_1', 'assets_alpha/interface_2_1.png');
        this.load.image('interface2_0', 'assets_alpha/interface_2_0.png');

        this.load.image('interface1_4', 'assets_alpha/interface_1_4.png');
        this.load.image('interface1_3', 'assets_alpha/interface_1_3.png');
        this.load.image('interface1_2', 'assets_alpha/interface_1_2.png');
        this.load.image('interface1_1', 'assets_alpha/interface_1_1.png');
        this.load.image('interface1_0', 'assets_alpha/interface_1_0.png');

        this.load.image('interface0_0', 'assets_alpha/interface_0_0.png');

        this.load.image('cooldown3', 'assets_alpha/cooldown3.png');
        this.load.image('cooldown2', 'assets_alpha/cooldown2.png');
        this.load.image('cooldown1', 'assets_alpha/cooldown1.png');
        this.load.image('cooldown0', 'assets_alpha/cooldown0.png');


        /*Tilemap*/
        this.load.tilemapTiledJSON('cartealpha', 'Tiled/CarteAlpha.json');

        /*Sprites personnages*/
        this.load.spritesheet('perso', 'assets_alpha/Chi.png', { frameWidth: 60, frameHeight: 60 });
        this.load.spritesheet('ennemi', 'assets_alpha/Kikai.png', { frameWidth: 62, frameHeight: 82 });
        this.load.spritesheet('ennemiGD', 'assets_alpha/ennemiGD.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('ennemivol', 'assets_alpha/drone.png', { frameWidth: 38, frameHeight: 26 });
        this.load.spritesheet('boss', 'assets_alpha/BOSS.png', { frameWidth: 600, frameHeight: 400 });
        this.load.image('tourelle', 'assets_alpha/tourelle.png');
        
    }

    create(){
        /*Création de fond*/
        fond = this.add.image(448, 224, 'ciel')
        fond.setScrollFactor(0)
        parallax2 = this.add.image(2000,224,'parallax2')
        parallax2.setScrollFactor(0.5)
        parallax1 = this.add.image(2500,224,'parallax')
        parallax1.setScrollFactor(0.8)

        /*Inititialistion Tilemap*/
        const map = this.make.tilemap({key: 'cartealpha'});
        const tuilesobstacles = map.addTilesetImage('blocs','assetblocs');
        const obstacles = map.createLayer('plateformetiled', tuilesobstacles, 0, 0);
        obstacles.setCollisionByExclusion(-1, true);

        /*Camera*/
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        /*Controles*/
        up = this.input.keyboard.addKeys('Z');
        down = this.input.keyboard.addKeys('S');
        left = this.input.keyboard.addKeys('Q');
        right = this.input.keyboard.addKeys('D');
        boutontir = this.input.keyboard.addKeys('F');
        boutonpot = this.input.keyboard.addKeys('E');

        /*Création Sprites*/
        player = this.physics.add.sprite(500, 300, 'perso');
        player.setGravity(0, 1000);

        ennemiGD = this.physics.add.sprite(874, 300, 'ennemiGD');
        ennemiGD.setGravity(0, 1000);

        ennemiVol = this.physics.add.sprite(1824, 100, 'ennemivol');
        ennemiVol.setScale(1.5);

        tourelle = this.physics.add.sprite(2944 ,200, 'tourelle');
        tourelleexist = true;
        tourelle.setScale(1.2);
        tourelle.setFlipY(true);
        tourelle.setGravity(0, -1000);

        boss = this.physics.add.sprite(5600, 100, 'boss');
        boss.setImmovable(true)
        boss.setGravity(0,1000)

        potion = this.physics.add.sprite(448, 200, 'potion');

        ballegroupe = this.physics.add.group();
        balleennemi = this.physics.add.group();
        plateforme = this.physics.add.group();

        /*Colliders simples*/
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(boss, obstacles);
        this.physics.add.collider(ennemiGD, obstacles);
        this.physics.add.collider(tourelle, obstacles);
        this.physics.add.collider(player, plateforme);

        /*Colliders Fonctions*/
        this.physics.add.collider(player, boss, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiGD, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiVol, hitEnnemi, null, this);

        this.physics.add.overlap(boss, ballegroupe, tirJoueur, null, this);
        this.physics.add.overlap(ennemiGD, ballegroupe, tirJoueurGD, null, this);
        this.physics.add.overlap(ennemiVol, ballegroupe, tirJoueurVol, null, this);
        this.physics.add.overlap(tourelle, ballegroupe, tirJoueurT, null, this);
        this.physics.add.overlap(player, balleennemi, tirEnnemi, null, this);

        this.physics.add.collider(ballegroupe, obstacles, destroyBalle, null, this);
        this.physics.add.collider(balleennemi, obstacles, destroyBalle, null, this);

        this.physics.add.overlap(player, potion, getPotion, null, this);

        vie = 3
        mana = 4
        sensperso = 0

        /*Animations*/

        this.anims.create({
            key: 'bossinvu',
            frames: [ { key: 'boss', frame: 1} ],
            framerate : 10
        });
        this.anims.create({
            key: 'bossvulné',
            frames: [ { key: 'boss', frame: 2} ],
            framerate : 10
        });

        /*Fonctions*/
        function hitEnnemi(player, ennemiGD){
            if (inv === false){
                inv = true;
                vie--;
                player.setTint(0xff0000);
                if (vie === 0){
                    this.physics.pause();
                    this.scene.start("scenemenu")
                }
            }
        }

        function tirJoueur(boss, ballegroupe){
            ballegroupe.destroy();
            if (invuboss == false){
                vieboss--
                if (vieboss == 0){
                    boss.destroy();
                    bossexist = false;
                    this.scene.start("scenemenu")
                }
            }
        }

        function tirJoueurGD(ennemiGD, ballegroupe){
            ballegroupe.destroy();
            ennemiGD.destroy();
        }

        function tirJoueurVol(ennemiVoL, ballegroupe){
            ballegroupe.destroy();
            ennemiVoL.destroy();
        }

        function tirJoueurT(tourelle, ballegroupe){
            ballegroupe.destroy();
            tourelle.destroy();
            tourelleexist = false;
        }

        function tirEnnemi(player, balleennemi){
            if (inv === false){
                inv = true;
                vie--;
                player.setTint(0xff0000);
                if (vie === 0){
                    this.physics.pause();
                    this.scene.start("scenemenu")
                }
            }
            balleennemi.destroy()
        }

        function getPotion(player, potion){
            comptPot = 1
            potion.destroy();
            interPot = this.add.image(287, 50, 'potion')
            interPot.setScrollFactor(0)
            interPot.setScale(0.7)
            interPot.setDepth(2)
        }

        function destroyBalle(ballegroupe, obstacles){
            ballegroupe.destroy();
        }

        this.cameras.main.startFollow(player, true, 0.05, 0.05);
    }

    update(){

        onGround = player.body.blocked.down;

        /*Lancement des timers*/
        timertourelle++
        timerboss++
        timerinvuboss++

        /*Controles joueur*/
        if (right.D.isDown)
        {
            player.setVelocityX(200);
            player.setFlipX(false);
            sensperso = 0;
        }
        
        else if (left.Q.isDown)
        {
            player.setVelocityX(-200);
            player.setFlipX(true);
            sensperso = 1;
        }
    
        else
        {
            player.setVelocityX(0); 
        }

        const jump = Phaser.Input.Keyboard.JustDown(up.Z);

        if (jump && onGround){
                player.setVelocityY(-600);
        }

        /*Frame d'invu*/
        if (inv === true){
            timer++;
            if (timer === 360){
                timer = 0;
                player.setTint(0xffffff);
                inv = false;
            }
        }

        /*Ennemis classiques*/

        if (ennemiGD.x <= 632)
        {
            ennemiGD.setVelocityX(100);
            ennemiGD.setFlipX(true);
        }

        else if (ennemiGD.x >= 874)
        {
            ennemiGD.setVelocityX(-100);     
            ennemiGD.setFlipX(false);
        }

        
        if (ennemiVol.x <= 1376)
        {
            ennemiVol.setVelocityX(200);     
            ennemiVol.setFlipX(false);
        }

        else if (ennemiVol.x >= 1824)
        {
            ennemiVol.setVelocityX(-200);     
            ennemiVol.setFlipX(false);
        }


        /*Tourelle*/
        if (timertourelle == 500 && tourelleexist == true){
            balletourelle = balleennemi.create(tourelle.x, tourelle.y-15, 'balleennemi')
            this.physics.moveTo(balletourelle, player.x, player.y, 500);
            timertourelle = 0
        }

        /*Boss*/

        if(player.x >= 4900){
            this.cameras.main.pan(5400, 0, 3000, 'Power2');
            player.setCollideWorldBounds(true);
        }

        if (timerinvuboss == 1000 && invuboss == true){
            boss.anims.play('bossvulné', true);
            invuboss = false;
            timerinvuboss = 0
        }
        if (timerinvuboss == 200 && invuboss == false){
            boss.anims.play('bossinvu', true);
            invuboss = true;
            timerinvuboss = 0
        }

        if (timerboss == 300 && bossexist == true && compteurmeca <= 2){
            balleboss = balleennemi.create(boss.x+135, boss.y-48, 'balleennemi')
            balleboss.setFlipX(true)
            balleboss.setScale(1.5)
            this.physics.moveTo(balleboss, player.x, player.y, 500);
            compteurmeca++
            timerboss = 0
        }
        else if (timerboss == 300 && bossexist == true && compteurmeca == 3){
            balleboss = balleennemi.create(boss.x+135, boss.y-48, 'balleennemi')
            balleboss2 = balleennemi.create(boss.x+135, boss.y-48, 'balleennemi')
            balleboss3 = balleennemi.create(boss.x+135, boss.y-48, 'balleennemi')
            balleboss.setFlipX(true)
            balleboss.setScale(1.5)
            balleboss.setVelocity(-400,-50);
            balleboss2.setFlipX(true)
            balleboss2.setScale(1.5)
            balleboss2.setVelocity(-400, 50);
            balleboss3.setFlipX(true)
            balleboss3.setScale(1.5)
            balleboss3.setVelocity(-400, 150);
            compteurmeca=1;
            timerboss = 0
        }

        /*Potion*/
        if (boutonpot.E.isDown && comptPot == 1)
        {
            comptPot = 0
            mana = 4;
            interPot.destroy()
        }

        /*Creation plateforme*/
        this.input.on('pointerdown', function (pointer) {
            if (this.input.manager.activePointer.isDown && cooldown == false && mana >= 1 && plateformeexist == false && etatsort == false){
                const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
                bloc = plateforme.create(worldPoint.x, worldPoint.y, 'plateforme')
                bloc.setScale(1.5)
                bloc.setImmovable(true);
                cooldown = true;
                etatsort = true;
                mana--
                plateformeexist = true;
            }  
        }, this);

        if (plateformeexist == true){
            timerplateforme++;
            if (timerplateforme == 800){
                timerplateforme = 0
                plateformeexist = false;
                bloc.destroy()
            }
        }

        if (cooldown == true){
            timerclic++
            if (timerclic = 180){
                cooldown=false;
            }
        }

        /*Tir Projectile*/
        if (mana >= 1){
            const tirer = Phaser.Input.Keyboard.JustDown(boutontir.F);

            if (tirer && etatsort == false){
                balle = ballegroupe.create(player.x, player.y, 'balle')
                etatsort = true;
                if (sensperso == 0){
                    balle.setVelocityX(800);
                }
                else if (sensperso == 1){
                    balle.setVelocityX(-800)
                    balle.setFlipX(true);
                }
                mana--
            }
        }

        if (etatsort == true){
            timersort++
            if (timersort == 180){
                timersort = 0
                etatsort = false
            }
        }


        /* INTERFACE */

        if (vie == 3){
            if (mana == 4){
                this.afficheMana = this.add.image(160,50, 'interface4')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 3){
                this.afficheMana = this.add.image(160,50, 'interface3')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 2){
                this.afficheMana = this.add.image(160,50, 'interface2')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 1){
                this.afficheMana = this.add.image(160,50, 'interface1')
                this.afficheMana.setScrollFactor(0);
            }
            else{
                this.afficheMana = this.add.image(160,50, 'interface0')
                this.afficheMana.setScrollFactor(0);
            }
        }
        else if (vie == 2){
            if (mana == 4){
                this.afficheMana = this.add.image(160,50, 'interface2_4')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 3){
                this.afficheMana = this.add.image(160,50, 'interface2_3')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 2){
                this.afficheMana = this.add.image(160,50, 'interface2_2')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 1){
                this.afficheMana = this.add.image(160,50, 'interface2_1')
                this.afficheMana.setScrollFactor(0);
            }
            else{
                this.afficheMana = this.add.image(160,50, 'interface2_0')
                this.afficheMana.setScrollFactor(0);
            }
        }
        else if (vie == 1){
            if (mana == 4){
                this.afficheMana = this.add.image(160,50, 'interface1_4')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 3){
                this.afficheMana = this.add.image(160,50, 'interface1_3')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 2){
                this.afficheMana = this.add.image(160,50, 'interface1_2')
                this.afficheMana.setScrollFactor(0);
            }
            else if (mana == 1){
                this.afficheMana = this.add.image(160,50, 'interface1_1')
                this.afficheMana.setScrollFactor(0);
            }
            else{
                this.afficheMana = this.add.image(160,50, 'interface1_0')
                this.afficheMana.setScrollFactor(0);
            }
        }
        else {
            this.afficheMana = this.add.image(160,50, 'interface0_0')
            this.afficheMana.setScrollFactor(0);
        }

        if (timersort == 1){
            this.afficheCooldown = this.add.image(100,100, 'cooldown0')
            this.afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 60){
            this.afficheCooldown = this.add.image(100,100, 'cooldown1')
            this.afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 120){
            this.afficheCooldown = this.add.image(100,100, 'cooldown2')
            this.afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 0){
            this.afficheCooldown = this.add.image(100,100, 'cooldown3')
            this.afficheCooldown.setScrollFactor(0);
        }
    }
}
