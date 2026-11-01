
$(document).ready(function () {

    // Prevent selecting a future date of birth
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    $("#dob").attr("max", localToday);

    $("#registrationForm").on("submit", function (event) {
        event.preventDefault();

        const fullname = $("#fullname").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const dob = $("#dob").val();
        const gender = $("#gender").val();
        const course = $("#course").val();
        const address = $("#address").val().trim();

        if (fullname.length < 2) {
            alert("Please enter your full name.");
            $("#fullname").focus();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            $("#email").focus();
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Enter a valid 10-digit phone number.");
            $("#phone").focus();
            return;
        }

        if (!dob || dob > localToday) {
            alert("Please select a valid date of birth.");
            $("#dob").focus();
            return;
        }

        const details = [
            ["Full Name", fullname],
            ["Email Address", email],
            ["Phone Number", phone],
            ["Date of Birth", dob],
            ["Gender", gender],
            ["Course / Application", course],
            ["Address", address]
        ];

        // Create the table safely without inserting user text as HTML
        const table = $("<table>").addClass("result-table");
        const tbody = $("<tbody>");

        details.forEach(function (item) {
            const row = $("<tr>");
            $("<th>").text(item[0]).appendTo(row);
            $("<td>").text(item[1]).appendTo(row);
            tbody.append(row);
        });

        table.append(tbody);
        $("#result").empty().append(table);

        // Show result and hide form
        $("#formContainer").prop("hidden", true);
        $("#resultContainer").prop("hidden", false);

        window.scrollTo(0, 0);
    });

    // Return to the form to enter another application
    $("#backButton").on("click", function () {
        $("#resultContainer").prop("hidden", true);
        $("#formContainer").prop("hidden", false);
        $("#registrationForm")[0].reset();

        window.scrollTo(0, 0);
    });

    // Clear the form normally when Reset is clicked
    $("#registrationForm").on("reset", function () {
        // The browser resets the input fields automatically.
    });

});
