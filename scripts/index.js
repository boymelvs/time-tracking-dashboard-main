"use strict";

const mainContent = document.querySelector(".main_content");

/* card element to be insert into DOM, formatted using Template Literals */
let cardElem = `
            <div class="card ">
               <div class="tracker">
                  <div class="title_ellipsis_container">
                     <h2 class="title"></h2>
                     <img
                        src="./images/icon-ellipsis.svg"
                        alt="ellipsis"
                        class="icon_ellipsis"
                     />
                  </div>

                  <div class="time_container">
                     <p class="current">
                        <span class="current_time"></span>
                     </p>

                     <p class="previous">
                        <span class="prev"></span> -
                        <span class="prev_time"></span>
                     </p>
                  </div>
               </div>
            </div>`;

/* insert card to DOM */
const insertCard = (length) => {
   for (let i = 0; i < length; i++) {
      mainContent.innerHTML += cardElem;
   }
};

/* ================= inserting data start here ================= */
const insertData = (data, time) => {
   const cards = document.querySelectorAll(".card");

   cards.forEach((card, key) => {
      /* insert tracker title */
      card.classList.add(data[key].title.replace(/\s/g, "").toLowerCase());
      card.querySelector(".title").innerHTML = data[key].title;

      /* insert current time */
      const myUnit = data[key].timeframes[time].current > 1 ? "hrs" : "hr";
      card.querySelector(".current_time").innerHTML = data[key].timeframes[time].current + myUnit;

      /* insert if yesterday, last week/month */
      const itHappenWhen = time === "daily" ? "Yesterday" : time === "weekly" ? "Last Week" : "Last Month";
      card.querySelector(".prev").innerHTML = itHappenWhen;

      /* insert previous time */
      const unit = data[key].timeframes[time].previous > 1 ? "hrs" : "hr";
      card.querySelector(".prev_time").innerHTML = data[key].timeframes[time].previous + unit;
   });
};

/* activate classes once click */
const isActive = (timeframes, index) => {
   timeframes.forEach((timeframe, key) => {
      if (index === key) {
         timeframe.classList.add("active");
      } else {
         timeframe.classList.remove("active");
      }
   });
};

/* ================= getting data here ================= */
const getData = async () => {
   const res = await fetch("data.json");
   const data = await res.json().then((data) => data);

   /* call insertCard fn */
   insertCard(data.length);

   /* call insertData fn, weekly as default active */
   insertData(data, "weekly");

   /* waiting for click and become active */
   const timeframes = document.querySelectorAll(".timeframe");

   timeframes.forEach((timeframe, index) => {
      timeframe.addEventListener("click", (event) => {
         const time = event.target.innerText.toLowerCase();
         insertData(data, time);
         isActive(timeframes, index);
      });
   });
};

getData(); /* get data onload */
