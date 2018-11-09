//Defind these functions outside and call them when the docs are ready

$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
//add margin in CSS
    return `<br>
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars.small}" alt="avatar">
          <div class="UserName">${tweet.user.name}</div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <div class="CreationDate">${jQuery.timeago(tweet.created_at)}</div>
        </footer>
        </article>`;
  }


//you can append the child
  function renderTweets(tweets) {
    for (let tweet of tweets) {
      $('.container').append(createTweetElement(tweet));
      // $('.container').prepend(createTweetElement(tweet));
    }
  }

  function loadTweets () {
    $.ajax({ url: '/tweets', method: 'GET', dataType: "json"})
    .then(function (serverResponse) {
      renderTweets(serverResponse);
    });
  }

  $('form').on('submit', function () {
    event.preventDefault();
    let formInput = $('.new-tweet textarea').val().length;
    if (formInput === 0) {
      $('.error').html("You didn't enter anything").slideDown("slow");
    } else if (formInput > 140) {
      $('.error').html("You've reached the maximum amount of characters").slideDown("slow");
    } else {
      $('.error').slideUp("slow");
      $.ajax({ type: 'POST', url: '/tweets', data: $( this ).serialize(), complete: loadTweets })
      .then(function (serverResponse) {
        console.log('Success: ', serverResponse);
      });
    }
  });

  $( "button" ).click(function() {
  $( ".new-tweet" ).slideToggle( "slow" );
  $( ".new-tweet textarea" ).focus();
  });

});











