var currentTimeSpan = document.createElement("span");
var totalTimeSpan = document.createElement("span");
currentTimeSpan.className = "currentTimeSpan";
totalTimeSpan.className = "totalTimeSpan";

var titleElement;
var totalTimeElement;
var currentTimeElement;
var streamTitle;
var progressBar;
var progress;

var titleCheck = setInterval(() => {
    titleElement = document.querySelector(".sc-AxirZ.fPFCUN");

    if(titleElement != null && titleElement.children.length > 0) {
        clearInterval(titleCheck);

        var dotSpan = titleElement.getElementsByTagName("span")[0].cloneNode(true);
        titleElement.appendChild(dotSpan);
        titleElement.appendChild(currentTimeSpan);
        titleElement.appendChild(totalTimeSpan);

        streamTitle = titleElement.textContent;

        progressBar = document.createElement("div");
        progressBar.id = "progressBar";
        progress = document.createElement("div");
        progress.id = "progress";
        progressBar.appendChild(progress);

        getElements();

        setInterval(() => {
            titleElement = document.querySelector(".sc-AxirZ.fPFCUN");
            var tempTitle = titleElement.textContent.substring(0, titleElement.textContent.length - currentTimeSpan.textContent.length - totalTimeSpan.textContent.length);
            if (streamTitle != tempTitle) {
                streamTitle = tempTitle;
                getElements();
            }
            
        }, 10000);
        
        setInterval(() => {
            currentTimeSpan.textContent = currentTimeElement.textContent;
            totalTimeSpan.textContent = " / " + totalTimeElement.textContent;
            progress.style.width = getProgress(currentTimeElement.textContent, totalTimeSpan.textContent);
        }, 1000);
    }
}, 1000);

function getElements() {
    currentTimeElement = document.querySelector(".sc-AxjAm.cyMGgB.vod-seekbar-time-labels").children[0];
    totalTimeElement = document.querySelector(".sc-AxjAm.cyMGgB.vod-seekbar-time-labels").children[1];

    currentTimeSpan.textContent = currentTimeElement.textContent;
    totalTimeSpan.textContent = " / " + totalTimeElement.textContent;
    progress.style.width = getProgress(currentTimeElement.textContent, totalTimeElement.textContent);
        
    document.querySelector(".channel-info-content").prepend(progressBar);
}

function getProgress(currentTime, totalTime) {
    var seconds = parseInt(currentTime.substring(currentTime.length - 2, currentTime.length));
    var minutes = parseInt(currentTime.substring(currentTime.length - 5, currentTime.length - 3));
    var hours = parseInt(currentTime.substring(0, currentTime.length - 5));
    
    var currentTimeSeconds = seconds + minutes * 60 + hours * 3600;

    var totalTime = totalTimeSpan.textContent.substring(3);

    seconds = parseInt(totalTime.substring(totalTime.length - 2, currentTime.length));
    minutes = parseInt(totalTime.substring(totalTime.length - 5, currentTime.length - 3));
    hours = parseInt(totalTime.substring(0, totalTime.length - 5));
    
    var totalTimeSeconds = seconds + minutes * 60 + hours * 3600;

    var progress = "" + (currentTimeSeconds * 100 / totalTimeSeconds) + "%";
    return progress;
}