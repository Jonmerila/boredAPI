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

const buildUrl = (participants, checkbox, dropdown) => {
  let params = new URLSearchParams();
  if (participants.value !== "any") {
    params.append("participants", participants.value);
  }
  if (checkbox.checked) {
    params.append("price", 0.0);
  }
  if (dropdown.value !== "any") {
    params.append("type", dropdown.value);
  }
  let url = "http://www.boredapi.com/api/activity?" + params;
  console.log(url);
  return url;
};

// console.log(getData("https://www.boredapi.com/api/activity"));
getActivity.addEventListener("click", async () => {
  const participants = document.querySelector('input[type="radio"]:checked');
  const checkBox = document.querySelector("#free");
  const dropDown = document.querySelector("#dropdown");
  //   getData("https://www.boredapi.com/api/activity");
  console.log(buildUrl(participants, checkBox, dropDown));
  let url = buildUrl(participants, checkBox, dropDown);
  console.log("url", url);
  await getData(url);
  //   console.log(participants.value);
  //   console.log(checkBox.checked);
  //   console.log(dropdown.value);
});
