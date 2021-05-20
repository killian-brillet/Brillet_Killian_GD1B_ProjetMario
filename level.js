var up;
var down;
var left;
var right;

var player;
var onGround;
var gameOver = false;

var ennemi;
var ennemiGD;
var tourelle;
var timertourelle = 0;

var mana;
var potion;
var comptPot = 0;
var boutonpot;
var interPot;

var plateforme;
var bloc;

var boutontir;
var balle;
var ballegroupe;
var sensperso;

var vie;
var inv = false;
var timer = 0;

var timerclic = 0;
var cooldown = false;

var afficheVie;
var afficheMana;

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
        this.load.image('fondlevel', 'assets_alpha/fondlevel.png');
        this.load.image('parallax', 'assets_alpha/parallax1.png');
        this.load.image('parallax2', 'assets_alpha/parallax2.png');
        this.load.image('assetblocs', 'assets_alpha/blocs.png');
        this.load.image('balle', 'assets_alpha/balle.png');
        this.load.image('potion', 'assets_alpha/potion.png');

        this.load.image('trois', 'assets_alpha/trois.png'); 
        this.load.image('deux', 'assets_alpha/deux.png');
        this.load.image('un', 'assets_alpha/un.png');
        this.load.image('dead', 'assets_alpha/dead.png');

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

        this.load.tilemapTiledJSON('cartealpha', 'Tiled/CarteAlpha.json');

        this.load.spritesheet('perso', 'assets_alpha/Chi.png', { frameWidth: 60, frameHeight: 60 });
        this.load.spritesheet('ennemi', 'assets_alpha/Kikai.png', { frameWidth: 62, frameHeight: 82 });
        this.load.spritesheet('ennemiGD', 'assets_alpha/ennemiGD.png', { frameWidth: 47, frameHeight: 33 });
        this.load.image('tourelle', 'assets_alpha/tourelle.png');
        
    }

    create(){
        fond = this.add.image(448, 224, 'fondlevel')
        fond.setScrollFactor(0)
        parallax2 = this.add.image(2000,224,'parallax2')
        parallax2.setScrollFactor(0.5)
        parallax1 = this.add.image(2500,224,'parallax')
        parallax1.setScrollFactor(0.8)

        const map = this.make.tilemap({key: 'cartealpha'});
        const tuilesobstacles = map.addTilesetImage('blocs','assetblocs');
        const obstacles = map.createLayer('plateformetiled', tuilesobstacles, 0, 0);
        obstacles.setCollisionByExclusion(-1, true);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        up = this.input.keyboard.addKeys('Z');
        down = this.input.keyboard.addKeys('S');
        left = this.input.keyboard.addKeys('Q');
        right = this.input.keyboard.addKeys('D');
        boutontir = this.input.keyboard.addKeys('F');
        boutonpot = this.input.keyboard.addKeys('E');

        player = this.physics.add.sprite(2500, 300, 'perso');
        player.setGravity(0, 1000);

        ennemi = this.physics.add.sprite(5300, 300, 'ennemi');
        ennemi.setGravity(0, 1000);

        ennemiGD = this.physics.add.sprite(1000, 300, 'ennemiGD');
        ennemiGD.setGravity(0, 1000);

        tourelle = this.physics.add.sprite(2478,200, 'tourelle');
        tourelle.setScale(1.2)
        tourelle.setGravity(0, 1000);

        potion = this.physics.add.sprite(448, 200, 'potion');

        ballegroupe = this.physics.add.group();
        plateforme = this.physics.add.group();

        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(ennemi, obstacles);
        this.physics.add.collider(ennemiGD, obstacles);
        this.physics.add.collider(tourelle, obstacles);
        this.physics.add.collider(player, plateforme);

        this.physics.add.overlap(player, ennemi, hitEnnemi, null, this);
        this.physics.add.overlap(player, potion, getPotion, null, this);
        this.physics.add.overlap(ennemi, ballegroupe, tirEnnemi, null, this);
        this.physics.add.overlap(ennemiGD, ballegroupe, tirEnnemi, null, this);

        vie = 3;

        mana = 4
        sensperso = 0

        function hitEnnemi(player, ennemi){
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
        function tirEnnemi(ennemi, ballegroupe){
            ballegroupe.destroy();
            ennemi.destroy();
        }

        function tirEnnemi(ennemi, ballegroupe){
            ballegroupe.destroy();
            ennemi.destroy();
        }

        function getPotion(player, potion){
            comptPot = 1
            potion.destroy();
            interPot = this.add.image(287, 50, 'potion')
            interPot.setScale(0.7)
            interPot.setDepth(2)
        }

        this.cameras.main.startFollow(player, true, 0.05, 0.05);
    }

    update(){

        onGround = player.body.blocked.down;
        console.log()

        timertourelle++

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

        if (inv === true){
            timer++;
            if (timer === 180){
                timer = 0;
                player.setTint(0xffffff);
                inv = false;
            }
        }

        if (ennemi.x <= 5100)
        {
            ennemi.setVelocityX(50);
        }

        if (ennemi.x >= 5300)
        {
            ennemi.setVelocityX(-50);     
        }

        if (ennemiGD.x <= 700)
        {
            ennemiGD.setVelocityX(100);
            ennemiGD.setFlipX(true);
        }

        if (ennemiGD.x >= 1000)
        {
            ennemiGD.setVelocityX(-100);     
            ennemiGD.setFlipX(false);
        }

        if (timertourelle == 120){
            balle = ballegroupe.create(tourelle.x, tourelle.y-15, 'balle')
            balle.setVelocityX(800);
            timertourelle = 0
        }

        if (boutonpot.E.isDown && comptPot == 1)
        {
            comptPot = 0
            mana = 4;
            interPot.destroy()
        }

        this.input.on('pointerdown', function (pointer) {
            if (this.input.manager.activePointer.isDown && cooldown == false && mana >= 1){
                const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
                bloc = plateforme.create(worldPoint.x, worldPoint.y, 'assetblocs')
                bloc.setScale(1.5)
                bloc.setImmovable(true);
                cooldown = true;
                mana--
            }  
        }, this);

        /*if (this.input.manager.activePointer.isDown && cooldown == false && mana >= 1){
            bloc = plateforme.create(worldPoint.x, worldPoint.y, 'assetblocs')
            bloc.setImmovable(true);
            cooldown = true;
            mana--
        }  */

        if (mana >= 1){
            const tirer = Phaser.Input.Keyboard.JustDown(boutontir.F);

            if (tirer){
                balle = ballegroupe.create(player.x, player.y, 'balle')
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
    
        if (cooldown == true){
            timerclic++
            if (timerclic = 60){
                cooldown=false;
            }
        }
    }
}
