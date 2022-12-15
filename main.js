// Pure Function
const concatStrPure = function(a, b) {
  return a + b;
};
concatStrPure("hey ", 'peeps');


// Non-Pure Function
const a = "hello, ";
const concatStrNon = function(a, b) {
  return a + b;
};
concatStrNon(a, "fellow coders");


// Avoiding Shared State and Mutable Data
const user = Object.freeze({
  name: 'Timmy',
  coins: 100
});
const buyItem = function(state) {
  const coinCount = state.coins - 25;

  return {
    coins: coinCount
  };
};
const earnCoins = function(state) {
  const coinCount = state.coins + 15;

  return {
    coins: coinCount
  };
};
const coinsAfterEarnAndBurn = buyItem(earnCoins(user));
console.log(coinsAfterEarnAndBurn);


// Example of Functional Composition (as opposed to Inheritance)
// In other words, our programs should be built around what our objects do instead of what they are.
const barker = function(state) {
  return {
    bark: function() {
      console.log('Woof, I am ' + state.name);
    }
  };
};

const meower = function(state) {
  return {
    meow: function() {
      console.log('Meow, I am ' + state.name);
    }
  };
};

const driver = function(state) {
  return {
    drive: function() {
      state.position = state.position + state.speed;
    }
  };
};

const killer = function(state) {
  return {
    kill: function() {
      console.log(`${state.target} has been killed 😢`);
    }
  };
};

const cleaner = function(state) {
  return {
    clean: function() {
      console.log(`Cleaning at ${state.position} is ${state.condition}`);
    }
  };
};
const pooper = function(state) {
  return {
    poop: function() {
      console.log(`${state.name} just pooped at ${state.location}`);
    }
  };
};

const RobotDog = function(name) {
  let state = {
    name: name,
    speed: 100,
    position: 0
  };

  return Object.assign({}, barker(state), driver(state));
};

const cleaningRobot = function(position) {
  let state = {
    speed: 75,
    position: position,
    condition: 'complete'
  };

  return Object.assign({}, cleaner(state), driver(state));
};

const murderRobot = function(target, position) {
  let state = {
    target: target,
    speed: 150,
    position: position,

  };

  return Object.assign({}, driver(state), killer(state));
};

const cat = function(name, location) {
  let state = {
    name: name,
    location: location
  };

  return Object.assign({}, meower(state), pooper(state));
};

const murderRobotDog = function(name, target) {
  let state = {
    name: name,
    target: target,
    speed: 175,
    position: 0,
  };

  return Object.assign({}, barker(state), driver(state), killer(state));
};