function OpenNavButtonMenu (circleID)
{
    var circle = document.getElementById(circleID);
    var circleToggle = 'toggle-secondary-circle';
    var secondaryCircles = document.getElementsByClassName('secondary-circle');

    for (let i = 0; i < secondaryCircles.length; i++) {
        const element = secondaryCircles[i];
        //closes any menu except the the menu attached to button...otherwise can't click button to close same menu
        if (element.classList.contains(circleToggle) && element.id != circleID){element.classList.toggle(circleToggle);}
        //if menu is closed it'll open, if open it'll close
        if (element.id == circleID) {element.classList.toggle(circleToggle);}
    }
}