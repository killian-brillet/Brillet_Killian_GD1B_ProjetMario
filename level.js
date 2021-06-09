var up;
var down;
var left;
var right;
var entree;

var player;
var onGround;
var gameOver = false;

var ennemiGD;
var ennemiGD2;
var ennemiGD3;

var ennemiVol;

var tourelle;
var balletourelle;
var timertourelle = 0;
var balleennemi;
var tourelleexist;

var boss;
var bossexist = true;
var timerboss = 0;
var vieboss ;
var timerinvuboss = 0;
var invuboss = true;
var regenboss

var balleboss;
var balleboss2;
var balleboss3;
var compteurmeca = 1;

var mana;
var potion;
var comptPot ;
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

var cle1
var cle2
var cle3
var porte
var compteurcle
var porteouverte

var timerclic = 0;
var cooldown = false;

var afficheVie;
var afficheMana;
var afficheCooldown;
var afficheCle;

var fond;
var parallax1;
var parallax2;

var dialogue1;

class Level extends Phaser.Scene{
    constructor(){
        super("scenelevel");
    }
    init(data){
    }

    preload(){

        /*Divers*/
        this.load.image('fond', 'assets/ciel.png');
        this.load.image('nuage', 'assets/NUAGE.png');
        this.load.image('parallax1', 'assets/parralax1.png');
        this.load.image('parallax2', 'assets/parralax2.png');
        this.load.image('assetblocs', 'assets/blocs.png');
        this.load.image('assetfond', 'assets/tilesfond.png');
        this.load.image('plateforme', 'assets/plateforme.png');
        this.load.image('porte', 'assets/porte.png');
        this.load.image('rouage', 'assets/rouage.png');
        this.load.image('balleennemi', 'assets/balleennemi.png');
        this.load.image('potion', 'assets/potion.png');

        this.load.image('dialogue1', 'assets/dialogue.png');

        this.load.spritesheet('balle', 'assets/balle.png', { frameWidth: 40, frameHeight: 25 });

        /*Interface*/
        this.load.image('interface4', 'assets/interface_4.png');
        this.load.image('interface3', 'assets/interface_3.png');
        this.load.image('interface2', 'assets/interface_2.png');
        this.load.image('interface1', 'assets/interface_1.png');
        this.load.image('interface0', 'assets/interface_0.png');

        this.load.image('interface2_4', 'assets/interface_2_4.png');
        this.load.image('interface2_3', 'assets/interface_2_3.png');
        this.load.image('interface2_2', 'assets/interface_2_2.png');
        this.load.image('interface2_1', 'assets/interface_2_1.png');
        this.load.image('interface2_0', 'assets/interface_2_0.png');

        this.load.image('interface1_4', 'assets/interface_1_4.png');
        this.load.image('interface1_3', 'assets/interface_1_3.png');
        this.load.image('interface1_2', 'assets/interface_1_2.png');
        this.load.image('interface1_1', 'assets/interface_1_1.png');
        this.load.image('interface1_0', 'assets/interface_1_0.png');

        this.load.image('interface0_0', 'assets/interface_0_0.png');

        this.load.image('rouage0', 'assets/rouage0.png');
        this.load.image('rouage1', 'assets/rouage1.png');
        this.load.image('rouage2', 'assets/rouage2.png');
        this.load.image('rouage3', 'assets/rouage3.png');

        this.load.image('cooldown3', 'assets/cooldown3.png');
        this.load.image('cooldown2', 'assets/cooldown2.png');
        this.load.image('cooldown1', 'assets/cooldown1.png');
        this.load.image('cooldown0', 'assets/cooldown0.png');


        /*Tilemap*/
        this.load.tilemapTiledJSON('cartealpha', 'Tiled/CarteAlpha.json');

        /*Sprites personnages*/
        this.load.spritesheet('perso', 'assets/Chi.png', { frameWidth: 60, frameHeight: 70 });
        this.load.spritesheet('ennemi', 'assets/Kikai.png', { frameWidth: 62, frameHeight: 82 });
        this.load.spritesheet('ennemiGD', 'assets/ennemiGD.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('ennemivol', 'assets/drone.png', { frameWidth: 38, frameHeight: 26 });
        this.load.spritesheet('tourelle', 'assets/tourelle.png', { frameWidth: 30, frameHeight: 42 });
        this.load.spritesheet('boss', 'assets/BOSS.png', { frameWidth: 600, frameHeight: 400 });
        
    }

    create(){
        /*Création de fond*/

        fond = this.add.image(448,224,'fond')
        fond.setScrollFactor(0)
        /*parallax2 = this.add.image(448,224,'parallax2')
        parallax2.setScrollFactor(0.3)*/
        parallax1 = this.add.image(2000,224,'nuage')
        parallax1.setScrollFactor(0.5)

        /*Inititialistion Tilemap*/
        const map = this.make.tilemap({key: 'cartealpha'});
        const tuilesfond = map.addTilesetImage('tiled_fond','assetfond');
        const decorfond = map.createLayer('fond', tuilesfond, 0, 0);
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
        boutontir = this.input.keyboard.addKeys('SPACE');
        boutonpot = this.input.keyboard.addKeys('E');
        entree = this.input.keyboard.addKeys('ENTER');

        /*Création Sprites*/
        player = this.physics.add.sprite(450, 360, 'perso');
        player.setGravity(0, 1000);
        player.setSize(30,45)
        player.setOffset(10,25)
        player.setCollideWorldBounds(true)

        ennemiGD = this.physics.add.sprite(874, 300, 'ennemiGD');
        ennemiGD.setGravity(0, 1000);
        ennemiGD2 = this.physics.add.sprite(2640, 300, 'ennemiGD');
        ennemiGD2.setGravity(0, 1000);
        ennemiGD3 = this.physics.add.sprite(4290, 150, 'ennemiGD');
        ennemiGD3.setGravity(0, 1000);

        ennemiVol = this.physics.add.sprite(1824, 100, 'ennemivol');
        ennemiVol.setScale(1.5);

        tourelle = this.physics.add.sprite(2944 ,200, 'tourelle');
        tourelleexist = true;
        tourelle.setScale(1.3);
        tourelle.setFlipY(true);
        tourelle.setGravity(0, -1000);

        boss = this.physics.add.sprite(5600, 100, 'boss');
        boss.setImmovable(true)
        boss.setGravity(0,1000)
        boss.setScale(0.90)

        potion = this.physics.add.sprite(3274, 320, 'potion');

        cle1 = this.physics.add.sprite(60, 350, 'rouage');
        cle2 = this.physics.add.sprite(2124, 100, 'rouage');
        cle3 = this.physics.add.sprite(4638, 132, 'rouage');
        cle1.setScale(0.8)
        cle2.setScale(0.8)
        cle3.setScale(0.8)

        porte = this.physics.add.sprite(4800, 320, 'porte');
        porte.setImmovable(true)

        ballegroupe = this.physics.add.group();
        balleennemi = this.physics.add.group();
        plateforme = this.physics.add.group();

        /*Colliders simples*/
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(boss, obstacles);
        this.physics.add.collider(ennemiGD, obstacles);
        this.physics.add.collider(ennemiGD2, obstacles);
        this.physics.add.collider(ennemiGD3, obstacles);
        this.physics.add.collider(tourelle, obstacles);
        this.physics.add.collider(player, plateforme);

        /*Colliders Fonctions*/
        this.physics.add.collider(player, boss, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiGD, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiGD2, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiGD3, hitEnnemi, null, this);
        this.physics.add.overlap(player, ennemiVol, hitEnnemi, null, this);

        this.physics.add.overlap(boss, ballegroupe, tirJoueur, null, this);
        this.physics.add.overlap(ennemiGD, ballegroupe, tirJoueurGD, null, this);
        this.physics.add.overlap(ennemiGD2, ballegroupe, tirJoueurGD, null, this);
        this.physics.add.overlap(ennemiGD3, ballegroupe, tirJoueurGD, null, this);
        this.physics.add.overlap(ennemiVol, ballegroupe, tirJoueurVol, null, this);
        this.physics.add.overlap(tourelle, ballegroupe, tirJoueurT, null, this);
        this.physics.add.overlap(player, balleennemi, tirEnnemi, null, this);

        this.physics.add.collider(ballegroupe, obstacles, destroyBalle, null, this);
        this.physics.add.collider(balleennemi, obstacles, destroyBalle, null, this);
        this.physics.add.collider(porte, ballegroupe, destroyBallePorte, null, this);
        this.physics.add.collider(porte, balleennemi, destroyBallePorte, null, this);
        this.physics.add.collider(ballegroupe, plateforme, destroyBalle, null, this);
        this.physics.add.collider(balleennemi, plateforme, destroyBalle, null, this);

        this.physics.add.overlap(player, potion, getPotion, null, this);
        
        this.physics.add.overlap(player, cle1, getCle, null, this);
        this.physics.add.overlap(player, cle2, getCle, null, this);
        this.physics.add.overlap(player, cle3, getCle, null, this);

        this.physics.add.collider(player, porte, ouverturePorte, null, this);


        /*Init Interface*/
        afficheCooldown = this.add.image(350,51, 'cooldown3')
        afficheCooldown.setScrollFactor(0);

        afficheMana = this.add.image(160,50, 'interface4')
        afficheMana.setScrollFactor(0);
        afficheMana.setDepth(2);

        afficheCle = this.add.image(180,70, 'rouage0')
        afficheCle.setScrollFactor(0);
        afficheCle.setDepth(1);

        /*Init Variables */
        vie = 3
        mana = 4
        sensperso = 0
        regenboss = false
        compteurcle  = 0
        comptPot = 0
        vieboss = 3
        porteouverte = false

        /*dialogue1 = this.add.image(448,360,'dialogue1')
        dialogue1.setDepth(10)
        dialogue1.setScrollFactor(0)
        this.physics.pause()*/

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

        this.anims.create({
            key: 'balle',
            frames: this.anims.generateFrameNumbers('balle', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ennemiGD',
            frames: this.anims.generateFrameNumbers('ennemiGD', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'drone',
            frames: this.anims.generateFrameNumbers('ennemivol', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'tourelle',
            frames: this.anims.generateFrameNumbers('tourelle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        /* Anims perso */

        this.anims.create({
            key: 'persoidle',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'persosort',
            frames: this.anims.generateFrameNumbers('perso', { start: 3, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'persodroite',
            frames: this.anims.generateFrameNumbers('perso', { start: 8, end: 13 }),
            frameRate: 15,
            repeat: 0
        });

        /*Fonctions*/
        function hitEnnemi(player, ennemiGD){
            if (inv === false){
                inv = true;
                vie--;
                player.setTint(0xff0000);
                if (vie === 0){
                    this.physics.pause();
                    this.scene.restart()
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
                    this.scene.start("scenemenu");
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
                    this.scene.restart()
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
            interPot.setDepth(3)
        }

        function getCle(player, cle1){
            compteurcle++
            cle1.destroy()
        }

        function ouverturePorte(player, porte){
            if (compteurcle == 3){
                compteurcle++
                porte.destroy()
            }
        }

        function destroyBalle(ballegroupe, obstacles){
            ballegroupe.destroy();
        }

        function destroyBallePorte(porte, ballegroupe){
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
            player.setOffset(10,25)
            player.anims.play('persodroite', true)
            sensperso = 0;
        }
        
        else if (left.Q.isDown)
        {
            player.setVelocityX(-200);
            player.setFlipX(true);
            player.setOffset(20,25)
            player.anims.play('persodroite', true)
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

        if (player.y >= 440)
        {
            this.physics.pause();
            this.scene.restart()
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
            ennemiGD.anims.play('ennemiGD', true)
            ennemiGD.setFlipX(true);
        }

        else if (ennemiGD.x >= 874)
        {
            ennemiGD.setVelocityX(-100); 
            ennemiGD.anims.play('ennemiGD', true)  
            ennemiGD.setFlipX(false);
        }

        if (ennemiGD2.x <= 2306)
        {
            ennemiGD2.setVelocityX(100);
            ennemiGD2.anims.play('ennemiGD', true)
            ennemiGD2.setFlipX(true);
        }

        else if (ennemiGD2.x >= 2640)
        {
            ennemiGD2.setVelocityX(-100); 
            ennemiGD2.anims.play('ennemiGD', true)  
            ennemiGD2.setFlipX(false);
        }

        if (ennemiGD3.x <= 3938)
        {
            ennemiGD3.setVelocityX(100);
            ennemiGD3.anims.play('ennemiGD', true)
            ennemiGD3.setFlipX(true);
        }

        else if (ennemiGD3.x >= 4290)
        {
            ennemiGD3.setVelocityX(-100); 
            ennemiGD3.anims.play('ennemiGD', true)  
            ennemiGD3.setFlipX(false);
        }
        
        if (ennemiVol.x <= 1376)
        {
            ennemiVol.setVelocityX(200); 
            ennemiVol.anims.play('drone', true)    
            ennemiVol.setFlipX(false);
        }

        else if (ennemiVol.x >= 1824)
        {
            ennemiVol.setVelocityX(-200); 
            ennemiVol.anims.play('drone', true)    
            ennemiVol.setFlipX(false);
        }


        /*Tourelle*/
        if (timertourelle == 500 && tourelleexist == true){
            balletourelle = balleennemi.create(tourelle.x, tourelle.y-15, 'balleennemi')
            this.physics.moveTo(balletourelle, player.x, player.y, 500);
            timertourelle = 0
            tourelle.anims.play('tourelle', true)
        }

        /*Boss*/

        if(player.x >= 4900){
            this.cameras.main.pan(5400, 0, 3000, 'Power2');
            player.setCollideWorldBounds(true);
        }

        if (timerinvuboss == 350 && invuboss == true){
            boss.anims.play('bossvulné', true);
            invuboss = false;
            timerinvuboss = 0
        }
        if (timerinvuboss == 200 && invuboss == false){
            boss.anims.play('bossinvu', true);
            invuboss = true;
            timerinvuboss = 0
        }

        if (timerboss == 120 && bossexist == true && compteurmeca <= 2){
            balleboss = balleennemi.create(boss.x+135, boss.y-48, 'balleennemi')
            balleboss.setFlipX(true)
            balleboss.setScale(1.5)
            this.physics.moveTo(balleboss, player.x, player.y, 500);
            compteurmeca++
            timerboss = 0
        }
        else if (timerboss == 120 && bossexist == true && compteurmeca == 3){
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
                player.anims.play('persosort', true)
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
            if (timerplateforme == 400){
                timerplateforme = 0
                plateformeexist = false;
                bloc.destroy()
            }
        }

        if (cooldown == true){
            timerclic++
            if (timerclic = 400){
                cooldown=false;
            }
        }

        /*Tir Projectile*/
        if (mana >= 1){
            const tirer = Phaser.Input.Keyboard.JustDown(boutontir.SPACE);

            if (tirer && etatsort == false){
                player.anims.play('persosort', true)
                balle = ballegroupe.create(player.x, player.y, 'balle')
                balle.anims.play('balle', true);
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

        const passer = Phaser.Input.Keyboard.JustDown(entree.ENTER);
        if (passer){
            dialogue1.destroy();
            this.physics.resume()
        }

        if (vie == 3){
            if (mana == 4){
                afficheMana = this.add.image(160,50, 'interface4')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 3){
                afficheMana = this.add.image(160,50, 'interface3')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 2){
                afficheMana = this.add.image(160,50, 'interface2')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 1){
                afficheMana = this.add.image(160,50, 'interface1')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else{
                afficheMana = this.add.image(160,50, 'interface0')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
        }
        else if (vie == 2){
            if (mana == 4){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface2_4')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 3){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface2_3')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 2){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface2_2')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 1){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface2_1')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else{
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface2_0')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
        }
        else if (vie == 1){
            if (mana == 4){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface1_4')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 3){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface1_3')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 2){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface1_2')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else if (mana == 1){
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface1_1')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
            else{
                afficheMana.destroy()
                afficheMana = this.add.image(160,50, 'interface1_0')
                afficheMana.setScrollFactor(0);
                afficheMana.setDepth(2);
            }
        }
        else {
            afficheMana.destroy()
            afficheMana = this.add.image(160,50, 'interface0_0')
            afficheMana.setScrollFactor(0);
            afficheMana.setDepth(2);
        }

        if (timersort == 1){
            afficheCooldown.destroy()
            afficheCooldown = this.add.image(350,51, 'cooldown0')
            afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 60){
            afficheCooldown.destroy()
            afficheCooldown = this.add.image(350,51, 'cooldown1')
            afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 120){
            afficheCooldown.destroy()
            afficheCooldown = this.add.image(350,51, 'cooldown2')
            afficheCooldown.setScrollFactor(0);
        }
        else if (timersort == 0){
            afficheCooldown.destroy()
            afficheCooldown = this.add.image(350,51, 'cooldown3')
            afficheCooldown.setScrollFactor(0);
        }

        if (compteurcle == 0){
            afficheCle.destroy()
            afficheCle = this.add.image(180,70, 'rouage0')
            afficheCle.setScrollFactor(0);
            afficheCle.setDepth(1);
        }
        else if (compteurcle == 1){
            afficheCle.destroy()
            afficheCle = this.add.image(180,70, 'rouage1')
            afficheCle.setScrollFactor(0);
            afficheCle.setDepth(1);
        }
        else if (compteurcle == 2){
            afficheCle.destroy()
            afficheCle = this.add.image(180,70, 'rouage2')
            afficheCle.setScrollFactor(0);
            afficheCle.setDepth(1);
        }
        else if (compteurcle == 3){
            afficheCle.destroy()
            afficheCle = this.add.image(180,70, 'rouage3')
            afficheCle.setScrollFactor(0);
            afficheCle.setDepth(1);
        }
        else if (compteurcle == 4 && porteouverte == false){
            porteouverte = true
            afficheCle.destroy()
        }
    }
}
