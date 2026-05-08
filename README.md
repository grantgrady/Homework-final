# Final Project - Jetpack Food Adventure
## Name: Grant Grady

## Project Overview
This is a 2D food collection game built with **p5.js**, **p5.sound.min.js** and the **p5play.js** library. The player controls a character with a **jetpack** using WASD or arrow keys, and must collect 5 different types of good (healthy) food while avoiding the 4 different types of bad food, brick wall obstacles, and moving saws. The game features a two level system, particle effects, jetpack flame effects, sound effects, background music, and a prize redemption system.

## Technologies Used
Built with **p5.js 1.9.0** and **p5.play v3**

## How to Run
1. Download this repository
2. Make sure all files maintain the following folder structure
3. Open **index.html** in a web browser
4. Wait for the loading screen to complete
5. Click **START GAME** button on welcome screen
6. Read instructions, then click **PLAY NOW** button
7. Enjoy the game, it consists of two of the greatest things created ever (jetpacks might just take the cake though...)!

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
This project was curated in an attempt to demonstrate every key topic revolving around p5.js throughot the discogrpahy of our assignments. I utilized the concepts of movement and typography from assignment 3, and used the concepts of arrays from assignment 5 in order to display multiple food elements appearing on the screen at the same time (as well as the animation concept introduced, I used for the saws and jetpack flames that also happen to diffrentiate based on the direction the character is moving). Given lesson 5 and the following assignments revolved around food, I felt it would be best to demonstrate my coding growth by revolving my project/game around food and encapsulating all the separate assignment focal points in one. From assignment 6, foods (good and bad) were the class. Assignment 7 touched on user interaction itself and properly controlling the character after clarifying the controls of the game and ensuring that when it interacted with something, in this instance good or bad food, it would properly either take a life and or add towards your goal score. I implemented not only the option to turn music on or off but the sound effects as well, which was the main topic from assignment 8. Even if you lose or win the game, a specific audio cue will play. The particle system and clear win conditions derived from assignment 11 are laid out properly. And given that the later assignments in the year transitioned less from p5.js and rather into unity, I utilized concepts from unity like the scenes (click to start page and how to play page). My final evolved from a simple food collection game into a badass fuel powered experience with jetpack mechanics, two level progression, brick wall obstacles, moving saws, particle effects, a complete audio system, full screen management, and a prize redemption system (I apologize in advance). The most challenging aspects were implementing the jetpack flame particles that correctly position based on movement direction, creating the level transition system, and ensuring all game objects clear properly on game over. 

### Use of Generative AI
I used Generative AI (specifically DeepSeek) as a **development assistant** throughout this project:

**How I used AI:**
- Debugging keyboard input issues with p5.play's `kb.pressing()` function
- Implementing manual key event listeners as a fallback solution
- Structuring the particle system and floating text effects
- Tweaking the design of the jetpack flame particle system (It turns out it's really hard to make realistic vector flames)
- Troubleshooting audio loading and playback issues

**Benefits:**
- Very faster resolution of framework specific issues
- Creative visual designs for multiple food types
- Clean implemnetation of moving hazards and jetpack effects
- Effective game progression system with level transitions
- Professional looking UI with tooltips and hover effects
- And a chefs kiss homepage image for the cherry on top, also turns out people make utilizing ai to help with image generation look way easier than it actually is, it took me what felt like 1 million prompts before I even got a relatively similar image that emulated the design of my game, I inevitably still had to spend a massive chunk of time in illustrator to make it look good

**Challenges:**
- p5.play collision detection required careful testing
- Audio required user interaction before playing (browser security policy)
- Ensuring smooth level transition without disrupting gameplay
- Positioning jetpack flames correctly for all 8 movement directions
- Stepping back from perfecting the flames to actually work on the other 99% of the project

### Use of Others' Code
- **p5.js Library** — Official library from the Processing Foundation
- **p5.play Library** — Game library from p5play.org (quinton ashley)
- **planck.js** — Physics engine for p5.play
- **Sound patterns** — Inspired by Daniel Shiffman's Coding Train tutorials

All game logic, class structures, screen designs, food artwork, jetpack system, level progression, and prize system were created by me. The libraries were used as provided by their respective authors. 

## Prize Link
[Click here to claim your prize](https://example.com/your-prize-link) (Available on you win screen, and once again I apologize in advance)
