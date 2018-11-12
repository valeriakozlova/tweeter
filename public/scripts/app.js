//To do: defind these functions outside of doc ready and call them when the doc is ready

$(document).ready(function() {

//Prevents people from using script on your website
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    return `
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars.small}" alt="avatar">
          <div class="user-name">${tweet.user.name}</div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <div class="creation-date">${jQuery.timeago(tweet.created_at)}</div>
        </footer>
        </article>`;
  }

  function renderTweets(tweets) {
    for (let tweet of tweets) {
      $('.tweet-feed-container').prepend(createTweetElement(tweet));
    }
  }

  function loadTweets () {
    $.ajax({ url: '/tweets', method: 'GET', dataType: "json"})
    .done(function (serverResponse, status, response) {
      if (response.status === 500) {
        console.log(serverResponse);
      } else {
        renderTweets(serverResponse);
      }
    });
  }

  $('.new-tweet form').on('submit', function () {
    console.log("created a new tweet")
    event.preventDefault();
    let formInput = $('.new-tweet textarea').val().length;
    //Add a function that returns true or false
    if (formInput === 0) {
      $('.error').html("You didn't enter anything").slideDown("slow");
    } else if (formInput > 140) {
      $('.error').html("You've reached the maximum amount of characters").slideDown("slow");
    } else {
      $('.error').slideUp("slow");
      $.ajax({ type: 'POST', url: '/tweets', data: $( this ).serialize()})
      .then(function (serverResponse, status, response) {
        if(response.status === 201) {
          $('.tweet-feed-container').prepend(createTweetElement(serverResponse));
          console.log('Success: ', serverResponse);
        } else {
          console.log(serverResponse);
        }
      });
    }
  });

  $( "button" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow" );
    $( ".new-tweet textarea" ).focus();
  });

  //The new tweet area is hidden until called upon
  $(".new-tweet").hide();

  loadTweets();

});











