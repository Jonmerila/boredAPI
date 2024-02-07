const getActivity = document.querySelector("#getActivity");
const activityContainer = document.querySelector("#activityContainer");
const activityTitle = document.querySelector("#activityTitle");

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

const buildUrl = (participants, checkbox, dropdown, minprice, maxprice) => {
  console.log(minprice.value, maxprice.value);
  try {
    let params = new URLSearchParams();
    if (participants.value !== "any") {
      params.append("participants", participants.value);
    }
    if (checkbox.checked) {
      params.append("price", 0.0);
    } else if (minprice.value !== "0.00" && maxprice.value > minprice.value) {
      params.append("minprice", minprice.value);
      params.append("maxprice", maxprice.value);
    } else if (minprice.value > maxprice.value) {
      throw new Error("Not a valid price range");
    }
    if (dropdown.value !== "any") {
      params.append("type", dropdown.value);
    }

    let url = "http://www.boredapi.com/api/activity?" + params;
    console.log(url);
    return url;
  } catch (err) {
    let errorTitle = document.createElement("h1");
    errorTitle.textContent =
      "Select a valid price range, min price must be lower than max price.";
    activityContainer.append(errorTitle);
  }
};

// console.log(getData("https://www.boredapi.com/api/activity"));
getActivity.addEventListener("click", async () => {
  const participants = document.querySelector('input[type="radio"]:checked');
  const checkBox = document.querySelector("#free");
  const dropDown = document.querySelector("#dropdown");
  const priceMin = document.querySelector("#priceMin");
  const priceMax = document.querySelector("#priceMax");
  console.log(priceMin.value, priceMax.value);
  //   getData("https://www.boredapi.com/api/activity");
  // console.log(buildUrl(participants, checkBox, dropDown)); <- var tvungen att kommentera ut denna rad för att det skulle funka...
  let url = buildUrl(participants, checkBox, dropDown, priceMin, priceMax);
  console.log("url", url);
  await getData(url);
  //   console.log(participants.value);
  //   console.log(checkBox.checked);
  //   console.log(dropdown.value);
});
