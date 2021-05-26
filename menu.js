var entree
var cooldownclic = 0;

class Menu extends Phaser.Scene{
    constructor(){
        super("scenemenu");
    }
    init(data){
    }


    preload(){
        this.load.image('fondmenu', 'assets/fondmenu.png');
    }

    create(){
        entree = entree = this.input.keyboard.addKeys('enter');
        this.add.image(448, 224, 'fondmenu')
    }

    update(){
        const passer = Phaser.Input.Keyboard.JustDown(entree.enter);
        if (passer){
            this.scene.start("scenelevel")
        }
        this.input.on('pointerdown', function (pointer) {
            if (this.input.manager.activePointer.isDown && cooldownclic == 0){
                this.scene.start("scenelevel")
                cooldownclic = 1
            }  
        }, this);
    }

}