export class App {
    constructor(){
        this.searchBtn = $('#search');
        this.bindEvents()
    }
    
    bindEvents(){
        this.searchBtn.submit( (event) => {
            event.preventDefault();
            let loader = $(".loader");
            let countriesContainer = $('#countries');
            let capital = $('#city').val();
            $.ajax({
                type: "GET",
                context: this,
                dataType: "json",
                url: `https://restcountries.eu/rest/v2/capital/${capital}`,
                beforeSend() {
                    loader.show();
                    countriesContainer.empty();
                },
                success(data){
                    this.printCountries(data);
                },
                statusCode:{
                    404() {
                        countriesContainer.append(`There are no countries with capital: ${capital}`);
                    }
                },
                complete() {
                    loader.hide();
                }
            });
        });
    }

    printCountries(countries) {
        $('#countries').append(countries.map( (country) => {
            return $(`
                <article class='country'>
                    <div class="country__name">Country name: ${country.name}</div>
                    <div class="country__code">Country code: ${country.alpha3Code}</div>
                    <div class="country__capital">Capital city: ${country.capital}</div>
                    <div class="country__borders">
                        <ul class="borders">
                            ${
                                country.borders.map( (border) => {
                                    return `<li class="border">${border}</li>`;
                                }).join('')
                            }
                        </ul>
                    </div>
                </article>
            `);
        }));
    }
}

$(document).ready(() => new App())
