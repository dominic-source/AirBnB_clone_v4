$(function () {
  const amenities = {};
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });
  // Update with status on screen
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  // Search places
  const url2 = 'http://0.0.0.0:5001/api/v1/places_search/';
  const objData = {
    url: url2,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({}),
    dataType: 'json',
    success: function (response) {
      for (const obj in response) {
        const elem = `<article>
          <div class="title_box">
            <h2>${obj.name}</h2>
            <div class="price_by_night">${obj.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${obj.max_guest}</div>
            <div class="number_rooms">${obj.number_rooms}</div>
            <div class="number_bathrooms">${obj.number_bathrooms}</div>
          </div>
          <div class="user">
          </div>
          <div class="description">${obj.description}</div>
        </article>`;
        $('section.places').append(elem);
      }
    }
  };
  $.post(objData);

  $('section.filters button[type="button"]').on('click', function () {
    objData.data = JSON.stringify({ amenities: Object.keys(amenities) });
    $.post(objData);
  });
});
