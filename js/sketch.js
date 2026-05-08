let gameState = "loading";
let player;
let goodFoods = [];
let badFoods = [];
let movingSaws = [];
let particles = [];
let floatingTexts = [];
let jetpackParticles = [];
let obstacles = [];
let lastMoveDirection = 'none';

let score = 0;
let health = 3;
let highScore = 0;
let winCondition = 20;
let currentLevel = 1;
let levelTransitionTime = 0;
let showingLevelTransition = false;

let playerAnimation = [];
let currentFrame = 0;
let frameDelay = 0;
let isMoving = false;
let lastDirection = 'down';

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let musicEnabled = true;
let sfxEnabled = true;
let bgMusic;
let eatSound;
let hurtSound;
let winSound;
let soundsLoaded = false;
let soundsTotal = 4;
let soundsLoadedCount = 0;

let playerSpeed = 0;
let maxSpeed = 5.5;
let acceleration = 0.4;
let deceleration = 0.85;
let groundDrag = 0.95;

let welcomeImage;

function preload() {
    welcomeImage = loadImage('images/jetpack-food-game.jpg');

    soundFormats('wav', 'mp3');
    
    eatSound = loadSound('sounds/good-food.wav', 
        () => { soundsLoadedCount++; },
        () => { eatSound = null; soundsLoadedCount++; }
    );
    
    hurtSound = loadSound('sounds/bad-food.wav',
        () => { soundsLoadedCount++; },
        () => { hurtSound = null; soundsLoadedCount++; }
    );
    
    winSound = loadSound('sounds/game-over.wav',
        () => { soundsLoadedCount++; },
        () => { winSound = null; soundsLoadedCount++; }
    );
    
    bgMusic = loadSound('sounds/background-music.mp3',
        () => {
            bgMusic.setLoop(true);
            bgMusic.setVolume(0.3);
            soundsLoadedCount++;
        },
        () => { bgMusic = null; soundsLoadedCount++; }
    );
}

function setup() {
    let canvas = createCanvas(900, 600);
    canvas.parent('gameCanvas');
    frameRate(60);
    
    createAnimationFrames();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    canvas.elt.tabIndex = 0;
    canvas.elt.addEventListener('click', () => {
        canvas.elt.focus();
        if (getAudioContext().state === 'suspended') {
            getAudioContext().resume();
        }
    });
    
    let musicBtn = select('#musicToggle');
    if (musicBtn) musicBtn.mousePressed(toggleMusic);
    
    let soundBtn = select('#soundToggle');
    if (soundBtn) soundBtn.mousePressed(toggleSFX);
}

function createAnimationFrames() {
    for (let i = 0; i < 8; i++) {
        let frame = createGraphics(45, 55);
        let isWalking = (i >= 4);
        let frameIndex = i % 4;
        
        let bounceY = 0;
        let legSwing = 0;
        let armSwing = 0;
        
        if (isWalking) {
            legSwing = sin(frameIndex * HALF_PI) * 6;
            armSwing = sin(frameIndex * HALF_PI) * 4;
            bounceY = abs(sin(frameIndex * HALF_PI)) * 2;
        } else {
            bounceY = sin(frameIndex * HALF_PI) * 2;
        }
        
        drawCharacterFrame(frame, bounceY, legSwing, armSwing);
        playerAnimation.push(frame);
    }
}

function drawCharacterFrame(g, bounceY, legSwing, armSwing) {
    g.push();
    g.translate(22.5, 27.5 + bounceY);
    
    g.fill(52, 157, 89);
    g.stroke(40, 120, 70);
    g.strokeWeight(1.5);
    g.rectMode(g.CENTER);
    g.rect(0, 0, 32, 40, 8);
    
    g.fill(101, 67, 33);
    g.noStroke();
    g.rect(0, 8, 34, 6, 3);
    g.fill(255, 215, 0);
    g.rect(0, 8, 6, 8, 2);
    
    g.fill(255, 224, 189);
    g.stroke(200, 170, 140);
    g.strokeWeight(1);
    g.ellipse(0, -18, 28, 28);
    
    g.fill(101, 67, 33);
    g.noStroke();
    g.arc(0, -28, 30, 20, PI, TWO_PI, g.CHORD);
    
    g.stroke(80, 50, 30);
    g.strokeWeight(2.5);
    g.line(-9, -25, -4, -24);
    g.line(9, -25, 4, -24);
    
    g.fill(20);
    g.noStroke();
    g.ellipse(-7, -22, 5, 6);
    g.ellipse(7, -22, 5, 6);
    
    g.fill(255);
    g.ellipse(-8, -23, 2, 2.5);
    g.ellipse(6, -23, 2, 2.5);
    
    g.fill(255, 255, 200);
    g.ellipse(-9, -24, 1, 1.5);
    g.ellipse(5, -24, 1, 1.5);
    
    g.fill(255, 150, 150, 120);
    g.ellipse(-11, -17, 5, 4);
    g.ellipse(11, -17, 5, 4);
    
    g.stroke(80, 40, 20);
    g.strokeWeight(2);
    g.noFill();
    g.arc(0, -14, 14, 8, 0, PI);
    
    g.stroke(52, 157, 89);
    g.strokeWeight(7);
    g.line(-12, -4, -20, -2 + armSwing);
    g.line(12, -4, 20, -2 - armSwing);
    
    g.fill(255, 224, 189);
    g.noStroke();
    g.ellipse(-20, -2 + armSwing, 7, 7);
    g.ellipse(20, -2 - armSwing, 7, 7);
    
    g.stroke(200, 170, 140);
    g.strokeWeight(1.5);
    g.line(-22, -4 + armSwing, -23, -1 + armSwing);
    g.line(-20, -5 + armSwing, -21, -2 + armSwing);
    g.line(22, -4 - armSwing, 23, -1 - armSwing);
    g.line(20, -5 - armSwing, 21, -2 - armSwing);
    
    g.stroke(42, 117, 69);
    g.strokeWeight(8);
    g.line(-8, 18, -15, 30 + legSwing);
    g.line(8, 18, 15, 30 - legSwing);
    
    g.fill(80, 60, 40);
    g.noStroke();
    g.ellipse(-17, 34 + legSwing, 10, 6);
    g.ellipse(17, 34 - legSwing, 10, 6);
    
    g.fill(60, 40, 25);
    g.ellipse(-20, 33 + legSwing, 4, 3);
    g.ellipse(20, 33 - legSwing, 4, 3);
    
    g.fill(150, 90, 50);
    g.rect(16, 0, 12, 18, 4);
    g.fill(120, 70, 40);
    g.rect(18, -4, 8, 8, 2);
    
    g.pop();
}

function playEatSound() {
    if (!sfxEnabled) return;
    if (eatSound) eatSound.play();
}

function playHurtSound() {
    if (!sfxEnabled) return;
    if (hurtSound) hurtSound.play();
}

function playWinSound() {
    if (!sfxEnabled) return;
    if (winSound) winSound.play();
}

function startBackgroundMusic() {
    if (!musicEnabled) return;
    if (bgMusic) bgMusic.loop();
}

function stopBackgroundMusic() {
    if (bgMusic) bgMusic.stop();
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    let btn = select('#musicToggle');
    btn.html(musicEnabled ? 'Music: ON' : 'Music: OFF');
    
    if (musicEnabled && gameState === 'playing') {
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    let btn = select('#soundToggle');
    btn.html(sfxEnabled ? 'SFX: ON' : 'SFX: OFF');
}

function setupGame() {
    score = 0;
    health = 3;
    gameState = 'playing';
    currentLevel = 1;
    showingLevelTransition = false;
    levelTransitionTime = 0;
    
    for (let f of goodFoods) if (f) f.remove();
    for (let b of badFoods) if (b) b.remove();
    for (let s of movingSaws) if (s) s.remove();
    for (let o of obstacles) if (o) o.remove();
    
    obstacles = []; 
    goodFoods = [];
    badFoods = [];
    movingSaws = [];
    particles = [];
    floatingTexts = [];
    
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
    isMoving = false;
    
    if (player) player.remove();
    player = new Sprite();
    player.width = 38;
    player.height = 48;
    player.collider = 'dynamic';
    player.x = width/2;
    player.y = height - 80;
    player.friction = 0.95;
    player.rotationLock = true;
    
    for (let i = 0; i < 8; i++) {
        goodFoods.push(GoodFood.createRandom());
    }
    
    for (let i = 0; i < 4; i++) {
        badFoods.push(BadFood.createRandom());
    }

    for (let i = 0; i < 5; i++) {
        obstacles.push(Obstacle.createRandom());
    }
    
    startBackgroundMusic();
}

function draw() {
    if (gameState === 'loading') {
        drawLoadingScreen();
        if (soundsLoadedCount >= soundsTotal) {
            soundsLoaded = true;
            gameState = 'welcome';
        }
        return;
    }
    
    if (gameState === 'welcome') drawWelcomeScreen();
    else if (gameState === 'instructions') drawInstructionsScreen();
    else if (gameState === 'playing') drawGame();
    else if (gameState === 'gameover') drawGameOverScreen();
}

function drawLoadingScreen() {
    background(20, 30, 50);
    
    fill(255, 215, 0);
    textAlign(CENTER);
    textSize(48);
    textStyle(BOLD);
    text("LOADING", width/2, height/2 - 60);
    
    let barWidth = 200;
    let barHeight = 20;
    let barX = width/2 - barWidth/2;
    let barY = height/2;
    
    fill(100, 100, 100);
    rect(barX, barY, barWidth, barHeight, 10);
    
    let progress = soundsLoadedCount / soundsTotal;
    fill(255, 215, 0);
    rect(barX, barY, barWidth * progress, barHeight, 10);
    
    let dots = "";
    let dotCount = floor(frameCount / 15) % 4;
    for (let i = 0; i < dotCount; i++) dots += ".";
    
    fill(255);
    textSize(24);
    text("Loading sounds" + dots, width/2, height/2 + 60);
}

function drawLevelTransition() {
    let alpha = map(levelTransitionTime, 180, 0, 0, 255);
    
    fill(0, 0, 0, alpha * 0.7);
    rect(0, 0, width, height);
    
    fill(255, 215, 0, alpha);
    textAlign(CENTER);
    textSize(72);
    textStyle(BOLD);
    text("⚡ LEVEL 2 ⚡", width/2, height/2 - 50);
    
    textSize(32);
    fill(255, alpha);
    text("MOVING SAWS APPEAR!", width/2, height/2 + 30);
    text("Watch out! ⚠️", width/2, height/2 + 80);
}

function drawWelcomeScreen() {
    background(50, 80, 120);
    
    if (welcomeImage) {
        let imgWidth = 250;
        let imgHeight = 200;
        let imgX = width/2 - imgWidth/2;
        let imgY = 30;
        image(welcomeImage, imgX, imgY, imgWidth, imgHeight);
    }
    
    for (let i = 0; i < 8; i++) {
        let angle = (frameCount * 0.02 + i * TWO_PI / 8);
        let x = width/2 + cos(angle) * 200;
        let y = height/2 - 100 + sin(angle * 0.5) * 100;
        
        push();
        translate(x, y);
        
        if (i % 2 === 0) {
            let goodType = floor(i / 2);
            switch(goodType) {
                case 0:
                    fill(220, 50, 50);
                    circle(0, 0, 18);
                    fill(255, 100, 100);
                    circle(-5, -5, 5);
                    break;
                case 1:
                    fill(255, 220, 50);
                    arc(0, 0, 14, 8, PI, TWO_PI);
                    break;
                case 2:
                    fill(255, 140, 0);
                    circle(0, 0, 16);
                    break;
                case 3:
                    fill(220, 40, 60);
                    circle(0, 0, 14);
                    fill(255, 200, 50);
                    circle(-3, -2, 1.5);
                    circle(3, -2, 1.5);
                    circle(-3, 2, 1.5);
                    circle(3, 2, 1.5);
                    break;
            }
        } else {
            let badType = floor((i - 1) / 2);
            fill(130, 70, 160);
            switch(badType) {
                case 0:
                    arc(0, -2, 16, 10, PI, TWO_PI);
                    fill(200, 150, 220);
                    rect(-2, 2, 4, 6, 1);
                    break;
                case 1:
                    circle(0, 0, 14);
                    fill(80, 30, 100);
                    circle(-3, -2, 3);
                    break;
                case 2:
                    ellipse(0, 0, 12, 16);
                    break;
                case 3:
                    circle(0, 0, 12);
                    stroke(100, 40, 130);
                    strokeWeight(1.5);
                    for (let j = 0; j < 6; j++) {
                        let a = j * TWO_PI / 6;
                        let x1 = cos(a) * 6;
                        let y1 = sin(a) * 6;
                        let x2 = cos(a) * 12;
                        let y2 = sin(a) * 12;
                        line(x1, y1, x2, y2);
                    }
                    noStroke();
                    break;
            }
        }
        pop();
    }
    
    fill(255, 215, 0);
    textAlign(CENTER);
    textSize(56);
    textStyle(BOLD);
    text("Jetpack Food Adventure", width/2, height/2 + 40);
    
    textSize(24);
    fill(255);
    text("My 2 favorite things in a game", width/2, height/2 + 100);
    
    let btnX = width/2 - 100;
    let btnY = height/2 + 170;
    let btnW = 200;
    let btnH = 50;
    
    let hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hover ? color(255, 100, 100) : color(255, 80, 80));
    rect(btnX, btnY, btnW, btnH, 25);
    fill(255);
    textSize(20);
    text("START GAME", width/2, btnY + 33);
    
    textSize(14);
    fill(200);
    text("Click anywhere or press any key to start", width/2, height - 30);
}

function drawInstructionsScreen() {
    background(20, 30, 50);
    
    fill(255, 215, 0);
    textAlign(CENTER);
    textSize(40);
    text("HOW TO PLAY", width/2, 40);
    
    fill(255);
    textSize(18);
    textAlign(LEFT);
    text("🎮 Controls:", 40, 100);
    textSize(16);
    text("  • WASD or Arrow Keys to move", 40, 130);
    
    textSize(18);
    text("🍎 Game Rules:", 40, 180);
    textSize(16);
    text("  • Eat GOOD FOOD → +1 point", 40, 210);
    text("  • Avoid BAD FOOD → -1 health", 40, 240);
    text("  • Avoid MOVING SAWS → -1 health", 40, 270);
    text("  • Reach 20 points to WIN!", 40, 300);
    text("  • Don't let health reach 0!", 40, 330);
    text("  • You have only 3 lives!", 40, 360);
    
    fill(255, 215, 0);
    textSize(18);
    textAlign(CENTER);
    text("GOOD FOOD (+1 point)", width/2 + 200, 100);
    
    let goodX = width/2 + 100;
    let goodY = 140;
    let goodTypes = [
        { type: 0, name: "Apple", x: goodX, y: goodY },
        { type: 1, name: "Banana", x: goodX + 70, y: goodY },
        { type: 2, name: "Orange", x: goodX + 140, y: goodY },
        { type: 3, name: "Strawberry", x: goodX + 210, y: goodY },
        { type: 4, name: "Watermelon", x: goodX + 280, y: goodY }
    ];
    
    for (let i = 0; i < goodTypes.length; i++) {
        push();
        translate(goodTypes[i].x, goodTypes[i].y);
        
        noStroke();
        switch(goodTypes[i].type) {
            case 0:
                fill(220, 50, 50);
                circle(0, 0, 22);
                fill(255, 100, 100);
                circle(-4, -4, 6);
                stroke(100, 70, 40);
                strokeWeight(2);
                line(0, -11, 0, -16);
                fill(50, 150, 50);
                noStroke();
                ellipse(6, -14, 6, 3);
                break;
            case 1:
                fill(255, 220, 50);
                noStroke();
                
                beginShape();
                vertex(-12, -2);
                vertex(-8, -6);
                vertex(-2, -8);
                vertex(4, -8);
                vertex(10, -6);
                vertex(14, -2);
                vertex(15, 2);
                vertex(10, 0);
                vertex(4, -2);
                vertex(-2, -3);
                vertex(-8, -1);
                vertex(-12, 2);
                endShape(CLOSE);
                
                fill(180, 140, 60);
                ellipse(14, -1, 6, 4);
                
                fill(100, 80, 40);
                ellipse(-12, 0, 7, 4);
                line(-14, 0, -18, -1);
                
                stroke(230, 190, 40);
                strokeWeight(1);
                noFill();
                arc(-6, -3, 14, 8, -0.3, 1.0);
                arc(1, -4, 12, 8, -0.2, 1.0);
                arc(8, -3, 10, 7, 0, 1.0);
                
                noStroke();
                fill(255, 250, 150, 120);
                ellipse(2, -5, 8, 5);
                break;
            case 2:
                fill(255, 140, 0);
                circle(0, 0, 20);
                stroke(255, 160, 20);
                strokeWeight(1);
                line(-10, 0, 10, 0);
                line(0, -10, 0, 10);
                line(-7, -7, 7, 7);
                line(-7, 7, 7, -7);
                noStroke();
                fill(50, 150, 50);
                ellipse(0, -11, 5, 8);
                break;
            case 3:
                fill(220, 40, 60);
                beginShape();
                for (let j = 0; j < 6; j++) {
                    let angle = j * TWO_PI / 6;
                    let x = cos(angle) * 10;
                    let y = sin(angle) * 10;
                    vertex(x, y + 2);
                }
                endShape(CLOSE);
                triangle(-5, 2, 5, 2, 0, 12);
                fill(255, 200, 50);
                for (let j = -3; j <= 3; j++) {
                    for (let k = -2; k <= 2; k++) {
                        if (abs(j) + abs(k) < 5) {
                            circle(j * 3, k * 3 + 2, 2);
                        }
                    }
                }
                fill(50, 150, 50);
                for (let j = 0; j < 5; j++) {
                    let angle = (j * TWO_PI / 5) - HALF_PI;
                    let x = cos(angle) * 12;
                    let y = sin(angle) * 12 - 8;
                    ellipse(x, y, 4, 7);
                }
                break;
            case 4:
                fill(35, 85, 35);
                circle(0, 0, 24);
                
                noStroke();
                fill(50, 120, 50);
                arc(0, -2, 22, 20, 0, PI);
                
                stroke(20, 60, 20);
                strokeWeight(2);
                for (let i = 0; i < 8; i++) {
                    let angle = i * TWO_PI / 8;
                    let x1 = cos(angle) * 11;
                    let y1 = sin(angle) * 11;
                    let x2 = cos(angle + 0.3) * 8;
                    let y2 = sin(angle + 0.3) * 8;
                    line(x1, y1, x2, y2);
                }
                
                noFill();
                stroke(25, 70, 25);
                strokeWeight(1.5);
                for (let i = -2; i <= 2; i++) {
                    arc(i * 3, 0, 20, 18, -0.8, 0.8);
                }
                
                noStroke();
                fill(100, 180, 100, 100);
                ellipse(-6, -6, 8, 6);
                
                fill(80, 60, 30);
                ellipse(0, -13, 5, 4);
                stroke(80, 60, 30);
                strokeWeight(2);
                line(0, -13, 2, -17);
                line(0, -13, -2, -16);
                
                noFill();
                stroke(70, 50, 25);
                strokeWeight(1.5);
                arc(3, -15, 6, 6, -1.5, 0);
                
                noStroke();
                fill(0, 0, 0, 50);
                ellipse(0, 10, 20, 6);
                break;
        }
        pop();
        
        fill(255);
        textSize(12);
        textAlign(CENTER);
        text(goodTypes[i].name, goodTypes[i].x, goodTypes[i].y + 28);
    }
    
    fill(255, 80, 80);
    textSize(18);
    textAlign(CENTER);
    text("BAD FOOD (-1 health)", width/2 + 200, 320);
    
    let badX = width/2 + 100;
    let badY = 360;
    let badTypes = [
        { type: 0, name: "Poison Mushroom", x: badX, y: badY },
        { type: 1, name: "Rotten Apple", x: badX + 85, y: badY },
        { type: 2, name: "Toxic Egg", x: badX + 170, y: badY },
        { type: 3, name: "Bad Berry", x: badX + 255, y: badY }
    ];
    
    for (let i = 0; i < badTypes.length; i++) {
        push();
        translate(badTypes[i].x, badTypes[i].y);
        
        noStroke();
        switch(badTypes[i].type) {
            case 0:
                fill(150, 80, 180);
                arc(0, -2, 22, 14, PI, TWO_PI);
                fill(255, 255, 255, 200);
                circle(-7, -6, 4);
                circle(0, -7, 4);
                circle(7, -6, 4);
                fill(200, 150, 220);
                rect(-4, 3, 8, 10, 2);
                break;
            case 1:
                fill(120, 50, 150);
                circle(0, 0, 20);
                fill(80, 30, 100);
                circle(-6, -4, 5);
                circle(5, 5, 6);
                circle(-3, 6, 4);
                fill(20, 10, 30);
                circle(-5, -6, 2.5);
                circle(4, 2, 2.5);
                circle(0, -8, 2.5);
                break;
            case 2:
                fill(130, 70, 160);
                ellipse(0, 0, 16, 22);
                stroke(100, 40, 130);
                strokeWeight(1.5);
                line(-5, -8, -2, 0);
                line(4, -7, 6, 3);
                noStroke();
                fill(180, 100, 200);
                circle(-4, 4, 4);
                circle(5, -2, 3);
                break;
            case 3:
                fill(140, 60, 170);
                circle(0, 0, 18);
                stroke(100, 40, 130);
                strokeWeight(2);
                for (let j = 0; j < 8; j++) {
                    let angle = j * TWO_PI / 8;
                    let x1 = cos(angle) * 8;
                    let y1 = sin(angle) * 8;
                    let x2 = cos(angle) * 16;
                    let y2 = sin(angle) * 16;
                    line(x1, y1, x2, y2);
                }
                break;
        }
        pop();
        
        fill(255);
        textSize(11);
        textAlign(CENTER);
        text(badTypes[i].name, badTypes[i].x, badTypes[i].y + 32);
    }
    
    fill(200, 200, 200);
    textSize(18);
    textAlign(CENTER);
    text("MOVING SAW (-1 health)", width/2 + 200, 480);
    
    push();
    translate(width/2 + 200, 520);
    
    fill(120, 120, 130);
    circle(0, 0, 28);
    fill(80, 80, 90);
    circle(0, 0, 22);
    fill(150, 150, 160);
    for (let j = 0; j < 12; j++) {
        let angle = j * TWO_PI / 12;
        let x1 = cos(angle) * 11;
        let y1 = sin(angle) * 11;
        let x2 = cos(angle) * 15;
        let y2 = sin(angle) * 15;
        line(x1, y1, x2, y2);
    }
    fill(60, 60, 70);
    circle(0, 0, 8);
    fill(100, 100, 110);
    circle(0, 0, 4);
    
    pop();
    
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text("Moving Saw", width/2 + 200, 555);
    
    let btnX = width/2 - 100;
    let btnY = height - 50;
    let btnW = 200;
    let btnH = 45;
    
    let hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hover ? color(100, 255, 100) : color(80, 200, 80));
    rect(btnX, btnY, btnW, btnH, 25);
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("PLAY NOW!", width/2, btnY + 30);
}

function drawGame() {
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(135, 206, 235), color(70, 130, 200), inter);
        stroke(c);
        line(0, i, width, i);
    }
    
    fill(80, 140, 60);
    noStroke();
    rect(0, height - 60, width, 60);
    
    fill(100, 170, 70);
    for (let i = 0; i < width; i += 75) {
        rect(i, height - 65, 5, 15);
    }
    
    handleMovement();
    handleCollisions();
    updateAnimation();
    updateJetpackParticles();

    
    if (currentLevel === 1 && score >= 10 && !showingLevelTransition) {
        showingLevelTransition = true;
        levelTransitionTime = 180;
    }
    
    if (showingLevelTransition) {
        levelTransitionTime--;
        if (levelTransitionTime <= 0) {
            showingLevelTransition = false;
            currentLevel = 2;
            for (let i = 0; i < 3; i++) {
                movingSaws.push(MovingSaw.createRandom());
            }
        }
    }
    
    for (let s of movingSaws) {
        s.update();
        MovingSaw.draw(s);
    }

    for (let obs of obstacles) {
        Obstacle.draw(obs);
    }
    
    for (let food of goodFoods) {
        GoodFood.draw(food);
    }
    
    for (let bad of badFoods) {
        BadFood.draw(bad);
    }
    
    if (player) {
        push();
        translate(player.x, player.y);
        if (lastDirection === 'left') scale(-1, 1);
        imageMode(CENTER);
        image(playerAnimation[currentFrame], 0, 0);
        pop();
    }
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) particles.splice(i, 1);
    }
    
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        floatingTexts[i].update();
        floatingTexts[i].show();
        if (floatingTexts[i].finished()) floatingTexts.splice(i, 1);
    }
    
    if (showingLevelTransition) {
        drawLevelTransition();
    }
    
    drawUI();
    
    if (score >= winCondition) {
        gameState = 'gameover';
        playWinSound();
        stopBackgroundMusic();
        if (score > highScore) highScore = score;
    }
    
    if (health <= 0) {
        gameState = 'gameover';
        playHurtSound();
        stopBackgroundMusic();
    }
}

function updateJetpackParticles() {
    for (let i = jetpackParticles.length - 1; i >= 0; i--) {
        jetpackParticles[i].update();
        jetpackParticles[i].show();
        if (jetpackParticles[i].finished()) {
            jetpackParticles.splice(i, 1);
        }
    }
}

function handleMovement() {
    if (!player || gameState !== 'playing') return;
    
    let moveX = 0, moveY = 0;
    let movingDirection = 'none';
    
    if (upPressed) {
        moveY -= 1;
        movingDirection = 'up';
    }
    if (downPressed) {
        moveY += 1;
        movingDirection = 'down';
    }
    if (leftPressed) {
        moveX -= 1;
        movingDirection = 'left';
    }
    if (rightPressed) {
        moveX += 1;
        movingDirection = 'right';
    }
    
    if (moveX !== 0 || moveY !== 0) {
        let particleCount = floor(random(2, 5));
        
        for (let i = 0; i < particleCount; i++) {
            let angle = 0;
            let offsetX = 0;
            let offsetY = 0;
            
            switch(movingDirection) {
                case 'up':
                    offsetX = random(-12, 12);
                    offsetY = 25;
                    angle = random(PI - 0.5, PI + 0.5);
                    break;
                case 'down':
                    offsetX = random(-12, 12);
                    offsetY = -25;
                    angle = random(-0.5, 0.5);
                    break;
                case 'left':
                    offsetX = 25;
                    offsetY = random(-12, 12);
                    angle = random(-0.2, 0.2);
                    break;
                case 'right':
                    offsetX = -25;
                    offsetY = random(-12, 12);
                    angle = random(PI - 0.2, PI + 0.2);
                    break;
            }
            
            let jetParticle = new JetpackParticle(
                player.x + offsetX,
                player.y + offsetY,
                angle
            );
            jetpackParticles.push(jetParticle);
        }
        
        if (moveX !== 0 && moveY !== 0) {
            let len = Math.hypot(moveX, moveY);
            moveX /= len;
            moveY /= len;
            for (let i = 0; i < 2; i++) {
                let angle = 0;
                let offsetX = 0;
                let offsetY = 0;
                if (upPressed && leftPressed) {
                    offsetX = 20;
                    offsetY = 20;
                    angle = random(PI * 0.6, PI * 0.8);
                } else if (upPressed && rightPressed) {
                    offsetX = -20;
                    offsetY = 20;
                    angle = random(PI * 1.2, PI * 1.4);
                } else if (downPressed && leftPressed) {
                    offsetX = 20;
                    offsetY = -20;
                    angle = random(-0.8, -0.6);
                } else if (downPressed && rightPressed) {
                    offsetX = -20;
                    offsetY = -20;
                    angle = random(0.6, 0.8);
                }
                let jetParticle = new JetpackParticle(
                    player.x + offsetX,
                    player.y + offsetY,
                    angle
                );
                jetpackParticles.push(jetParticle);
            }
        }
        
        playerSpeed += acceleration;
        playerSpeed = min(playerSpeed, maxSpeed);
        
        player.vel.x = moveX * playerSpeed;
        player.vel.y = moveY * playerSpeed;
        isMoving = true;
        
        if (moveX !== 0) lastDirection = moveX > 0 ? 'right' : 'left';
        else if (moveY !== 0) lastDirection = moveY > 0 ? 'down' : 'up';
    } else {
        playerSpeed *= deceleration;
        if (playerSpeed < 0.1) playerSpeed = 0;
        
        player.vel.x *= groundDrag;
        player.vel.y *= groundDrag;
        isMoving = false;
    }
    
    player.x += player.vel.x;
    player.y += player.vel.y;
    
    player.x = constrain(player.x, 35, width - 35);
    player.y = constrain(player.y, 50, height - 65);
    
    if (player.x <= 35 || player.x >= width - 35) {
        player.vel.x *= 0.9;
    }
    if (player.y <= 50 || player.y >= height - 65) {
        player.vel.y *= 0.9;
    }
}

function handleCollisions() {
    if (!player) return;
    
    for (let i = goodFoods.length - 1; i >= 0; i--) {
        if (player.collides(goodFoods[i].sprite)) {
            score++;
            playEatSound();
            goodFoods[i].remove();
            goodFoods.splice(i, 1);
            goodFoods.push(GoodFood.createRandom());
            for (let j = 0; j < 10; j++) particles.push(new Particle(player.x, player.y, color(255, 215, 0)));
            floatingTexts.push(new FloatingText(player.x, player.y - 30, "+1", color(255, 215, 0)));
        }
    }
    
    for (let i = badFoods.length - 1; i >= 0; i--) {
        if (player.collides(badFoods[i].sprite)) {
            health--;
            playHurtSound();
            badFoods[i].remove();
            badFoods.splice(i, 1);
            badFoods.push(BadFood.createRandom());
            for (let j = 0; j < 15; j++) particles.push(new Particle(player.x, player.y, color(128, 0, 128)));
            floatingTexts.push(new FloatingText(player.x, player.y - 30, "-1 HP", color(255, 80, 80)));
        }
    }
    
    for (let i = movingSaws.length - 1; i >= 0; i--) {
        if (player.collides(movingSaws[i].sprite)) {
            health--;
            playHurtSound();
            movingSaws[i].remove();
            movingSaws.splice(i, 1);
            movingSaws.push(MovingSaw.createRandom());
            for (let j = 0; j < 20; j++) particles.push(new Particle(player.x, player.y, color(200, 100, 100)));
            floatingTexts.push(new FloatingText(player.x, player.y - 30, "-1 HP", color(255, 80, 80)));
        }
    }

    for (let obs of obstacles) {
        if (player.collides(obs.sprite)) {
            if (upPressed) player.y += 3;
            if (downPressed) player.y -= 3;
            if (leftPressed) player.x += 3;
            if (rightPressed) player.x -= 3;
        }
    }
}

function updateAnimation() {
    frameDelay++;
    if (frameDelay >= 6) {
        frameDelay = 0;
        if (isMoving) currentFrame = (currentFrame % 4) + 4;
        else currentFrame = (currentFrame + 1) % 4;
    }
}

function drawUI() {
    for (let i = 0; i < 3; i++) {
        if (i < health) {
            fill(255, 80, 100);
            textSize(28);
            text("❤️", 15 + i * 35, 45);
        }
    }
    
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT);
    text("SCORE: " + score, 15, 85);
    
    fill(200);
    textSize(14);
    text("Goal: " + score + " / " + winCondition, 15, 115);
    
    fill(100, 200, 255);
    textSize(18);
    text("LEVEL: " + currentLevel, 15, 145);
    
    if (score > highScore) highScore = score;
    fill(255, 200, 100);
    textSize(16);
    textAlign(RIGHT);
    text("HIGH SCORE: " + highScore, width - 20, 45);
    
    let progress = score / winCondition;
    fill(50);
    rect(width/2 - 100, 25, 200, 15, 7);
    fill(255, 215, 0);
    rect(width/2 - 100, 25, 200 * min(progress, 1), 15, 7);
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text("WIN PROGRESS", width/2, 22);
}

function drawGameOverScreen() {
    background(0, 0, 0, 220);
    
    let isWin = score >= winCondition;
    
    if (isWin) {
        fill(255, 215, 0);
        textSize(56);
        textAlign(CENTER);
        text("🎉 YOU WIN! 🎉", width/2, height/2 - 80);
        fill(255);
        textSize(28);
        text("You collected " + score + " points!", width/2, height/2 - 20);
    } else {
        fill(255, 80, 80);
        textSize(56);
        text("💀 GAME OVER 💀", width/2, height/2 - 80);
        fill(255);
        textSize(28);
        text("You collected " + score + " points", width/2, height/2 - 20);
    }
    
    fill(255, 200, 100);
    textSize(20);
    text("HIGH SCORE: " + highScore, width/2, height/2 + 40);
    
    let btnX = width/2 - 130;
    let btnY = height/2 + 100;
    let btnW = 120;
    let btnH = 45;
    
    let hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hover ? color(100, 255, 100) : color(80, 200, 80));
    rect(btnX, btnY, btnW, btnH, 25);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("PLAY AGAIN", btnX + btnW/2, btnY + 28);
    
    let prizeBtnX = width/2 + 10;
    let prizeBtnY = height/2 + 100;
    let prizeBtnW = 120;
    let prizeBtnH = 45;
    
    let prizeHover = mouseX > prizeBtnX && mouseX < prizeBtnX + prizeBtnW && mouseY > prizeBtnY && mouseY < prizeBtnY + prizeBtnH;
    fill(prizeHover ? color(255, 200, 50) : color(255, 180, 30));
    rect(prizeBtnX, prizeBtnY, prizeBtnW, prizeBtnH, 25);
    fill(80, 50, 20);
    textSize(14);
    text("REVEAL PRIZE", prizeBtnX + prizeBtnW/2, prizeBtnY + 28);
    
}

function mousePressed() {
    if (gameState === 'welcome') {
        let btnX = width/2 - 100;
        let btnY = height/2 + 170;
        let btnW = 200;
        let btnH = 50;
        
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            gameState = 'instructions';
        }
        return;
    }
    
    if (gameState === 'instructions') {
        let btnX = width/2 - 100;
        let btnY = height - 50;
        let btnW = 200;
        let btnH = 45;
        
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            setupGame();
        }
        return;
    }
    
    if (gameState === 'gameover') {
        let btnX = width/2 - 130;
        let btnY = height/2 + 100;
        let btnW = 120;
        let btnH = 45;
        
        let prizeBtnX = width/2 + 10;
        let prizeBtnY = height/2 + 100;
        let prizeBtnW = 120;
        let prizeBtnH = 45;
        
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            setupGame();
        }
        
        if (mouseX > prizeBtnX && mouseX < prizeBtnX + prizeBtnW && mouseY > prizeBtnY && mouseY < prizeBtnY + prizeBtnH) {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1', '_blank');
        }
        
        return;
    }
}

function handleKeyDown(event) {
    let key = event.key;
    
    if (key === 'w' || key === 'W' || key === 'ArrowUp' ||
        key === 's' || key === 'S' || key === 'ArrowDown' ||
        key === 'a' || key === 'A' || key === 'ArrowLeft' ||
        key === 'd' || key === 'D' || key === 'ArrowRight') {
        event.preventDefault();
    }
    
    if (gameState === 'welcome') {
        gameState = 'instructions';
        return;
    }
    
    if (gameState === 'instructions') {
        return;
    }
    
    if (gameState === 'gameover') {
        return;
    }
    
    if (gameState === 'playing') {
        if (key === 'w' || key === 'W' || key === 'ArrowUp') upPressed = true;
        if (key === 's' || key === 'S' || key === 'ArrowDown') downPressed = true;
        if (key === 'a' || key === 'A' || key === 'ArrowLeft') leftPressed = true;
        if (key === 'd' || key === 'D' || key === 'ArrowRight') rightPressed = true;
    }
}

function handleKeyUp(event) {
    let key = event.key;
    if (key === 'w' || key === 'W' || key === 'ArrowUp') upPressed = false;
    if (key === 's' || key === 'S' || key === 'ArrowDown') downPressed = false;
    if (key === 'a' || key === 'A' || key === 'ArrowLeft') leftPressed = false;
    if (key === 'd' || key === 'D' || key === 'ArrowRight') rightPressed = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor(x, y, colorVal) {
        this.x = x; this.y = y;
        this.vx = random(-2, 2); this.vy = random(-3, -1);
        this.size = random(3, 8);
        this.colorVal = colorVal;
        this.lifespan = 255;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        this.vy += 0.2;
        this.lifespan -= 8;
    }
    show() {
        noStroke();
        fill(red(this.colorVal), green(this.colorVal), blue(this.colorVal), this.lifespan);
        ellipse(this.x, this.y, this.size);
    }
    finished() { return this.lifespan <= 0; }
}

class FloatingText {
    constructor(x, y, text, colorVal) {
        this.x = x; this.y = y;
        this.text = text; this.colorVal = colorVal;
        this.life = 60;
    }
    update() { this.y -= 1; this.life--; }
    show() {
        push();
        fill(this.colorVal);
        textSize(16);
        textAlign(CENTER);
        text(this.text, this.x, this.y);
        pop();
    }
    finished() { return this.life <= 0; }
}

class JetpackParticle {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.vx = cos(angle) * random(2, 5);
        this.vy = sin(angle) * random(2, 5);
        this.size = random(3, 8);
        this.lifespan = 255;
        this.angle = angle;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan -= 12;
        this.size *= 0.95;
    }
    
    show() {
        push();
        noStroke();
        let r = constrain(255 - this.lifespan * 0.5, 200, 255);
        let g = constrain(150 - this.lifespan * 0.3, 50, 200);
        let b = 0;
        fill(r, g, b, this.lifespan);
        ellipse(this.x, this.y, this.size);
        pop();
    }
    
    finished() {
        return this.lifespan <= 0;
    }
}
