const cardListEL = document.getElementById("cardList");
console.log("🚀 ~ file: openCard.js ~ line 2 ~ cardListEL", cardListEL)

cardListEL.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) return;
    let currentEl = e.target;
    console.log("🚀 ~ file: openCard.js ~ line 6 ~ cardListEL.addEventListener ~ currentEl", currentEl)

})