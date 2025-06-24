const APIKey = "ba0af7ca9a25474eb08d4bd85d6ff7b2";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menus) =>
  menus.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKey}`
);
const getNews = async () => {
  try {
    const response = await fetch(url); //인터넷 접속해서 접근
    const data = await response.json();
    if (response.status == 200) {
        if(data.articles.length==0){
          throw new Error("No result for this search");
        }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLastestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKey}`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${APIKey}`
  );
  getNews();
};

const getNewsByKetword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${APIKey}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${news.urlToImage}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name} ${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML
};
getLastestNews();

//1. 버튼들에 클릭 이벤트를 넣어줌
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
