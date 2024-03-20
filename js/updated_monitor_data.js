class Fan_control {
    constructor(fan_speed) {
        this._fan_speed = fan_speed;
    }
    set fan_speed(fan_speed) {
        this._fan_speed = fan_speed;
    }
    get fan_speed() {
        return this._fan_speed;
    }
}
let fan_control = new Fan_control(0);


function validateInput() {
    var x = document.getElementById("fanSpeed").value;
    if (x < 0 || x > 100) {
        showToast("Invalid input. Value must be between 0 and 100.", "error");
        return false;
    }
    showToast("Valid input. Sending data...", "success");
    x = mapTo255PWM(x);
    sendData(x);
    return true;
}

function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        validateInput();
    }
}

function sendData(speed) {
    // $.ajax({
    //     url: "http://192.168.137.211/fanSpeed",
    //     data: { fanSpeed: speed },
    //     type: "GET",
    //     success: function (json) {
    //         let fanSpeed = mapTo100Percentage(speed);
    //         showToast("Data received. Fan speed: " + fanSpeed, "success");
    //         fan_control.fan_speed = fanSpeed;
    //     },
    //     error: function (xhr, status, error) {
    //         console.error("AJAX error:", status, error);
    //     }
    // });
    

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.0.163/fanSpeed?fanSpeed=" + speed, true);
    xhr.onreadystatechange = function (json) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // var json = JSON.parse(xhr.responseText);
            // let fanSpeed = mapTo100Percentage(json.fanSpeed);
            // showToast("Data received. Fan speed: " + fanSpeed, "success");
            // fan_control.fan_speed = fanSpeed;
            // console.log(fan_speed);
            let fanSpeed = mapTo100Percentage(speed);
            showToast("Data received. Fan speed: " + fanSpeed, "success");
            fan_control.fan_speed = fanSpeed;
            // xhr.abort();
        }
    };
    xhr.send();
}

function mapTo255PWM(value) {
    return Math.round((value / 100) * 255);
}

function mapTo100Percentage(value) {
    return Math.round((value / 255) * 100);
}

function showToast(message, type) {
    var toast = document.getElementById("toast");
    var toastBody = document.getElementById("toastBody");
    toast.className = "toast fade show";
    toastBody.innerHTML = message;
    if (type === "success") {
        toastBody.className = "toast-body text-success";
    } else {
        toastBody.className = "toast-body text-danger";
    }
    $('.toast').toast({ delay: 2000 });
    $('.toast').toast('show');
}

