function Carousel()
{
    //sections href tags
    var home = "#home";
    var page1 = "#page1";
    var page2 = "#page2";
    //get element and it's href value
    var mainButton = document.getElementById('home-button-photo');
    var link = mainButton.getAttribute('href');
    //changes photo
    if (mainButton.classList.contains('photo_change1')){
        mainButton.classList.toggle('photo_change1');
        mainButton.classList.toggle('photo_change2');
    }
    else if(mainButton.classList.contains('photo_change2')){
        mainButton.classList.toggle('photo_change2');
    }
    else {mainButton.classList.toggle('photo_change1');}
    //switches where the button takes you
    if (link == home) {mainButton.setAttribute('href',page1);}
    else if (link == page1) {mainButton.setAttribute('href',page2);}
    else if (link == page2) {mainButton.setAttribute('href',home);}
}

function MoveBackgroundText() 
{
    var background_texts = document.getElementsByClassName('background_text');
    for (let i = 0; i < background_texts.length; i++) {
        const element = background_texts[i];
        element.classList.toggle('background_text_toggle');
    }
}

function SwitchPopUpSection(divID) 
{
    ClosePopUp(divID);
    var popup_div = document.getElementById(divID);
    popup_div.classList.toggle('popup_appear');
    //move background text
    MoveBackgroundText();
}

//closes whatever pop up is up
function ClosePopUp() 
{
    var popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        const element = popups[i];
        if (element.classList.contains('popup_appear')) {
            element.classList.toggle('popup_appear');
        }
    }
}

function ClosePopUp(divID)
{
    var popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        const element = popups[i];
        if (element.classList.contains('popup_appear') && element.id != divID) {
            element.classList.toggle('popup_appear');
            element.firstElementChild.classList.toggle('text_box_appear');
            MoveBackgroundText();
        }         
    }
}

function OpenModal(modelId)
{
    var modal = document.getElementById(modelId);
    modal.style.display = 'block';
}

function CloseModal(modelId)
{
    var modal = document.getElementById(modelId);
    modal.style.display = 'none';
}