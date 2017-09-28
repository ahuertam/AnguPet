export class communicationsAmongBoard {

    static petState = {
        'normal': { state: true, url: '../../assets/normal.svg' },
        'sad': { state: false, url: '../../assets/sad.svg' },
        'happy': { state: false, url: '../../assets/happy.svg' },
        'anger': { state: false, url:'../../assets/anger.svg'},
        'dead': { state: false, url:'../../assets/dead.svg'},
        'egg': {state: false, url: '../../assets/egg.png'}
    };
    static abnormalStatus = { 'dead': true, 'ill': false, 'anger': false, 'dying': false }
    static currentState = {};
    static life = 100;
    static happiness = 50;
    static health = 70;
    static flagReset = false;
    static points = 0;
}