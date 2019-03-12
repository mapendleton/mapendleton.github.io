function OpenNavMenu(className,toggle1,toggle2,toggle3,toggle4)
{
    //for if I add more buttons
    var buttons = document.getElementsByClassName(className);
    var toggles = [toggle1,toggle2,toggle3,toggle4];
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] != null) {
            buttons[i].classList.toggle(toggles[i]);
        }
    }
    ClosePopUp();
}
//closes whatever pop up is up
function ClosePopUp() 
{
    var popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        const element = popups[i];
        if (element.classList.contains('popup_appear')) {
            element.classList.toggle('popup_appear');
            element.firstElementChild.classList.toggle('text_box_appear');
        }
    }
}
//overloaded, closes everypop up except the one matching the id passed; for switch pop up method
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

function OpenExpMenu()
{
    var rotater = document.getElementById("rotater");
    rotater.classList.toggle("rotate_rotater");

    var exp_buttons = document.getElementsByClassName("rotater_child");
    for (let i = 0; i < exp_buttons.length; i++) {
        exp_buttons[i].classList.toggle("rotater_exp_buttons");
    }
    ClosePopUp();
}

function Carousel()
{
    //sections href tags
    var home = "#home";
    var skills = "#skills";
    var exp = "#exp";
    //get element and it's href value
    var element = document.getElementById('home_button');
    var link = element.getAttribute('href');
    //get img of home button
    var pic = document.getElementById('home_button_pic');
    //toggles picture
    if (pic.classList.contains('photo_change1')) {
        pic.classList.toggle('photo_change1');
        pic.classList.toggle('photo_change2');
    }
    else if (pic.classList.contains('photo_change2')){
        pic.classList.toggle('photo_change2');
    }
    else{
        pic.classList.toggle('photo_change1');
    }

    //switches where the button takes you
    if (link == home) {element.setAttribute('href',skills);}
    else if (link == skills) {element.setAttribute('href',exp);}
    else if (link == exp) {element.setAttribute('href',home);}
}



function SwitchPopUpSection(divID) 
{
    ClosePopUp(divID);
    var popup_div = document.getElementById(divID);
    popup_div.classList.toggle('popup_appear');
    popup_div.firstElementChild.classList.toggle('text_box_appear');
    //move background text
    MoveBackgroundText();
}

function MoveBackgroundText() 
{
    var background_texts = document.getElementsByClassName('background_text');
    for (let i = 0; i < background_texts.length; i++) {
        const element = background_texts[i];
        element.classList.toggle('background_text_toggle');
    }
}
