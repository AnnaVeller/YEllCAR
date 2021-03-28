const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const CAR_SPEED = 1;
const ROAD_SIZE = {w: 400, h: 600};
const CAR_SIZE = {w: 60, h: 100};
const STAR_SIZE = {w: 60, h: 60};
const BOMB_SIZE = {w: 60, h: 85};
const ENGINE_SPEED = 5;
const FPS = 120;
const SCORE_WIN = 10;
const START_TEXT = "СТАРТ";
const END_TEXT = "ТЫ ВЫИГРАЛ";
const LOSE_TEXT = "ТЫ ПРОИГРАЛ"
const RECORD_BEGIN = 1000;
const FREQUENCY_STARS = 0.01;
const FREQUENCY_BOMBS = 0.01;


let game;
let record = RECORD_BEGIN;

// Звуковые файлы
const clashAudio = new Audio();
clashAudio.src = "assets/audio/clash.wav";

const roadAudio = new Audio();
roadAudio.loop = true;
roadAudio.src = "assets/audio/road.wav";

const beginAudio = new Audio();
beginAudio.src = "assets/audio/car_engine3.wav";

const winAudio = new Audio();
winAudio.src = "assets/audio/win.wav";


class App {
    static init() {
        const road = new Image();
        road.src = "assets/img/road.jpg";

        road.onload = function () {
            context.drawImage(road, 0, 0, ROAD_SIZE.w, ROAD_SIZE.h);
            //context.drawImage(bomb, 0, 0, BOMB_SIZE.w, BOMB_SIZE.h);
            const startBtn = new Button([START_TEXT], START_TEXT);
        };
    }
}


App.init();
