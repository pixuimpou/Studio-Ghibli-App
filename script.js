const app = document.getElementById("root");

const container = document.createElement("div");
container.setAttribute("class", "container");

let fullDescriptions = [];

app.appendChild(container);

const fetchMovies = () => {

    fetch("https://ghibliapi.herokuapp.com/films")
        .then((response) => {
            if(!response.ok) {
                throw new Error(`Ops...something went wrong: error ${response.status}, ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((movie) => {
                const card = document.createElement("div");
                card.setAttribute("class", "card");

                const h1 = document.createElement("h1");
                h1.textContent = movie.title;

                const p = document.createElement("p");

                const seeMore = document.createElement("span");
                seeMore.setAttribute("class", "btn");
                seeMore.dataset.toggle = "true";
                seeMore.dataset.title = `${movie.title}`;
                seeMore.setAttribute("onclick", "seeMoreToggle()");
                seeMore.textContent = "See more";

                container.appendChild(card);
                card.appendChild(h1);

                if (movie.description.length > 300) {
                    fullDescriptions = [...fullDescriptions, { title: movie.title, description: movie.description }];
                    movie.description = movie.description.substring(0, 300);
                    p.textContent = `${movie.description}...`;
                    card.appendChild(p);
                    p.appendChild(seeMore);
                } else {
                    p.textContent = movie.description;
                    card.appendChild(p);
                }
            })
           
        })
        .catch((err) => {
            const warning = document.createElement("h1");
            warning.setAttribute("class", "warning");
            warning.textContent = err;
            container.appendChild(warning);
        })
}

const seeMoreToggle = () => {
    const seeBtn = event.target;
 
    const seeMore = document.createElement("span");
    seeMore.setAttribute("class", "btn");
    seeMore.dataset.toggle = "true";
    seeMore.textContent = "See more";
    seeMore.setAttribute("onclick", "seeMoreToggle()");

    const seeLess = document.createElement("span");
    seeLess.setAttribute("class", "btn");
    seeLess.textContent = "See less";
    seeLess.setAttribute("onclick", "seeMoreToggle()");

    const p = seeBtn.parentNode;

    if (seeBtn.dataset.toggle) {
        fullDescriptions.forEach(movie => {
            if (seeBtn.dataset.title === movie.title) {
                let fullDescription = movie.description;
                p.textContent = fullDescription;
                seeLess.dataset.title = movie.title;
                p.appendChild(seeLess);
            }
        })

    } else {
        fullDescriptions.forEach(movie => {
            if (seeBtn.dataset.title === movie.title) {
                let shortDescription = movie.description.substring(0, 300);
                p.textContent = `${shortDescription}...`;
                seeMore.dataset.title = movie.title;
                p.appendChild(seeMore);
            }
        })
    }
}

fetchMovies()
