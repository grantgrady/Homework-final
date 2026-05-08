# Final Project - Jetpack Food Adventure
## Name: Grant Grady

## Project Overview
This is a 2D food-collection game built with **p5.js**, **p5.sound.min.js** and the **p5play.js** library. The player controls a character with a **jetpack** using WASD or arrow keys, must collect 5 different types of good food while avoiding 4 different types of bad food, brick wall obstacles, and moving saws. The game features a two-level system, particle effects, jetpack flame effects, sound effects, background music, and a prize redemption system.

## Technologies Used
Built with **p5.js 1.9.0** and **p5.play v3**

## How to Run
1. Download or clone this repository
2. Make sure all files maintain the following folder structure
3. Open **index.html** in a modern web browser (Chrome, Firefox, Edge)
4. Wait for loading screen to complete
5. Click **START GAME** button on welcome screen
6. Read instructions, then click **PLAY NOW** button
7. Enjoy the game!

## Features

| Feature | Description |
|---------|-------------|
| **Player Character** | Animated character with idle/walking cycles, detailed face, hands, and shoes |
| **Jetpack System** | Flame particles appear on opposite side of movement direction (flames below when moving up, etc.) |
| **5 Good Food Types** | Apple, Banana, Orange, Strawberry, Watermelon (+1 point each, respawn with bobbing animation) |
| **4 Bad Food Types** | Poison Mushroom, Rotten Apple, Toxic Egg, Bad Berry (-1 health, respawn with wobble) |
| **5 Brick Wall Obstacles** | Static obstacles with realistic brick texture that block player movement |
| **3 Moving Saws** | Appear in Level 2, move randomly, bounce off walls, respawn on hit (-1 health) |
| **Health System** | 3 hearts displayed; hearts removed when life lost |
| **Score System** | Tracks current score and persistent high score |
| **Two-Level System** | Level 1 (0-9 points), Level 2 (10-20 points with moving saws) |
| **Level Transition** | Dramatic "LEVEL 2" screen with warning when entering Level 2 |
| **Win Condition** | Reach 20 points to win the game |
| **Lose Condition** | Game over when health reaches zero |
| **Visual Feedback** | Particle explosions, floating text (+1, -1 HP), progress bar, bobbing food animations, wobbling bad food |
| **Jetpack Particles** | Orange/yellow/red flame particles that shoot from opposite side of movement |
| **Audio Feedback** | Good food sound, bad food sound, win fanfare, looping background music |
| **Prize System** | "REVEAL PRIZE" button on game over screen opens external prize link |
| **Screens/Scenes** | Loading screen, welcome screen (with image), instructions screen, game screen, level transition screen, game over screen |

## Game Controls

| Action | Control |
|--------|---------|
| Move Up | W or ↑ Arrow |
| Move Down | S or ↓ Arrow |
| Move Left | A or ← Arrow |
| Move Right | D or → Arrow |
| Start Game | Click START GAME button |
| Play Game | Click PLAY NOW button |
| Restart | Click PLAY AGAIN button |
| Claim Prize | Click REVEAL PRIZE button |

## Technical Implementation

### External Libraries Used
- **p5.js 1.9.0** — Core graphics and animation
- **p5.sound.min.js** — Audio playback for sound effects and music
- **planck.js** — Physics engine required by p5.play
- **p5.play v3** — Sprite management, collision detection, physics

### Key Components

| Component | File Location | Description |
|-----------|---------------|-------------|
| `GoodFood` class | `js/food.js` | 5 types of good food with bobbing animation |
| `BadFood` class | `js/food.js` | 4 types of bad food with wobble animation |
| `Obstacle` class | `js/food.js` | Brick wall obstacles with realistic texture |
| `MovingSaw` class | `js/food.js` | Moving saw hazards that appear in Level 2 |
| `Particle` class | `js/sketch.js` | Visual effects on collection/hits |
| `JetpackParticle` class | `js/sketch.js` | Flame particles for jetpack effect |
| `FloatingText` class | `js/sketch.js` | Animated score/health feedback |
| `setupGame()` | `js/sketch.js` | Initializes game state and spawns objects |
| `handleMovement()` | `js/sketch.js` | Player input, acceleration/deceleration, jetpack particles |
| `handleCollisions()` | `js/sketch.js` | Collision detection with all game objects |
| `drawUI()` | `js/sketch.js` | Health hearts, score display, progress bar, level indicator |
| `drawLevelTransition()` | `js/sketch.js` | Visual transition for Level 2 |
| `drawWelcomeScreen()` | `js/sketch.js` | Animated intro screen with image banner |
| `drawInstructionsScreen()` | `js/sketch.js` | How-to-play guide with food examples |
| `drawGameOverScreen()` | `js/sketch.js` | Win/lose results with high score and prize button |

### Code Organization
- **`index.html`** — Main HTML file with styling and library loading
- **`js/food.js`** — Contains all game object classes (GoodFood, BadFood, MovingSaw, Obstacle)
- **`js/sketch.js`** — Contains all game logic, screens, particle systems, and jetpack effects
- **`images/`** — Contains welcome screen banner image
- **`sounds/`** — Audio files for game feedback

## Reflection

### Development Process
This project evolved from a simple food collection game into a feature-rich experience with jetpack mechanics, two-level progression, brick wall obstacles, moving saws, particle effects, a complete audio system, full screen management, and a prize redemption system. The most challenging aspects were implementing the jetpack flame particles that correctly position based on movement direction, creating the level transition system, and ensuring all game objects clear properly on game over.

### Use of Generative AI
I used Generative AI (specifically DeepSeek) as a **development assistant** throughout this project:

**How I used AI:**
- Debugging keyboard input issues with p5.play's `kb.pressing()` function
- Implementing manual key event listeners as a fallback solution
- Structuring the particle system and floating text effects
- Building the two-level system with transition screen
- Designing the jetpack flame particle system
- Troubleshooting audio loading and playback issues

**Benefits:**
- Faster resolution of framework-specific issues
- Creative visual designs for multiple food types
- Clean implementation of moving hazards and jetpack effects
- Effective game progression system with level transitions
- Professional-looking UI with tooltips and hover effects

**Challenges:**
- p5.play collision detection required careful testing
- Audio required user interaction before playing (browser security policy)
- Ensuring smooth level transition without disrupting gameplay
- Positioning jetpack flames correctly for all 8 movement directions

### Use of Others' Code
- **p5.js Library** — Official library from the Processing Foundation
- **p5.play Library** — Game library from p5play.org (quinton-ashley)
- **planck.js** — Physics engine for p5.play
- **Sound patterns** — Inspired by Daniel Shiffman's Coding Train tutorials

All game logic, class structures, screen designs, food artwork, jetpack system, level progression, and prize system were created by me. The libraries were used as provided by their respective authors.

## Prize Link
[Click here to claim your prize](https://example.com/your-prize-link) (Available on game over screen)
