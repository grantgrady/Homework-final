class GoodFood {
    constructor(x, y, type = 0) {
        this.sprite = new Sprite(x, y, 38, 38);
        this.sprite.collider = 'static';
        this.sprite.type = 'good';
        this.sprite.visible = false;
        this.foodType = type;
        this.bobOffset = random(TWO_PI);
    }
    
    static createRandom() {
        let x = random(50, width - 50);
        let y = random(60, height - 80);
        let type = floor(random(5));
        return new GoodFood(x, y, type);
    }
    
    static draw(food) {
        push();
        translate(food.sprite.x, food.sprite.y);
        
        let bob = sin(frameCount * 0.05 + food.bobOffset) * 3;
        translate(0, bob);
        
        noStroke();
        
        switch(food.foodType) {
            case 0:
                fill(220, 50, 50);
                circle(0, 0, 24);
                fill(255, 100, 100);
                circle(-5, -5, 7);
                stroke(100, 70, 40);
                strokeWeight(2);
                line(0, -12, 0, -18);
                fill(50, 150, 50);
                noStroke();
                ellipse(7, -16, 7, 4);
                fill(255, 150, 150, 100);
                ellipse(-6, -6, 6, 4);
                break;
                
            case 1:
                fill(255, 220, 50);
                noStroke();
                
                beginShape();
                vertex(-14, -3);
                vertex(-9, -8);
                vertex(-2, -10);
                vertex(5, -9);
                vertex(12, -6);
                vertex(16, -2);
                vertex(17, 3);
                vertex(12, 1);
                vertex(5, -2);
                vertex(-2, -3);
                vertex(-9, -1);
                vertex(-14, 3);
                endShape(CLOSE);
                
                fill(180, 140, 60);
                ellipse(16, -1, 7, 5);
                
                fill(100, 80, 40);
                ellipse(-14, 0, 8, 5);
                stroke(100, 80, 40);
                strokeWeight(2);
                line(-16, 0, -20, -1);
                
                stroke(230, 190, 40);
                strokeWeight(1);
                noFill();
                arc(-7, -4, 16, 10, -0.3, 1.0);
                arc(1, -5, 14, 9, -0.2, 1.0);
                arc(9, -4, 12, 8, 0, 1.0);
                
                noStroke();
                fill(255, 250, 150, 120);
                ellipse(2, -6, 10, 6);
                break;
                
            case 2:
                fill(255, 140, 0);
                circle(0, 0, 22);
                stroke(255, 160, 20);
                strokeWeight(1.5);
                line(-11, 0, 11, 0);
                line(0, -11, 0, 11);
                line(-8, -8, 8, 8);
                line(-8, 8, 8, -8);
                noStroke();
                fill(50, 150, 50);
                ellipse(0, -12, 6, 9);
                fill(255, 160, 50, 100);
                for (let i = 0; i < 8; i++) {
                    let angle = random(TWO_PI);
                    let rad = random(5, 10);
                    circle(cos(angle) * rad, sin(angle) * rad, 2);
                }
                break;
                
            case 3:
                fill(220, 40, 60);
                beginShape();
                for (let i = 0; i < 6; i++) {
                    let angle = i * TWO_PI / 6;
                    let x = cos(angle) * 11;
                    let y = sin(angle) * 11;
                    vertex(x, y + 2);
                }
                endShape(CLOSE);
                triangle(-5, 2, 5, 2, 0, 14);
                fill(255, 200, 50);
                for (let i = -4; i <= 4; i++) {
                    for (let j = -3; j <= 3; j++) {
                        if (abs(i) + abs(j) < 6) {
                            circle(i * 3.5, j * 3.5 + 2, 2);
                        }
                    }
                }
                fill(50, 150, 50);
                for (let i = 0; i < 5; i++) {
                    let angle = (i * TWO_PI / 5) - HALF_PI;
                    let x = cos(angle) * 14;
                    let y = sin(angle) * 14 - 10;
                    ellipse(x, y, 5, 8);
                }
                fill(255, 150, 150, 100);
                ellipse(-4, -4, 6, 4);
                break;
                
            case 4:
                fill(35, 85, 35);
                circle(0, 0, 26);
                
                noStroke();
                fill(50, 120, 50);
                ellipse(-5, -3, 12, 10);
                ellipse(6, 2, 10, 8);
                
                stroke(20, 60, 20);
                strokeWeight(2);
                for (let i = 0; i < 8; i++) {
                    let angle = i * TWO_PI / 8;
                    let x1 = cos(angle) * 12;
                    let y1 = sin(angle) * 12;
                    let x2 = cos(angle + 0.3) * 9;
                    let y2 = sin(angle + 0.3) * 9;
                    line(x1, y1, x2, y2);
                }
                
                noFill();
                stroke(25, 70, 25);
                strokeWeight(1.5);
                for (let i = -2; i <= 2; i++) {
                    arc(i * 4, 0, 22, 20, -0.8, 0.8);
                }
                
                noStroke();
                fill(100, 180, 100, 120);
                ellipse(-7, -7, 9, 7);
                
                fill(80, 60, 30);
                ellipse(0, -14, 6, 5);
                stroke(80, 60, 30);
                strokeWeight(2);
                line(0, -14, 2, -19);
                line(0, -14, -2, -18);
                
                noFill();
                stroke(70, 50, 25);
                strokeWeight(1.5);
                arc(4, -17, 8, 8, -1.5, 0);
                
                noStroke();
                fill(0, 0, 0, 50);
                ellipse(0, 12, 22, 7);
                break;
        }
        pop();
    }
    
    remove() {
        if (this.sprite) this.sprite.remove();
    }
}

class BadFood {
    constructor(x, y, type = 0) {
        this.sprite = new Sprite(x, y, 40, 40);
        this.sprite.collider = 'static';
        this.sprite.type = 'bad';
        this.sprite.visible = false;
        this.foodType = type;
        this.wobbleOffset = random(TWO_PI);
    }
    
    static createRandom() {
        let x = random(50, width - 50);
        let y = random(60, height - 80);
        let type = floor(random(4));
        return new BadFood(x, y, type);
    }
    
    static draw(bad) {
        push();
        translate(bad.sprite.x, bad.sprite.y);
        
        let wobble = sin(frameCount * 0.08 + bad.wobbleOffset) * 4;
        rotate(wobble * 0.02);
        
        noStroke();
        
        switch(bad.foodType) {
            case 0:
                fill(150, 80, 180);
                arc(0, -3, 24, 16, PI, TWO_PI);
                fill(255, 255, 255, 200);
                circle(-8, -7, 5);
                circle(0, -8, 5);
                circle(8, -7, 5);
                circle(-4, -3, 4);
                circle(4, -3, 4);
                fill(200, 150, 220);
                rect(-5, 3, 10, 12, 3);
                fill(200, 100, 200, 80);
                circle(0, 0, 30);
                break;
                
            case 1:
                fill(120, 50, 150);
                circle(0, 0, 22);
                fill(80, 30, 100);
                circle(-7, -5, 6);
                circle(6, 6, 7);
                circle(-3, 7, 5);
                fill(20, 10, 30);
                circle(-6, -7, 3);
                circle(5, 3, 3);
                circle(0, -9, 3);
                circle(-8, 2, 2.5);
                fill(60, 20, 80);
                circle(-3, -2, 4);
                circle(4, 1, 5);
                break;
                
            case 2:
                fill(130, 70, 160);
                ellipse(0, 0, 18, 26);
                stroke(100, 40, 130);
                strokeWeight(2);
                line(-6, -10, -3, 0);
                line(5, -9, 7, 4);
                line(-7, 2, -4, 8);
                noStroke();
                fill(180, 100, 200);
                circle(-5, 5, 5);
                circle(6, -3, 4);
                circle(-2, -6, 3);
                fill(150, 80, 180);
                ellipse(-8, 8, 4, 6);
                ellipse(7, 9, 4, 5);
                break;
                
            case 3:
                fill(140, 60, 170);
                circle(0, 0, 22);
                stroke(100, 40, 130);
                strokeWeight(2.5);
                for (let i = 0; i < 8; i++) {
                    let angle = i * TWO_PI / 8;
                    let x1 = cos(angle) * 10;
                    let y1 = sin(angle) * 10;
                    let x2 = cos(angle) * 18;
                    let y2 = sin(angle) * 18;
                    line(x1, y1, x2, y2);
                }
                noStroke();
                fill(100, 40, 130);
                circle(0, 0, 14);
                fill(255, 50, 50);
                ellipse(-4, -3, 4, 5);
                ellipse(4, -3, 4, 5);
                fill(0);
                ellipse(-4, -4, 2, 3);
                ellipse(4, -4, 2, 3);
                break;
        }
        pop();
    }
    
    remove() {
        if (this.sprite) this.sprite.remove();
    }
}

class Obstacle {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 45, 45);
        this.sprite.collider = 'static';
        this.sprite.type = 'obstacle';
        this.sprite.visible = false;
    }
    
    static createRandom() {
        let x = random(70, width - 70);
        let y = random(80, height - 90);
        return new Obstacle(x, y);
    }
    
    static draw(obs) {
        push();
        translate(obs.sprite.x, obs.sprite.y);
        
        fill(180, 100, 70);
        rectMode(CENTER);
        rect(0, 0, 42, 42, 5);
        
        stroke(140, 70, 50);
        strokeWeight(2);
        line(-18, -10, 18, -10);
        line(-18, 0, 18, 0);
        line(-18, 10, 18, 10);
        
        stroke(140, 70, 50);
        strokeWeight(1.5);
        line(-5, -20, -5, -4);
        line(10, -20, 10, -4);
        line(-15, -4, -15, 4);
        line(0, -4, 0, 4);
        line(15, -4, 15, 4);
        line(-5, 4, -5, 20);
        line(10, 4, 10, 20);
        
        noStroke();
        fill(200, 120, 90, 80);
        rect(-15, -15, 8, 8, 2);
        rect(8, -15, 8, 8, 2);
        rect(-8, -5, 8, 8, 2);
        rect(8, -5, 8, 8, 2);
        rect(-15, 5, 8, 8, 2);
        rect(5, 5, 8, 8, 2);
        
        stroke(160, 90, 60);
        strokeWeight(1);
        for (let i = -20; i <= 20; i += 10) {
            point(i, -18);
            point(i, -8);
            point(i, 2);
            point(i, 12);
            point(i, 18);
        }
        
        pop();
    }
    
    remove() {
        if (this.sprite) this.sprite.remove();
    }
}

class MovingSaw {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        if (abs(this.vx) < 1) this.vx = (this.vx > 0) ? 1.5 : -1.5;
        if (abs(this.vy) < 1) this.vy = (this.vy > 0) ? 1.5 : -1.5;
        this.size = 28;
        this.rotation = 0;
        this.sprite = new Sprite(this.x, this.y, this.size, this.size);
        this.sprite.collider = 'static';
        this.sprite.type = 'saw';
        this.sprite.visible = false;
    }
    
    static createRandom() {
        let x = random(50, width - 50);
        let y = random(60, height - 80);
        return new MovingSaw(x, y);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.1;
        
        if (this.x < 35 || this.x > width - 35) this.vx *= -1;
        if (this.y < 65 || this.y > height - 85) this.vy *= -1;
        
        this.x = constrain(this.x, 35, width - 35);
        this.y = constrain(this.y, 65, height - 85);
        
        if (this.sprite) {
            this.sprite.x = this.x;
            this.sprite.y = this.y;
        }
    }
    
    static draw(saw) {
        push();
        translate(saw.x, saw.y);
        rotate(saw.rotation);
        
        fill(120, 120, 130);
        circle(0, 0, saw.size);
        
        fill(80, 80, 90);
        circle(0, 0, saw.size - 6);
        
        fill(150, 150, 160);
        for (let i = 0; i < 12; i++) {
            let angle = i * TWO_PI / 12;
            let x1 = cos(angle) * (saw.size/2 - 3);
            let y1 = sin(angle) * (saw.size/2 - 3);
            let x2 = cos(angle) * (saw.size/2 + 3);
            let y2 = sin(angle) * (saw.size/2 + 3);
            line(x1, y1, x2, y2);
        }
        
        fill(60, 60, 70);
        circle(0, 0, 8);
        fill(100, 100, 110);
        circle(0, 0, 4);
        
        fill(180, 180, 190, 100);
        ellipse(-4, -4, 6, 5);
        
        pop();
    }
    
    remove() {
        if (this.sprite) this.sprite.remove();
    }
}
