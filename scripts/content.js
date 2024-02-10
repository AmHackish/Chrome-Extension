console.log('In content script');
let month_name = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "Sepetember", 
    "October", 
    "November", 
    "December"
];
let Week_name = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let time = document.getElementsByClassName('time');
let ele = document.getElementsByClassName('date');

function showdate(){
    let date = new Date();
    let curr_date = date.getDate().toString();
    if(curr_date.length == 1) {
        curr_date = "0"+curr_date;
    }
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    ele[0].textContent = `${Week_name[day]}, ${month_name[month]} ${curr_date}, ${year}`;
}

function showTime() {
    let date = new Date();
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if(minutes.length == 1) {
        minutes = "0"+minutes;
    }
    if(hour.length == 1) {
        hour = "0"+hour;
    }
    time[0].innerText = `${hour}:${minutes}`;
}
setInterval(showTime, 1000);

showdate();

const RSS_FEED_URL = "https://codingchallenges.substack.com/feed";

fetch(RSS_FEED_URL)
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        let i = 1;
        let html = ``;
        items.forEach(el => {
            let link = el.querySelector("link").innerHTML;
            let arr = link.split("/");
            let header = arr[arr.length-1];
            console.log(header);
            if(i > 9) {
                return;
            }
            html += `
                <div class="item"> 
                    <p> ${i}. </p>
                    <a href="${link}">${header}</a>
                </div>
            `;
            i++;
        });
        document.getElementsByClassName("feedlist")[0].innerHTML = html;
    });
