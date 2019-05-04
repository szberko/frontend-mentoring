$(document).ready(() => {
    $('#search').submit( function(event) {
        event.preventDefault();
        let capital = $('#city').val();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `https://restcountries.eu/rest/v2/capital/${capital}`,
            beforeSend: function() {
                $(".loader").show();
                $('#countries').empty();
            },
            success: function(data){
                printCountries(data);
            },
            statusCode:{
                404: function() {
                    $('#countries').append(`There are no countries with capital: ${capital}`);
                }
            },
            complete: function() {
                $(".loader").hide();
            }
        });
    });
});


function printCountries(countries) {
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