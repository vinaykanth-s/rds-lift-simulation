let lifts = [];
let queue = [];
let noOfFloors;
let noOfLifts;
let intervalId;

let btn = document.getElementById("generate-btn");
btn.addEventListener("click", generateLayout);

function generateLayout(e) {
  e.preventDefault();
  let floorInput = document.querySelector("#floor-count");
  let liftInput = document.querySelector("#lift-count");
  let floorCount = Number(floorInput.value);
  let liftCount = Number(liftInput.value);
  lifts = [];
  queue = [];
  clearInterval(intervalId);
  generateFloorsAndLifts(floorCount, liftCount);

  intervalId = setInterval(() => {
    if (queue.length > 0) {
      let floor = queue.shift();
      moveLift(floor);
    }
  }, 100);
}

function generateFloorsAndLifts(floorCount, liftCount) {
  // console.log({ floorCount, liftCount });
  let liftsSection = "";

  for (let i = 1; i <= liftCount; i++) {
    liftsSection += `
      <div id="lift${i}" class='lift'>
        <div id="left-door-${i}" class="left-door door-close"></div>
        <div id="right-door-${i}" class="right-door door-close"></div>
      </div>
    `;
    lifts.push({
      id: `lift${i}`,
      isBusy: false,
      currentFloor: 1,
      movingDirection: null,
    });
  }

  let floorsSection = "";
  for (let i = 1; i <= floorCount; i++) {
    floorsSection += `
      <div class="floor">
        <div class="lift-labels">
          <div class="floor-label">Floor ${i}</div>
          <div class="lift-controls">
            ${i !== floorCount ? createButton(i, "up") : ""}
            ${i !== 1 ? createButton(i, "down") : ""}
          </div>
        </div>
         ${i === 1 ? `<div class="lifts">${liftsSection}</div>` : ""}
      </div>
    `;
  }

  document.getElementById("layout").innerHTML = floorsSection;
}

function createButton(floorNumber, direction) {
  return `<button class="lift-control ${direction}" onclick="queue.push({floorNumber: ${floorNumber}, buttonClicked: '${direction}'})">${
    direction.charAt(0).toUpperCase() + direction.slice(1)
  }</button>`;
}

function addFloorRequest(floorNumber, direction) {
  queue.push({ floorNumber, buttonClicked: direction });
}

function moveLift(floorRequest) {
  const liftId = findClosestAvailableLift(floorRequest);
  if (!liftId) {
    queue.unshift(floorRequest);
    return;
  }

  const lift = lifts.find((lift) => lift.id === liftId);
  if (!lift.isBusy) {
    const liftEl = document.getElementById(lift.id);
    const targetY = (floorRequest.floorNumber - 1) * -100;
    const timeToMove =
      Math.abs(floorRequest.floorNumber - lift.currentFloor) * 2;

    lift.isBusy = true;
    lift.currentFloor = floorRequest.floorNumber;
    lift.movingDirection = floorRequest.buttonClicked;

    liftEl.style.transform = `translateY(${targetY}px)`;
    liftEl.style.transition = `transform ${timeToMove}s linear`;

    setTimeout(() => {
      openCloseLiftDoors(lift.id);
    }, timeToMove * 1000);

    setTimeout(() => {
      lift.isBusy = false;
      lift.movingDirection = null;
    }, timeToMove * 1000 + 5000);
  }
}

function findClosestAvailableLift(floorRequest) {
  let closestLift = null;
  let minDistance = Infinity;

  lifts.forEach((lift) => {
    if (!lift.isBusy) {
      const distance = Math.abs(lift.currentFloor - floorRequest.floorNumber);
      if (distance < minDistance) {
        minDistance = distance;
        closestLift = lift.id;
      }
    }
  });

  return closestLift;
}

function openCloseLiftDoors(liftId, duration) {
  const liftNumber = liftId.replace("lift", "");
  const leftDoor = document.getElementById(`left-door-${liftNumber}`);
  const rightDoor = document.getElementById(`right-door-${liftNumber}`);

  leftDoor.classList.remove("door-close");
  rightDoor.classList.remove("door-close");
  leftDoor.classList.add("door-open");
  rightDoor.classList.add("door-open");

  setTimeout(() => {
    leftDoor.classList.remove("door-open");
    rightDoor.classList.remove("door-open");
    leftDoor.classList.add("door-close");
    rightDoor.classList.add("door-close");
  }, 2500);
}
