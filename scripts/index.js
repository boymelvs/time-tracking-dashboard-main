const mainContent = document.querySelector(".main_content");
const card = document.getElementById("card");

let cardElem = `
            <div class="card work">
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
                        <span class="current_time">32</span>hrs
                     </p>

                     <p class="previous">
                        <span class="prev">Last Week</span> -
                        <span class="prev_time">36</span>hrs
                     </p>
                  </div>
               </div>
            </div>`;

const insertCard = (elem, data) => {
   const newCard = card.cloneNode(true);

   data.then((value) => {
      for (let i = 0; i < 6; i++) {
         mainContent.appendChild(newCard);
         const card = elem.classList.add(
            value[i].title.replace(/\s/g, "").toLowerCase()
         );

         console.log("this is title", elem);
      }
   });
   // const ewan = (mainContent.querySelector(".title").innerHTML = "Work");

   // const moveItems = document.querySelectorAll(".to-be-moved");
   // let targetElements = document.querySelectorAll(".wine-gallery-wrap");

   // for (let i = 0; i < targetElements.length; i++) {
   //    targetElements[i].appendChild(moveItems[i]);
   // }
};

const getData = () => {
   return fetch("../data.json").then((res) => res.json());

   // .then((data) => {
   //    return data;
   // });

   // console.log("this title", data[1].title);
   // console.log("this timeframe", data[1].timeframes.daily);
   // console.log("this current", data[1].timeframes.daily.current);
};

insertCard(cardElem, getData());
