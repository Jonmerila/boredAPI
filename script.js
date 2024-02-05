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

  console.log(json);
};

const url = "https://www.boredapi.com/api/activity";

// console.log(getData("https://www.boredapi.com/api/activity"));
getActivity.addEventListener("click", () =>
  getData("https://www.boredapi.com/api/activity")
);
