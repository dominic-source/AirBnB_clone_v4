$(function () {
  let amenity_ids = {}
  $('#check_amen').on('change', function () {
    
    attr = $(this).attr('data-id');
    value = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenity_ids[attr] = value;
    } else {
      delete amenity_ids[attr];
    }
    let elem = '<ul>'
    for (const ids in amenity_ids) {
      elem += '<li>' + ids + '</li>';
    }
    elem += '</ul>';
    $('div.amenities h4').append(elem)
  }).trigger('change');
});
