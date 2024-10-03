const category = [];

fetch("https://papajson.vercel.app/category")
  .then((res) => res.json())
  .then((cats) => {
    category.push(...cats);
    addMenu();
  });

const categoryMenu = document.getElementById("categoryMenu");

function addMenu() {
  category.map((item) => {
    let unvan =
      item.id == 222
        ? "/index.htm"
        : `/pages/category.htm?category=${item.slug}`;
    categoryMenu.innerHTML += `
            <li>
                <a href="${unvan}">${item.category}</a>
            </li>
        `;
  });
}
