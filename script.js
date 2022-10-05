const body = document.querySelector("body");
const themeButton = document.querySelector('.btn-theme')
const input = document.querySelector("input");
const movies = document.querySelector(".movies");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");

let pagesArray = [];

showHighlight();
mainCard();

input.addEventListener("keyup", function (event) {
  if (input.value === "") {
    mainCard();
    return;
  }

  if (event.key === "Enter") {
    search(input.value);
    input.value = "";
    return;
  }

  search(input.value);
});

function mainCard() {
  fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
  ).then(function (response) {
    const promise = response.json();
    promise.then(function (findMovies) {
      pagesArray = [];
      while (findMovies.results.length > 1) {
        let pages = findMovies.results.splice(0, 5);
        pagesArray.push(pages);
      }
      divsCreate(pagesArray[0]);

      let currentPage = 0;

      prev.addEventListener("click", () => {
        btnPrevNext("prev");
      });
      next.addEventListener("click", () => {
        btnPrevNext("next");
      });

      function btnPrevNext(btn) {
        if (btn === "next") {
          currentPage =
            currentPage === pagesArray.length - 1 ? 0 : currentPage + 1;
        }
        if (btn === "prev") {
          currentPage =
            currentPage === 0 ? pagesArray.length - 1 : currentPage - 1;
        }
        divsCreate(pagesArray[currentPage]);
      }
    });
  });
}

function showHighlight() {
  const highGenres = document.querySelector(".highlight__genres");

  fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
  ).then(function (responseHigh) {
    const promise = responseHigh.json();
    promise.then((highlight) => {
      fetch(
        "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
      ).then(function (videoHigh) {
        const promiseVideo = videoHigh.json();
        promiseVideo.then((highlightVideo) => {
          const genresArray = [];
          highlight.genres.forEach((item) => genresArray.push(item.name));

          const dataFormatada = new Date(
            highlight.release_date
          ).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          });

          document.querySelector(".highlight__video").style.backgroundImage =
            'url("' + highlight.backdrop_path + '")';
          document.querySelector(".highlight__title").textContent =
            highlight.title;
          document.querySelector(".highlight__rating").textContent = Number(
            highlight.vote_average
          ).toFixed(1);
          highGenres.textContent = genresArray.join(", ");
          document.querySelector(".highlight__launch").textContent =
            dataFormatada;
          document.querySelector(".highlight__description").textContent =
            highlight.overview;
          document.querySelector(".highlight__video-link").href =
            "https://www.youtube.com/watch?v=" + highlightVideo.results[0].key;
        });
      });
    });
  });
}

function search(name) {
  fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=" +
      name
  ).then(function (body) {
    const promiseBody = body.json();
    promiseBody.then(function (findMovies) {
      pagesArray = [];
      while (findMovies.results.length > 1) {
        let pages = findMovies.results.splice(0, 5);
        pagesArray.push(pages);
      }
      divsCreate(pagesArray[0]);
    });
  });
}

function divsCreate(moviesArray) {
  while (movies.lastChild) {
    movies.lastChild.remove();
  }
  moviesArray.forEach((movie) => {
    if (!movie.poster_path) return;

    const divMovie = document.createElement("div");
    divMovie.classList.add("movie");
    divMovie.style.backgroundImage = 'url("' + movie.poster_path + '")';

    const divInfo = document.createElement("div");
    divInfo.classList.add("movie__info");

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("movie__title");
    spanTitle.textContent = movie.title;

    const spanRating = document.createElement("span");
    spanRating.classList.add("movie__rating");
    spanRating.textContent = movie.vote_average;

    const img = document.createElement("img");
    img.src = "./assets/estrela.svg";
    img.alt = "Estrela";

    spanRating.append(img);
    divInfo.append(spanTitle, spanRating);
    divMovie.append(divInfo);
    movies.append(divMovie);

    divMovie.addEventListener("click", () => {
      modal(movie.id);
    });
  });
}

function modal(id) {
  const modal = document.querySelector(".modal");
  const modalGenres = document.querySelector(".modal__genres");

  fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/" +
      id +
      "?language=pt-BR"
  ).then(function (responseModal) {
    const promiseModal = responseModal.json();
    promiseModal.then(function (modalMovie) {
      while (modalGenres.firstChild) {
        modalGenres.firstChild.remove();
      }

      document.querySelector(".modal__title").textContent = modalMovie.title;
      document.querySelector(".modal__img").src = modalMovie.backdrop_path;
      document.querySelector(".modal__description").textContent =
        modalMovie.overview;
      document.querySelector(".modal__average").textContent = Number(
        modalMovie.vote_average
      ).toFixed(1);

      modalMovie.genres.forEach((item) => {
        const genre = document.createElement("span");
        genre.classList.add("modal__genre");
        genre.textContent = item.name;
        modalGenres.append(genre);
      });

      modal.classList.remove("hidden");
      modal.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });
  });
}

let color = 'light'

themeButton.addEventListener('click', () => {
  if (color === 'light') {
    prev.src = './assets/seta-esquerda-branca.svg'
    next.src = './assets/seta-direita-branca.svg'
    themeButton.src = './assets/dark-mode.svg'
    body.style.setProperty('--background-color', '#242424')
    body.style.setProperty('--color', '#FFF')
    body.style.setProperty('--input-border-color', '#FFF')
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(255, 255, 255, 0.15)')
    body.style.setProperty('--highlight-background', '#454545')
    body.style.setProperty('--highlight-color', 'rgba(255, 255, 255, 0.7)')
    body.style.setProperty('--highlight-description', '#FFF')
      
    color = 'dark'
    return
  } 
  if (color === 'dark') {
    prev.src = './assets/seta-esquerda-preta.svg'
    next.src = './assets/seta-direita-preta.svg'
    themeButton.src = './assets/light-mode.svg'
    body.style.setProperty('--background-color', '#FFF')
    body.style.setProperty('--color', '#000')
    body.style.setProperty('--input-border-color', '#979797')
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(0, 0, 0, 0.15)')
    body.style.setProperty('--highlight-background', '#FFF')
    body.style.setProperty('--highlight-color', 'rgba(0, 0, 0, 0.7)')
    body.style.setProperty('--highlight-description', '#000')
  
    color = 'light'
  }
})