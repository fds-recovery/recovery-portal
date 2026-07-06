const bootLines = [
    "Initialising recovery node...",
    "Loading recovery modules...",
    "Connecting to archive...",
    "Secure connection established."
];

const bootText = document.getElementById("bootText");

let currentLine = 0;

function nextLine(){

    if(currentLine < bootLines.length){

        bootText.innerHTML += "&gt; " + bootLines[currentLine] + "<br>";

        currentLine++;

        setTimeout(nextLine, 900);

    }else{

        setTimeout(function(){

            document.getElementById("bootScreen").style.display = "none";
            document.getElementById("loginScreen").style.display = "flex";

        },1200);

    }

}

nextLine();

document.getElementById("verifyButton").addEventListener("click", function(){

    const code = document.getElementById("code").value.trim();

    if(code === "IMG-05-27-RECOVER"){

        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";

        startRecovery();

    }else{

        document.getElementById("message").innerHTML =
            "Invalid recovery code.";

    }

});

function startRecovery(){

    const progress = [3,8,14,22,36,51,67,84,100];

    let i = 0;

    const timer = setInterval(function(){

        document.getElementById("progressBar").style.width =
            progress[i] + "%";

        document.getElementById("progressText").innerHTML =
            progress[i] + "%";

        i++;

        if(i >= progress.length){

            clearInterval(timer);

            document.getElementById("imageFile")
                .classList.remove("disabled");

            document.getElementById("imageFile")
                .classList.add("enabled");

        }

    },700);

}

document.getElementById("imageFile").addEventListener("click", function(){

    document.getElementById("viewerOverlay").style.display = "flex";

    document.getElementById("loadingText").style.display = "block";

    document.getElementById("loadingText").innerHTML = "Decrypting evidence...";

    document.getElementById("imageContainer").style.display = "none";

    document.getElementById("recoveryComplete").style.display = "none";
    document.getElementById("recoveryComplete").style.opacity = "0";

    setTimeout(function(){

        document.getElementById("loadingText").innerHTML =
            "Recovering image sectors...";

    },1500);

    setTimeout(function(){

        document.getElementById("loadingText").style.display = "none";

        document.getElementById("imageContainer").style.display = "block";

        const mask = document.getElementById("revealMask");

        let percentage = 0;

        mask.style.transform = "translateY(0%)";

        const animation = setInterval(function(){

            percentage += 2.5;

            mask.style.transform = "translateY(" + percentage + "%)";

            if(percentage >= 100){

                clearInterval(animation);

                setTimeout(function(){

                    const text = document.getElementById("recoveryComplete");

                    text.style.display = "block";

                    setTimeout(function(){

                        text.style.opacity = "1";

                    },100);

                },5000);

            }

        },70);

    },3000);

});

document.getElementById("closeViewer").addEventListener("click",function(){

    document.getElementById("viewerOverlay").style.display = "none";

});

document.getElementById("caseReport").addEventListener("click",function(){

    document.getElementById("reportOverlay").style.display="flex";

});

document.getElementById("closeReport").addEventListener("click",function(){

    document.getElementById("reportOverlay").style.display="none";

});