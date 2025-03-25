const spinner = document.querySelector(".spinner");
const spinUlEl = document.querySelector(".spinner ul");
const spinLiEls = document.querySelectorAll(".spinner ul > li");
const addBtn = document.querySelector(".btn");
const input = document.querySelector(".input");
const ulEl = document.querySelector(".list-container ul");
const liEls = document.querySelectorAll(".list-container ul > li");
const spinBtn = document.querySelector(".spin");

addBtn.addEventListener("click", () => {
  addIntoList(input.value);
  input.value = "";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addIntoList(input.value);
    input.value = "";
  }
});

function addIntoList(value) {
  if (value !== "") {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.classList.add("delete-item");
    span.textContent = " X ";

    li.innerText = value;
    li.appendChild(span);
    ulEl.appendChild(li); // Add to main list

    const spinLi = document.createElement("li");
    spinLi.innerText = value;
    spinUlEl.appendChild(spinLi); // Add to spinner

    updateSpinner(); // Recalculate positions
  }
}
///delete item from list
ulEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-item")) {
    const li = event.target.parentElement;
    const index = Array.from(ulEl.children).indexOf(li); // Get index of the item
    li.remove(); // Remove from list
    spinUlEl.children[index]?.remove(); // Remove corresponding item from spinner
    updateSpinner();
  }
});
function updateSpinner() {
  const spinItems = spinUlEl.children;
  const totalItems = spinItems.length;
  const angleStep = 360 / totalItems;

  const clrList = [
    "hsl(42, 79%, 64%)",
    "hsl(168, 24%, 78%)",
    "hsl(213, 53%, 30%)",
    "hsl(149, 46.90%, 40.60%)",
    "hsl(4, 100%, 92%)",
    "hsl(81, 49%, 63%)",
  ]; // 0, 60, 120, 200, 240, 300
  const colors = Array.from(
    { length: totalItems },
    (_, index) => clrList[index % clrList.length]
  );
  if (colors[colors.length - 1] == "hsl(42, 79%, 54%)")
    colors[colors.length - 1] = "hsl(213, 53%, 30%)";
  spinUlEl.style.background = generateConicGradient(colors);

  Array.from(spinItems).forEach((li, index) => {
    const angle = angleStep * index;
    li.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  });
}

function generateConicGradient(colors) {
  const partitions = colors.length;
  const angleStep = 360 / partitions;
  let gradientStops = colors
    .map((color, index) => {
      let start = index * angleStep;
      let end = (index + 1) * angleStep;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return `conic-gradient(from calc(${angleStep / 2} * 1deg), ${gradientStops})`;
}

//the function to spin the spinner
spinBtn.addEventListener("click", () => {
  const angle =
    (Math.floor(Math.random() * spinUlEl.children.length) * 360) /
    spinUlEl.children.length;
  console.log(angle);
  spinUlEl.style.animation = "none";
  spinUlEl.offsetHeight; // reflow
  const audio = new Audio("bike-loop.mp3");
  audio.play()

  document.documentElement.style.setProperty(
    "--angle",
    `${angle + 360 * 15}deg`
  );
  spinUlEl.style.animation = `rotate 4s cubic-bezier(.32,.47,.07,.99) forwards`;
  spinner.style.pointerEvents = "none";
});
