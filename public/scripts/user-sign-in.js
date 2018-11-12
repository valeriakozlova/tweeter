//This registration feature is in development

$(document).ready(function() {

  const userSignInAndRegistration =`
      <section class="sign-in">
        <center><h2>SIGN IN</h2>
        <form method="POST" action="/users/login">
        <input class="entry" type="text" name="handle" placeholder="Enter your handle"><br>
        <input class="entry" type="password" name="password" placeholder="Enter your password"><br>
        <input type="Submit" class= "button" value="SIGN IN">
        </center>
        </form>
      </section>

      <section class="sign-up">
        <center><h2>SIGN UP</h2>
        <form method="POST" action="/users/register">
        <input class="entry" type="text" name="name" placeholder="Enter your name"><br>
        <input class="entry" type="text" name="handle" placeholder="Enter your handle"><br>
        <input class="entry" type="password" name="password" placeholder="Enter your password"><br>
        <input type="Submit" class= "button" value="SIGN UP">
        </center>
        </form>
      </section>`;

// Once the login/reg button is clicked the registration/login field appears
// and the sign-in button is removed.

  $( ".sign-in-button" ).click(function() {
    $('.container').prepend(userSignInAndRegistration);
    $( ".sign-in-button" ).remove();
    signIn ();
  });

});
