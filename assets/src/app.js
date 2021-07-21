const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const h = document.documentElement.clientHeight;
const w = document.documentElement.clientWidth;
const CLIENT_HEIGHT = h - 40;
const CLIENT_WIDTH = w > h ? 0.9 * h - 40 : w - 40;

canvas.width = CLIENT_WIDTH;
canvas.height = CLIENT_HEIGHT;

console.log('Height: ', CLIENT_HEIGHT, '\nWidth: ', CLIENT_WIDTH);

const CAR_SPEED = 1; // скорость машины постоянная
const ENGINE_SPEED = 12; // ускорение вправо/влево/вверх/вниз
const FREQUENCY_STARS = 0.007; // частота появления звездочек
const FREQUENCY_BOMBS = 0.0046; // частота появления бомбочек
const SCORE_WIN = 25; // счет победы

const FPS = 240; // кадров в секунду

const ROAD_SIZE = {w: CLIENT_WIDTH, h: CLIENT_HEIGHT};
const CAR_SIZE = {w: CLIENT_WIDTH / 10, h: 100 / 60 * CLIENT_WIDTH / 10};
const STAR_SIZE = {w: CLIENT_WIDTH / 10, h: CLIENT_WIDTH / 10};
const BOMB_SIZE = {w: CLIENT_WIDTH / 10, h: 85 / 60 * CLIENT_WIDTH / 10};
const BOOM_SIZE = {w: CLIENT_WIDTH / 7, h: CLIENT_WIDTH / 7};
const BOOM2_SIZE = {w: CLIENT_WIDTH / 5, h: CLIENT_WIDTH / 5};
const BOOM3_SIZE = {w: CLIENT_WIDTH / 4, h: CLIENT_WIDTH / 4};

const START_TEXT = ["СТАРТ", "Набери 25 очков", "Остерегайся бомб!"];
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
const unCoding = "data:audio/wav;base64,";
const clashAudio = unCoding + CLASH_AUDIO_BASE64;
const beginAudio = unCoding + BEGIN_AUDIO_BASE64;
const winAudio = unCoding + WIN_AUDIO_BASE64;
const loseAudio = unCoding + LOSE_AUDIO_BASE64;
const roadAudio = unCoding + ROAD_AUDIO_BASE64; // пока без нее будем((

let soundTrack = new Audio();

class App {
    static init() {
        const road = new Image();
        road.src = "assets/img/road.jpg";

        road.onload = function () {
            context.drawImage(road, 0, 0, ROAD_SIZE.w, ROAD_SIZE.h);
            const startBtn = new Button(START_TEXT, START_TEXT);
        };
    }
}


App.init();
