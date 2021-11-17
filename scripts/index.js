const mainContent = document.querySelector(".main_content");
const card = document.querySelector(".card");

// const cardClone = card.cloneNode(true);

// const test = (card) => {
//    const tet = mainContent.appendChild(card);

//    const ewan = (tet.querySelector(".title").innerHTML = "Play");

//    console.log("this is", ewan);
// };

// test(cardClone);

const getData = () => {
   fetch("../data.json")
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         console.log("this data", data);
         console.log("this title", data[1].title);
         console.log("this timeframe", data[1].timeframes.daily);
         console.log("this current", data[1].timeframes.daily.current);
      });
};

getData();
