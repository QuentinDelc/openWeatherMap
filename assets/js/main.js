$(function() {
    const apiKey  = '6fd3014bdf08946fac96268c3c2f79c9';
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + '&units=metric&lang=fr';

    $('#weather button').click(function(e) {
        e.preventDefault();

        const city      = $('#city');
        const cityValue = city.val();

        const params = {
            url: baseUrl + '&q=' + cityValue,
            method: 'GET'
        };

        $.ajax(params).done(function(response) {

            $('.card').removeClass('d-none');

            city.removeClass('is-invalid');
            $('.invalid-feedback').slideUp();
            $('.card').show();

            $('.card-title').text(response.name);

            $('.description-weather').text(response.weather[0].description);

            const temp = Math.round(response.main.temp) + ' °';
            const tempMax = Math.round(response.main.temp_max) + ' °';
            const tempMin = Math.round(response.main.temp_min) + ' °';

            $('.temp-weather').text(temp);
            $('.temp-max-weather').text(tempMax);
            $('.temp-min-weather').text(tempMin);

            const image = response.weather[0].icon;
            $('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
            $('.image-weather').attr('alt', response.name);

        })
        .fail(function() {
            $('.invalid-feedback').slideDown();
            city.addClass('is-invalid');
            $('.card').hide();
        });
    });
});