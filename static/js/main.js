window.shortenURL = () => {
    const formDetails = {
        longURL: document.getElementById("bl-lu").value
    }
    var formBody = [];
    for (var property in formDetails) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(formDetails[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/api/url/shorten", { 
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(async res => {
        if(res.status == 200) {
            const data = await res.json();
            document.getElementById("bl-btn").onclick = () => window.resetPage();
            document.getElementById("bl-btn").innerHTML = "Shorten Another URL"
            document.getElementById("bl-t").innerHTML = "URL Shortened!"
            document.getElementById("bl-d").innerHTML = `${data.url}`
            document.getElementById('bl-f').style.display = 'none'
        } else {
            document.getElementById("bl-btn").onclick = () => window.resetPage();
            document.getElementById("bl-btn").innerHTML = "Try Again"
            document.getElementById("bl-t").innerHTML = "Something went wrong"
            document.getElementById("bl-d").innerHTML = `Please try again later`
            document.getElementById('bl-f').style.display = 'none'
        }
    }).catch(res => {
        document.getElementById("bl-btn").onclick = () => window.resetPage();
        document.getElementById("bl-btn").innerHTML = "Try Again"
        document.getElementById("bl-t").innerHTML = "Something went wrong"
        document.getElementById("bl-d").innerHTML = `Please try again later`
        document.getElementById('bl-f').style.display = 'none'
    })
}

window.resetPage = () => {
    window.location.reload()
}