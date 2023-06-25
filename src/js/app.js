// https://restcountries.com/v2 API Link
// console.log(`https://restcountries.com/v2/name/JA`);

class View {
  // input = document.querySelector(".inp");
  countryReq = document.querySelector("#countryinp");
  countriesContainer = document.querySelector(".container");
  btnDelete = document.querySelector(".delete");

  loadCountry(data) {
    const html = ` 
    <center> 
    <section class="country">
    <center> 
      <img class="country-flag" src="${data.flag}"/>
      </center>
      <section class="country-data">
        <h3 class="country-name">${data.name} ${
      data.name !== data.nativeName ? "/" : ""
    } ${data.name != data.nativeName ? data.nativeName : ""} </h3>
        <h4 class="country-region">Region: 🌎 ${data.region} (${
      data.subregion
    })  </h4> 
        <p class="country-row"><span></span> Population: 🤼 ${(
          +data.population / 1_000_000
        ).toFixed(3)}m people (${data.demonym})</p>
        <p class="country-row"><span></span> Language(s): 📝🗣️ ${
          data.languages[0].name
        } ${
      data.languages[0].name !== data.languages[0].nativeName ? "/" : ""
    } ${
      data.languages[0].name !== data.languages[0].nativeName
        ? data.languages[0].nativeName
        : ""
    }</p>
        <p class="country-row"><span></span> Currency: 🪙 ${
          data.currencies[0].name
        }  (${data.currencies[0].symbol})</p>
        <p class="country-row"> <span></span> Capital: 🏙️ ${data.capital} </p>
    </section>
    </center>`;

    this.loadSpinner();
    setTimeout(() => {
      this.countriesContainer.insertAdjacentHTML("afterend", html);
      // Deleting
      const content = document.querySelectorAll(".country");

      this.btnDelete.addEventListener("click", function () {
        content.forEach((el) => el.remove());
      });
    }, 700);
  }

  loadSpinner() {
    var loadTime = 700; // (seconds)
    const html = '<div class="loader"> </div>';
    this.countriesContainer.insertAdjacentHTML("beforeend", html);
    return setTimeout(() => {
      const loader = document.querySelector(".loader");
      loader.remove();
    }, loadTime);
  }

  loadErr(msg) {
    // inserts error message
    const html = `<h3 class="error-message"> ${msg} </h3>`;
    this.countriesContainer.insertAdjacentHTML("beforeend", html);
    // removing error message after 3 seconds
    setTimeout(() => {
      const errorCont = document.querySelector(".error-message");
      errorCont.remove();
    }, 3000);
  }
}

// const view = new View();

class Data extends View {
  input = document.querySelector(".inp");

  constructor() {
    super();
    console.log();
    this.input.addEventListener("submit", this.loadAll.bind(this));
  }

  loadAll(e) {
    e.preventDefault();
    console.log(this.countryReq.value);
    // console.log(data.get);
    this.getCountryData(this.countryReq.value);
    this.countryReq.value = "";
  }

  async getCountryData(country) {
    return fetch(`https://restcountries.com/v2/name/${country}`)
      .then((x) => {
        if (!x.ok)
          throw new Error(`The country "${country}" does not exist :/ `);
        return x.json();
      })
      .then((d) => this.loadCountry(d[0]))
      .catch((e) => this.loadErr(e));
  }
}

const data = new Data();
