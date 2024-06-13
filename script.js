const key = "NaNa6FIcuZNmbTuS6BH7tHgg2aUXobgQNP7Cwnsg";
const query = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=" + key;

var displayLeft;
const displayRight = document.querySelector('.displayRight');
const displayContainer = document.querySelector('.displayContainer');
// const displayLeft = document.querySelector('.displayLeft');

const updated = true;

var clicked = false;
var opened;

var pictureList = [];

var APIresponse;

dictKey = 'latest_photos';

function main() // Send API query and store result in "data"
{
    console.log(query);
    
    fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            APIresponse = data;
            sort_data(APIresponse);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function sort_data(data) // Takes all the pictures out of the query and displays them.
{
    displayRight.innerHTML = ``;
    for(let i = 0;  i < data[dictKey].length; i++)
    {
        let id = i;
        let current = data[dictKey][i];
        displayRight.innerHTML = displayRight.innerHTML + `
        <div class = "picture" id = "picture`+ id +`" onclick="openPicture(this.id)"> 
            <img class='images' src = `+ current['img_src'] + `>
            <figcaption class = 'caption'> `+ current['earth_date'] +` </figcaption>
        </div>
        `;
    }
}

function openPicture(id) // Opens a picture which means to enlarge it on the displayLeft
{
    var element=document.getElementById(id);

    if (displayLeft != null)
    {
        resetLeftDisplay();
    }
    var newDisplayLeft = document.createElement('div');
    newDisplayLeft.classList.add('displayLeft');
    displayContainer.appendChild(newDisplayLeft);
    displayLeft = newDisplayLeft;
    
    var idNum = id.split('e')[1];
    var pic = APIresponse[dictKey][idNum];

    newDisplayLeft.style.marginLeft = "15px";
    newDisplayLeft.style.width = "100%";
    displayRight.style.width = "30%";
    // displayLeft.style.border = '2px solid orange';
    newDisplayLeft.innerHTML = `
        <div class = "left"> 
        <img class='openImage' src = `+ pic['img_src'] + `>
        <figcaption class = 'caption'> `+ pic['earth_date'] +` </figcaption>
    </div>
    `;
    
    // element.style.width = '100%';
    clicked = true;
    opened = id;
}

function resetLeftDisplay()
{
    if(displayLeft != null)
    {
        displayLeft.innerHTML = ``;
        displayLeft.remove();
    }
}

function search()
{
    const search = document.getElementById('searchInput');
    const string = search.value;
    search.value = '';
    const regex = new RegExp("[0-9][0-9][0-9][0-9]-[0-1]?[0-9]-[0-3]?[0-9]");
    const found = string.match(regex);
    
    resetLeftDisplay()
    displayRight.style.width = '100%';

    if (found != null)
    {
        displayRight.innerHTML = `Loading...`;
        const newQuery = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+ string +"&api_key=" + key;
        console.log(newQuery);
        fetch(newQuery)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            APIresponse = data;
            dictKey = 'photos';
            console.log(APIresponse);
            resetLeftDisplay();
            if (APIresponse[dictKey].length == 0)
            {
                displayRight.innerHTML = `COULD NOT FIND PICTURES FOR THE DATE ` + string;
            }
            else
            {
                sort_data(APIresponse);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayRight.innerHTML = `COULD NOT FIND PICTURES FOR THAT DATE`;
            resetLeftDisplay();
        });
    }
    else
    {
        displayRight.innerHTML = `Invalid Input. Please input a date in the format: "YYYY-MM-DD" (Including the hyphens)`;
    }
}

main();