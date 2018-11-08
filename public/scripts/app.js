// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


$(document).ready(function() {

//define them outside and callthem within the doc.ready
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
          <div class="CreationDate">${tweet["created_at"]}</div>
        </footer>
        </article>`;
  }

  function renderTweets(tweets) {
    for (let tweet of tweets) {
      $('.container').append(createTweetElement(tweet));
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











