const INTERVAL = 1000; //ms

let prev        = null;
let isRunning   = false;
let logFunction = null;

let sum   = 0;
let count = 0;
let max   = 0;

let timeoutId  = null;
let intervalId = null;

function next() {
    timeoutId = setTimeout(function() {
        let now = Date.now();
        let lag = now - prev - INTERVAL;
        prev    = now;

        next();

        count++;
        sum += lag;

        if (lag > max) {
            max = lag;
        }

    }, INTERVAL);
}

function start() {
    isRunning = true;
    prev = Date.now();
    next();

    intervalId = setInterval(function() {
        const info = {
            avg:   Math.round(sum / count),
            max:   max,
            count: count
        };

        logFunction(info);

        count = max = sum = 0;

    }, 60 * 1000);
}

module.exports = {
    start(_logFunction) {
        if (!_logFunction) {
            throw new Error('Callback not passed');
        }

        logFunction = _logFunction;

        if (!isRunning) {
            start();
        }
    },
    stop() {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
    }
};
