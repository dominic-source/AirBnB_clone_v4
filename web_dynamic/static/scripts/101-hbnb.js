$(function () {
  const amenities = {};
  const cities = {};
  const states = {};

  // Amenities listener
  $('li input#amenity_filter').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });

  // State listener
  $('li input#state_filter').change(function () {
    if (this.checked) {
      states[this.dataset.name] = this.dataset.id;
    } else {
      delete states[this.dataset.name];
    }
    $('.locations h4').text(Object.keys(states).sort().join(', '));
  });

  // city listener
  $('li input#city_filter').change(function () {
    if (this.checked) {
      cities[this.dataset.name] = this.dataset.id;
    } else {
      delete cities[this.dataset.name];
    }
    $('.locations h4').text(Object.keys(cities).sort().join(', '));
  });

  // Update with status on screen
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Search places, city, state
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
            <div class="max_guest">${obj.max_guest} Guest${obj.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${obj.number_rooms} Bedroom${obj.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${obj.number_bathrooms} Bathroom${obj.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
          </div>
          <div class="description">${obj.description}</div>
	  <div class="reviews">
            <h2>Reviews <span id="review_show" data-id=${obj.id}>show</span></h2>
      	    <ul>
	    </ul>
    	  </div>
        </article>`;
        $('section.places').append(elem);
      }
    }
  };
  $.post(objData);

  // Make the request when the search button is clicked
  $('section.filters button[type="button"]').on('click', function () {
    objData.data = JSON.stringify({
      amenities: Object.keys(amenities),
      cities: Object.keys(cities),
      states: Object.keys(states)
    });
    $.post(objData);
  });

  // Make reviews
  $('div.reviews #review_show').on('click', function () {
    const select = $('#review_show').text();
    if (select === 'show') {
      $.get(`http://0.0.0.0:5001/api/v1/places/${this.dataset.id}/reviews`, function (data) {
        for (const newdata of data) {
	  // Get user full name
	  let fullName = '';
	  $.get(`http://0.0.0.0:5001/api/v1/places/${this.dataset.id}/reviews`, function (result) {
	    fullName = result.first_name + ' ' + result.last_name;
	  });

	  const elem = `<li>
	  		<h3> From ${fullName} ${newdata.updated_at} </h3>
			<p> ${newdata.text} </p>
		      </li>`;
          $('div.reviews ul').append(elem);
        }
      });
      $('#review_show').text('hide');
    } else if (select === 'hide') {
      $('.reviews ul li').detach();
      $('#review_show').text('hide');
    }
  });
});
