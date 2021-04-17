window.feedbackDone = false;

        window.sendFeedback = () => {
            if(window.feedbackDone == true) {
                return window.close()
            }

            const urlParams = new URLSearchParams(window.location.search);

            const products = {
                dot: "Dot Browser"
            }

            fetch("/feedback/send", { 
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    product: products[urlParams.get("product")],
                    version: urlParams.get("version"),
                    channel: urlParams.get("channel"),
                    feedback: document.getElementById("fb-ta").value
                })
            }).then(res => {
                if(res.status == 200) {
                    document.getElementById("fb-m").style.display = "";
                    document.getElementById("fb-ta").style.display = "none";
                    document.getElementById("fb-btn").style.display = "none";
                    document.getElementById("fb-t").innerHTML = "Thank you"
                    document.getElementById("fb-d").innerHTML = `Thank you for taking the time to improve ${products[urlParams.get("product")]}!`

                    window.feedbackDone = true;
                } else {
                    document.getElementById("fb-m").style.display = "none";
                    document.getElementById("fb-ta").style.display = "none";
                    document.getElementById("fb-btn").style.display = "none";
                    document.getElementById("fb-t").innerHTML = "Error"
                    document.getElementById("fb-d").innerHTML = `Failed to send feedback. Please let a maintainer know!` 
                }
            }).catch(res => {
                document.getElementById("fb-m").style.display = "none";
                document.getElementById("fb-ta").style.display = "none";
                document.getElementById("fb-btn").style.display = "none";
                document.getElementById("fb-t").innerHTML = "Error"
                document.getElementById("fb-d").innerHTML = `Failed to send feedback. Please let a maintainer know!` 
            })
        }