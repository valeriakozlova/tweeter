// This code checks the word count and turns the counter red when when user exceeded the limit

$(document).ready(function() {
  $('.new-tweet textarea').on('keyup',function(){
    var $input = $(this);
    console.log ($input.val());
    var $counter = $(this).parent().find('.counter');
    var currentCount = 140 - $input.val().length;
    if (currentCount < 0 && !$counter.hasClass('red')) {
      $counter.addClass("red");
    } else if ($counter.hasClass('red') && currentCount >= 0) {
      $counter.removeClass("red");
    }
    $counter.text(currentCount);
  })
});
