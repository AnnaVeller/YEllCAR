const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const CAR_SPEED = 1; // скорость машины постоянная
const ENGINE_SPEED = 5; // ускорение вправо/влево/вверх/вниз
const FREQUENCY_STARS = 0.01; // частота появления звездочек
const FREQUENCY_BOMBS = 0.003; // частота появления бомбочек
const SCORE_WIN = 10; // счет победы

const FPS = 120; // кадров в секунду

const ROAD_SIZE = {w: 400, h: 600};
const CAR_SIZE = {w: 60, h: 100};
const STAR_SIZE = {w: 60, h: 60};
const BOMB_SIZE = {w: 60, h: 85};
const BOOM_SIZE = {w: 80, h: 80};
const BOOM2_SIZE = {w: 100, h: 100};
const BOOM3_SIZE = {w: 120, h: 120};

const START_TEXT = "СТАРТ";
const END_TEXT = "ТЫ ВЫИГРАЛ";
const LOSE_TEXT = "ТЫ ПРОИГРАЛ"
const RECORD_BEGIN = 1000;


let game;
let record = RECORD_BEGIN;

const boom1 = new Image();
boom1.src = "assets/img/boom.svg";

const boom2 = new Image();
boom2.src = "assets/img/boom-2.svg";

// Звуковые файлы
const clashAudio = new Audio();
clashAudio.src = "assets/audio/clash.wav";

const beginAudio = new Audio();
beginAudio.src = "assets/audio/car_engine3.wav";

const winAudio = new Audio();
winAudio.src = "assets/audio/win.wav";

const loseAudio = new Audio();
loseAudio.src = "assets/audio/lose.mp3";

const roadAudio = new Audio();
roadAudio.loop = true;
roadAudio.src = "assets/audio/road.wav";


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
