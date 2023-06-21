var isGameMode = false;

function OpenNavButtonMenu (circleID)
{
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

function HideNavButtons (){
    var circle = document.getElementById('main-circle-buttons');
    var buttons = circle.children;

    for (let x of buttons){
        x.classList.toggle('transform-none');
    }
}

function SetupGun() {
    isGameMode = true;
    var gunBarrel = document.getElementById('gun-barrel');
    var bullet = document.getElementById('bullet');
    gunBarrel.classList.toggle('active');
    let root = document.documentElement;
    root.addEventListener('click', e => {
        console.log(bullet.offsetLeft);
        if(!bullet.classList.contains('move') && bullet.offsetLeft == 50){ //can't shoot until it's returned to starting pos
            bullet.classList.toggle('move');
            root.style.setProperty('--mouse-x', e.clientX + "px");
            root.style.setProperty('--mouse-y', e.clientY + "px");
            setTimeout(function(){
                bullet.classList.toggle('move');
            }, 1000);
        }
    });
}

function followMouse (id) {
    el = document.getElementById(id);
    el.classList.toggle('transition-none');
    const position = el.getBoundingClientRect();
    const callback = function(event) {
        const x = event.x - (position.x + position.width / 2);
        const y = position.y + position.height / 2 - event.y;
        const degrees = Math.atan(x / y) * (180 / Math.PI) + (y < 0 ? 180 : 0);
        el.style.transform = `rotate(${degrees}deg)`;
    };
    document.addEventListener('mousemove', callback, true);
}

function Shoot () {
    if(isGameMode){
        var bullet = document.getElementById('bullet');
        bullet.classList.toggle('move');
    }
}