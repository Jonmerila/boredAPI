const getActivity = document.querySelector("#getActivity");
const activityContainer = document.querySelector("#activityContainer");
const activityTitle = document.querySelector("#activityTitle");

const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
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
};

const buildUrl = async (participants, checkbox, dropdown) => {
  let params = new URLSearchParams();
  params.append("participants", participants.value);
  if (checkbox.value == true) {
    params.append("maxprice", 0.0);
  }
  params.append("type", dropdown.value);
  let url = await getData("http://www.boredapi.com/api/activity?" + params);
    console.log(url);
    return url;
};

// console.log(getData("https://www.boredapi.com/api/activity"));
getActivity.addEventListener("click", () => {
  const participants = document.querySelector('input[type="radio"]:checked');
  const checkBox = document.querySelector("#free");
  const dropDown = document.querySelector("#dropdown");
  getData("https://www.boredapi.com/api/activity");
 getData(buildUrl(participants, checkBox, dropDown));
  //   console.log(participants.value);
  //   console.log(checkBox.checked);
  //   console.log(dropdown.value);
});
