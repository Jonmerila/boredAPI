const getActivity = document.querySelector("#getActivity");
const activityContainer = document.querySelector("#activityContainer");
const activityTitle = document.querySelector("#activityTitle");

const getData = async (url) => {
  const response = await fetch(url);
  const json = response.json();
  activityTitle.innerText = json.activity;
};
// const buildUrl = () => {
//   return "https://www.boredapi.com/api/activity";
// };

const url = "https://www.boredapi.com/api/activity";

console.log(url);
getActivity.addEventListener("click", getData("https://www.boredapi.com/api/activity"));
