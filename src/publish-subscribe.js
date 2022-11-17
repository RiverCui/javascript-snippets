/**
 * Implement publish-subscribe pattern with on/emit/once/off methods
 */

class EventHub {
  constructor() {
    this.map = {}
  }

  // subscribe
  on(type, callBack) {
    if(!this.map[type]) {
      this.map[type] = [callBack]
    } else {
      this.map[type].push(callBack)
    }
  }

  // delete subscribe
  off(type, callBack) {
    if(!this.map[type]) return
    this.map[type] = this.map[type].filter(item => {
      return item !== callBack
    })
  }

  // subscribe only once
  once(type, callBack) {
    function fn() {
      callBack()
      this.off(type, fn)
    }
    this.on(type, fn)
  }

  // trigger event
  emit(type, ...rest) {
    this.map[type] && this.map[type].forEach(fn => fn.apply(this, rest))
  }
}

// Test case
const event = new EventHub();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");
