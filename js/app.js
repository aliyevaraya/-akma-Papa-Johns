const lang_mob = document.getElementById("lang_mob");
const lang_desk = document.getElementById("lang_desk");
const sideBar = document.getElementById("sideBar");

function openLang() {
  lang_mob.classList.toggle("h-[110px]");
  lang_desk.classList.toggle("h-[80px]");
}

function openBasket() {
  sideBar.classList.toggle("!grid");
}

function hesabla(arg, price) {
  const countDiv = document.getElementById("countDiv");
  let deyer = arg + +countDiv.innerHTML;
  if (deyer > 1) {
    document.getElementById("lessBtn").disabled = false;
    countDiv.innerHTML = deyer;
  } else {
    countDiv.innerHTML = 1;
    document.getElementById("lessBtn").disabled = true;
  }
  document.getElementById("qiymetntc").innerHTML = deyer * price;
}

let basketArr = [];
function addBasket(img, name, price, id) {
  const obj = {
    id,
    img,
    name,
    price,
    count: +countDiv.innerHTML,
    all: price * countDiv.innerHTML,
  };
  const elem = basketArr.find((item) => item.id == id);
  if (!elem) {
    basketArr.push(obj);
  } else {
    elem.count += +countDiv.innerHTML;
  }
  handleBasket();
  getAllPrice()
}

function getAllPrice() {
  const allPriceInPopup = document.querySelectorAll(".allPriceInPopup");
  let all = basketArr.reduce((sum, product) => sum + +product.price, 0);
  allPriceInPopup.forEach((item) => item.innerHTML = all);

  const basketCount = document.querySelectorAll(".basketCount");
  basketCount.forEach((item) => (item.innerHTML = basketArr.length));
}

const basket = document.getElementById("basket");

function handleBasket() {
  basket.innerHTML = "";
  basketArr.map((item) => {
    basket.innerHTML += `
      <div class="flex flex-col sm:flex-row justify-between items-center py-3 border border-slate-400 mt-2">
        <div class="flex gap-2 items-center">
          <img
            class="w-[50px]"
            src="${item.img}"
            alt=""
          />
          <div>
            <h3 class="sm:text-[20px] font-bold">${item.name}</h3>
            <p class="text-[12px]">Mini pizza, 15sm</p>
          </div>
        </div>
        <div class="flex items-center gap-3 px-2">
          <div class="flex items-center sm:text-[20px] text-white p-2">
            <span id="lessBtn2"  onclick="hesabla2(-1, ${item.price})" class="px-2 sm:px-3 pb-1 bg-gray-400 font-black">-</span>
            <span id="countDiv2" class="px-2 sm:px-3 text-black">1</span>
            <span onclick="hesabla2(1, ${item.price})" class="px-2 sm:px-3 pb-1 bg-green-600 font-black">+</span>
          </div>
          <div class="font-bold">
            <span id="priceInBasket" class="text-[22px]">${item.price} &#8380;</span>
            <span class="fa-solid fa-xmark text-gray-600 ml-2"></span>
          </div>
        </div>
      </div>
    `;
  });
}
