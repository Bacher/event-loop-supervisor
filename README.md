## Event loop lag detector (supervisor)

####Usage:

```javascript
const detector = require('event-loop-supervisor');

/*
 * Passed callback will be called every minute.
 */
detector.start(lagInfo => {

    /*
     * lagInfo.avg   - average lag (ms), don't worry if this value above about 5-15 
     * lagInfo.count - count of 1-second iteration in 1-minute supervision interval, ideally 60
     * lagInfo.max   - maximum lag (ms) in 1-minute interval
     */

    // Common use:
    if (lagInfo.avg > 100 || lagInfo.max > 500) {
        console.warn('AHTUNG! LAG DETECTED:', lagInfo);
    } 
});

// ... //

detector.stop();

```
