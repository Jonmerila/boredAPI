const getActivity = document.querySelector("#getActivity");
const activityContainer = document.querySelector("#activityContainer");
const activityTitle = document.querySelector("#activityTitle");
const chosenPrice = document.querySelector(".chosenPrice");

const minChosen = document.querySelector(".minPrice");
const maxChosen = document.querySelector(".maxPrice");
const minPrice = document.querySelector(".min");
const maxPrice = document.querySelector(".max");

const price = document.querySelector(".priceRa");

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.activity == undefined) {
      throw new Error("Not valid!");
    }
    activityTitle.innerText = json.activity;
    activityContainer.innerHTML = "";
    const activityList = {
      type: json.type,
      participants: json.participants,
      price: json.price,
    };

    Object.keys(activityList).forEach((key) => {
      let p = document.createElement("p");
      p.textContent = `${key} : ${activityList[key]}`;
      activityContainer.append(p);
    });

    //   console.log(json);
  } catch (err) {
    let errorTitle = document.createElement("h1");
    errorTitle.textContent = "Error, not found";
    activityContainer.append(errorTitle);
  }
};

maxPrice.addEventListener("change", (event) => {
  console.log(event.target.value);
  console.log(minPrice.value);
  if (event.target.value < minPrice.value) {
    maxPrice.value = minPrice.value;
  }
  maxChosen.textContent = event.target.value;
});

minPrice.addEventListener("change", (event) => {
  minChosen.textContent = event.target.value;
  if (event.target.value == 0) {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
});

const buildUrl = (participants, checkbox, dropdown) => {
  console.log(maxPrice.value, minPrice.value);

  let params = new URLSearchParams();
  if (participants.value !== "any") {
    params.append("participants", participants.value);
  }
  if (checkbox.checked) {
    params.append("price", 0.0);
  } else {
    if (minPrice.value == maxPrice.value) {
      params.append("price", maxPrice.value);
    } else {
      params.append("maxprice", maxPrice.value);
      params.append("minprice", minPrice.value);
    }
  }
  if (dropdown.value !== "any") {
    params.append("type", dropdown.value);
  }
  let url = "http://www.boredapi.com/api/activity?" + params;
  console.log(url);
  return url;
};

const checkBox = document.querySelector("#free");

getActivity.addEventListener("click", async () => {
  const participants = document.querySelector('input[type="radio"]:checked');
  const dropDown = document.querySelector("#dropdown");

  console.log(buildUrl(participants, checkBox, dropDown));
  let url = buildUrl(participants, checkBox, dropDown, minPrice, maxPrice);
  console.log("url", url);
  await getData(url);
});
