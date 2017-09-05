//---------------------------------------------------------------------------------------------------------------
function enterKeyPressed() {
    if(event.keyCode == 13) {
        validateEmailFormat();
    }
}

//---------------------------------------------------------------------------------------------------------------
function validateEmailFormat() {
    var x = document.getElementById("email").value;

    var atPos = x.indexOf('@');
    var dotPos = x.lastIndexOf('.');

    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= x.length || x == "" || x == null) {
        document.getElementById("email").value = "";
        document.getElementById("emailSubText").innerHTML = "Please enter a valid email address.";
        document.getElementById("emailSubText").style.color = '#ffb94d';
    } else {
        checkIfEmailExists();
    }
}

//---------------------------------------------------------------------------------------------------------------
function checkIfEmailExists() {
    var emailAddress = document.getElementById("email").value;
    var emailRef = firebase.database().ref('Users').orderByChild('EmailAddress').equalTo(emailAddress);

    emailRef.once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (exists == false) {
            uploadEmail(emailAddress);
        } else {
            document.getElementById("email").value = "";
            document.getElementById("emailSubText").innerHTML = "This email already exists.";
            document.getElementById("emailSubText").style.color = '#ffb94d';
        }
    });
}

//---------------------------------------------------------------------------------------------------------------
function uploadEmail(email) {
    var firebaseRef = firebase.database().ref();
    var uniqueKey = firebaseRef.child('Users').push().key;

    firebaseRef.child("Users").child(uniqueKey).child("EmailAddress").set(email);

    document.getElementById("email").value = "";
    document.getElementById("emailSubText").innerHTML = "Success!";
    document.getElementById("emailSubText").style.color = '#70e66d';
}
