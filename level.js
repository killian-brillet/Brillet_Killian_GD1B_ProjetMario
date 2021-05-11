var up;
var down;
var left;
var right;

var player;
var onGround;
var ennemi;
var gameOver = false;

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

class Level extends Phaser.Scene{
    constructor(){
        super("scenelevel");
    }
    init(data){
    }

    preload(){
        this.load.image('fondlevel', 'assets_alpha/fondlevel.png');
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

        this.load.tilemapTiledJSON('cartealpha', 'Tiled/CarteAlpha.json');

        this.load.spritesheet('perso', 'assets_alpha/Chi.png', { frameWidth: 60, frameHeight: 60 });
        this.load.spritesheet('ennemi', 'assets_alpha/Kikai.png', { frameWidth: 62, frameHeight: 82 });
        
    }

    create(){
        this.add.image(448, 224, 'fondlevel')

        const map = this.make.tilemap({key: 'cartealpha'});
        const tuilesobstacles = map.addTilesetImage('blocs','assetblocs');
        const obstacles = map.createLayer('plateformetiled', tuilesobstacles, 0, 0);
        obstacles.setCollisionByExclusion(-1, true);

        up = this.input.keyboard.addKeys('Z');
        down = this.input.keyboard.addKeys('S');
        left = this.input.keyboard.addKeys('Q');
        right = this.input.keyboard.addKeys('D');
        boutontir = this.input.keyboard.addKeys('F');
        boutonpot = this.input.keyboard.addKeys('E');

        player = this.physics.add.sprite(100, 300, 'perso');
        player.setGravity(0, 700);

        ennemi = this.physics.add.sprite(880, 300, 'ennemi');
        ennemi.setGravity(0, 800);

        potion = this.physics.add.sprite(448, 200, 'potion');

        ballegroupe = this.physics.add.group();
        plateforme = this.physics.add.group();

        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(ennemi, obstacles);
        this.physics.add.collider(player, plateforme);

        this.physics.add.overlap(player, ennemi, hitEnnemi, null, this);
        this.physics.add.overlap(player, potion, getPotion, null, this);
        this.physics.add.overlap(ennemi, ballegroupe, tirEnnemi, null, this);

        vie = 3;
        this.afficheVie = this.add.image(30, 150, 'trois')

        mana = 4
        sensperso = 0

        function hitEnnemi(player, ennemi){
            if (inv === false){
                inv = true;
                vie--;
                if (vie === 2){
                    this.afficheVie = this.add.image(30, 150, 'deux')
                }
                if (vie === 1){
                    this.afficheVie = this.add.image(30, 150, 'un')
                }
                player.setTint(0xff0000);
                if (vie === 0){
                    this.physics.pause();
                    this.afficheVie = this.add.image(30, 150, 'dead')
                    this.scene.start("scenemenu")
                }
            }
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
    }

    update(){

        onGround = player.body.blocked.down;
        console.log(mana)

        if (right.D.isDown)
        {
            player.setVelocityX(300);
            player.setFlipX(false);
            sensperso = 0;
        }
        
        else if (left.Q.isDown)
        {
            player.setVelocityX(-300);
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

        if (ennemi.x <= 700)
        {
            ennemi.setVelocityX(100);
            ennemi.setFlipX(true);
        }

        if (ennemi.x >= 840)
        {
            ennemi.setVelocityX(-100);
            ennemi.setFlipX(false);
            
        }

        if (boutonpot.E.isDown && comptPot == 1)
        {
            comptPot = 0
            mana = 4;
            interPot.destroy()
        }

        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown() && cooldown == false && mana >= 1){
                bloc = plateforme.create(pointer.x, pointer.y, 'assetblocs')
                bloc.setImmovable(true);
                cooldown = true;
                mana--
            }  
        }, this);

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

        if (mana == 4){
            this.afficheMana = this.add.image(160,50, 'interface4')
        }
        else if (mana == 3){
            this.afficheMana = this.add.image(160,50, 'interface3')
        }
        else if (mana == 2){
            this.afficheMana = this.add.image(160,50, 'interface2')
        }
        else if (mana == 1){
            this.afficheMana = this.add.image(160,50, 'interface1')
        }
        else{
            this.afficheMana = this.add.image(160,50, 'interface0')
        }
    
        if (cooldown == true){
            timerclic++
            if (timerclic = 60){
                cooldown=false;
            }
        }
    }
}
