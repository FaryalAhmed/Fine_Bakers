document.getElementById("sign_form").onsubmit = function() {


    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    email = document.getElementById('email').value;
    password = document.getElementById('pwd').value;
  
    var submit = true;


    var FirstNameCheck = CheckFirstName(fname);
    var LastNameCheck = CheckLastName(lname);  
    var EmailCheck = checkEmail(email)


    if (fname == "" && lname == "" && email == "" && password == "") {
        alert("Kindly fill the Form");
        submit = false;

    } else if (fname == "" || lname == "" || email == "" || password == "" ) {
        alert("Kindly Complete the Form");
        submit = false;

    } else {
        if (FirstNameCheck == 0) {
            alert("Inavlid First Name");
            submit = false;
            return
        }
        if (LastNameCheck == 0) {
            alert("Inavlid Last name");
            submit = false;

            return
        }
        if (EmailCheck == 0) {

            alert("Invalid Email");
            submit = false;

            return
        }


    }



    function checkPassword(password) {
        var check = 0
        var regex = new RegExp("(?=.[a-z]{2})(?=.[A-Z])(?=.[0-9]{2})(?=.[!@#$%^&*)(-_]{2})");
        if (regex.test(password)) {
            return check = 1
        } else {
            return check = 0
        }
    }

    function checkEmail(email) {
        var check = 1;
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        if (re.test(email)) {
            check = 1;
            console.log(check);

        } else { check = 0 }
        return check;
    }




    function CheckFirstName(fname) {

        var check = 1;
        for (i = 0; i <= fname.length - 1; i++) {
            var n = fname.charCodeAt(i);
            if (!((n >= 65 && n <= 90) || (n >= 97 && n <= 122) || n == 32)) {
                check = 0
            }
        }
        return check;
    }





    function CheckLastName(lname) {

        var check = 0
        var length = lname.length
        for (i = 0; i <= length - 1; i++) {
            var n = lname.charCodeAt(i);

            if ((n >= 65 && n <= 90) || (n >= 97 && n <= 122) || n == 32) {
                check = 1
            } else {
                check = 0
                break;
            }
        }
        return check;
    }



    return submit;

}