const determineCar = (doorCount) => {
  const index = getRandomInt(doorCount);
  const chosenDoor = doors[index];
  chosenDoor.prize = true;
  addContainsPrizeClass(chosenDoor);
  console.log(doors);
  return index;
};

const handleClosedDoorClick = (door) => {
  if (doorClicked == false) {
    doorClicked = true;
    selectDoor(door);
    const openableDoors = getOpenableDoors(doors);
    hostOpenDoor(openableDoors);
  }
};

const selectDoor = (door) => {
  door.selected = true;
  selectedDoor = door;
  addDoorHalo(door);
};

const deselectDoor = (door) => {
  door.selected = false;
  selectedDoor = null;
};

const setDoorClickHandlers = (doors) => {
  for (const door of doors) {
    door.htmlElement.addEventListener("click", () => {
      handleClosedDoorClick(door);
    });
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getOpenableDoors = (doors) => {
  const openableDoors = doors.filter((door) => {
    return door.prize == false && door.selected == false;
  });
  return openableDoors;
};

const openDoor = (closedDoor) => {
  console.log("trying to open door, current door state: ", doors);
  closedDoor.opened = true;
  toggleDoorOpeningClass(closedDoor);
  toggleDoorOpenClass(closedDoor);
};

const closeDoor = (openDoor) => {
  openDoor.opened = false;
  toggleDoorOpeningClass(openDoor);
  toggleDoorOpenClass(openDoor);
};

const hostOpenDoor = (openableDoors) => {
  if (openableDoors.length === 1) {
    openDoor(openableDoors[0]);
  } else {
    openDoor(openableDoors[getRandomInt(openableDoors.length)]);
  }
  displaySwitchChoice();
};

const resetGame = () => {
  for (const door of doors) {
    deselectDoor(door);
    closeDoor(door);
    removeDoorPrize(door);
    removeDoorHalo(door);
  }
  hideSwitchChoice();
  doorClicked = false;
  clickedDoor = null;
  selectedDoor = null;
  hasSwitchedDoor = false;
  hideRestartButton();
  hideResult();
  initializeGame();
};

const displaySwitchChoice = () => {
  const switchChoiceWrapper = document.querySelector(".switch-choice-wrapper");
  switchChoiceWrapper.classList = "switch-choice-wrapper visible";
};

const hideSwitchChoice = () => {
  const switchChoiceWrapper = document.querySelector(".switch-choice-wrapper");
  switchChoiceWrapper.classList = "switch-choice-wrapper hidden";
};

const handleStayChoice = () => {
  openAllDoors();
  displayResult(selectedDoor);
};

const handleSwitchChoice = () => {
  for (const door of doors) {
    if (door.selected != true && door.opened != true) {
      switchDoors(selectedDoor, door);
    }
  }
  hasSwitchedDoor = true;
  openAllDoors();
  displayResult(selectedDoor);
};

const switchDoors = (oldDoor, newDoor) => {
  removeDoorHalo(oldDoor);
  selectedDoor = newDoor;
  addDoorHalo(selectedDoor);
  hideSwitchChoice();
};

const toggleDoorOpenClass = (door) => {
  door.htmlElement.classList.toggle("door-open");
};

const toggleDoorOpeningClass = (door) => {
  door.htmlElement.classList.toggle("door-opening");
};

const addContainsPrizeClass = (door) => {
  door.htmlElement.parentElement.classList.add("contains-prize");
};

const removeDoorPrize = (door) => {
  door.prize = false;
  removeContainsPrizeClass(door);
};
const removeContainsPrizeClass = (door) => {
  door.htmlElement.parentElement.classList.remove("contains-prize");
};

const openAllDoors = () => {
  for (const door of doors) {
    if (door.opened == false) {
      openDoor(door);
    }
  }
};

const setChoiceButtonHandlers = () => {
  const switchButton = document.querySelector(".switch");
  const stayButton = document.querySelector(".stay");
  switchButton.addEventListener("click", () => {
    handleSwitchChoice();
  });
  stayButton.addEventListener("click", () => {
    handleStayChoice();
  });
};

const addDoorHalo = (door) => {
  door.htmlElement.parentElement.parentElement.classList.add(
    "door-frame-selected"
  );
};

const removeDoorHalo = (door) => {
  door.htmlElement.parentElement.parentElement.classList.remove(
    "door-frame-selected"
  );
};

const displayResult = (door) => {
  const resultElement = document.querySelector(".result");
  let resultString = null;
  if (door.prize) {
    resultString = "Gratulerer! Du vant bilen! 🚗";
    resultElement.classList.add("win");
    handleWin(hasSwitchedDoor);
  } else {
    resultString = "Du tapte! 😢";
    resultElement.classList.add("lose");
    handleLoss(hasSwitchedDoor);
  }
  resultElement.innerHTML = resultString;
  hideChoiceButtons();
  showRestartButton();
};

const hideResult = () => {
  const resultElement = document.querySelector(".result");
  resultElement.innerHTML = "";
  resultElement.classList.remove("win");
  resultElement.classList.remove("lose");
};

const hideChoiceButtons = () => {
  const switchChoiceWrapper = document.querySelector(".switch-choice-wrapper");
  switchChoiceWrapper.classList = "switch-choice-wrapper hidden";
};

const hideRestartButton = () => {
  const restartButton = document.querySelector(".restart-btn");
  restartButton.classList = "restart-btn hidden";
};

const showRestartButton = () => {
  const restartButton = document.querySelector(".restart-btn");
  restartButton.classList = "restart-btn visible";
};

const setRestartButtonHandler = () => {
  const restartButton = document.querySelector(".restart-btn");
  restartButton.addEventListener("click", () => {
    resetGame();
  });
};

const initializeGame = () => {
  determineCar(doorCount);
};

const incrementKeepWinCount = () => {
  const keepWincount = document.querySelector(".keep-win-count");
  console.log(parseInt(keepWincount.innerHTML));
  keepWincount.innerHTML = parseInt(keepWincount.innerHTML) + 1;
};

const incrementSwitchWinCount = () => {
  const switchWincount = document.querySelector(".switch-win-count");
  switchWincount.innerHTML = parseInt(switchWincount.innerHTML) + 1;
};

const incrementKeepLossCount = () => {
  const keepLossCount = document.querySelector(".keep-loss-count");
  keepLossCount.innerHTML = parseInt(keepLossCount.innerHTML) + 1;
};

const incrementSwitchLossCount = () => {
  const switchLossCount = document.querySelector(".switch-loss-count");
  switchLossCount.innerHTML = parseInt(switchLossCount.innerHTML) + 1;
};

const resetWinLossCount = () => {
  const keepWincount = document.querySelector(".keep-win-count");
  const switchWincount = document.querySelector(".switch-win-count");
  const keepLossCount = document.querySelector(".keep-loss-count");
  const switchLossCount = document.querySelector(".switch-loss-count");
  keepWincount.innerHTML = 0;
  switchWincount.innerHTML = 0;
  keepLossCount.innerHTML = 0;
  switchLossCount.innerHTML = 0;
};

const handleWin = (switchedDoor) => {
  if (switchedDoor) {
    incrementSwitchWinCount();
  } else {
    incrementKeepWinCount();
  }
};

const handleLoss = (switchedDoor) => {
  if (switchedDoor) {
    incrementSwitchLossCount();
  } else {
    incrementKeepLossCount();
  }
};

const doorElements = document.querySelectorAll(".door");

const doors = [
  {
    index: 0,
    prize: false,
    selected: false,
    opened: false,
    htmlElement: doorElements[0],
  },
  {
    index: 1,
    prize: false,
    selected: false,
    opened: false,
    htmlElement: doorElements[1],
  },
  {
    index: 2,
    prize: false,
    selected: false,
    opened: false,
    htmlElement: doorElements[2],
  },
];

const doorCount = 3;
let doorClicked = false;
let clickedDoor = null;
let selectedDoor = null;
let hasSwitchedDoor = false;

initializeGame();
setDoorClickHandlers(doors);
setChoiceButtonHandlers();
setRestartButtonHandler();
