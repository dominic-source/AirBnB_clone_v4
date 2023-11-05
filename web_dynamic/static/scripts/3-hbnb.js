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
  const url2 = 'http://0.0.0.0:5001/api/v1/places_search/'
  $.post({
    url: url2,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({}),
    dataType: 'json',
    success: function (response) {
      for (const obj in response) {
        $('div.title_box h2').text = obj.name;

      }
    },
  });
