const url = window.location.search.split("&");
const cat = url[0].split("=").at(-1);
const id = url[1].split("=").at(-1);

const PRODUCT = [];
fetch(`http://localhost:3000/${cat}/${id}`)
  .then((res) => res.json())
  .then((data) => {
    PRODUCT.push(data);
    getProduct();
  });

const product = document.getElementById("product");

function getProduct() {
  PRODUCT.map((item) => {
    product.innerHTML = `
           <div class="w-1/2">
                <h4 class="font-bold text-[20px]">${item.title}</h4>
                <p class="mt-4">${item.composition}</p>
                <p class="font-bold mt-2 text-[20px]">Price: <span id="qiymetntc">${item.price}</span>&#8380;</p>
                <div class="py-2">
                    <div class="flex items-center sm:text-[20px] text-white p-2">
                        <span id="lessBtn"  onclick="hesabla(-1,${item.price})" class="px-2 sm:px-3 pb-1 bg-gray-400 font-black">-</span>
                        <span id="countDiv" class="px-2 sm:px-3 text-black">1</span>
                        <span onclick="hesabla(1, ${item.price})" class="px-2 sm:px-3 pb-1 bg-green-600 font-black">+</span>
                    </div>
                    <button onclick="addBasket('${item.img}', '${item.title}', '${item.price}', '${item.id}')" class="bg-green-700 text-white p-2 my-5 rounded-md">Səbətə at</button>
                </div>
            </div>
            <div class="w-1/2 flex justify-center">
                <img class="w-full" src="${item.img}" alt="" />
            </div>
        `;
  });
}
