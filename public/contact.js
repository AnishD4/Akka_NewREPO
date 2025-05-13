document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const information = document.getElementById('information').value;

    let check = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        check = false;
        alert("Enter a Valid Email");
    }
    if(information.length < 10){
        check = false;
        alert("Please provide more feedback");
    }
    if(check){
        const content = {firstName, lastName, email, information};
        const d = JSON.stringify(content);
        try {
            const response = await fetch("/save-contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: d }),
            });

            if (response.ok) {
                document.querySelector('form').reset(); // Clear the form
                alert(`${firstName} ${lastName}, Your Feedback has been Logged!`);
            } else {
                alert("Temporary Problem-- Server Side Issue")

            }
        } catch (error) {
            console.error("Error submitting form:", error);

        }

    }



});