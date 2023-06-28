var isGameMode = false;
let mousePositionListener = null; //temporary as not sure how to remove event listener that has a binded property without this
const myIntervals = []; //for interval also not sure yet how to better handle this...just want it to work first

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

function ToggleHideNavButtons (){
    var circle = document.getElementById('main-circle-buttons');
    var buttons = circle.children;
    for (let x of buttons){
        x.classList.toggle('transform-none');
    }
}

function SetupGun() {
    isGameMode = true;
    ToggleHideNavButtons();
    var gunBarrel = document.getElementById('gun-barrel');
    var bullet = document.getElementById('bullet');
    gunBarrel.classList.toggle('active');
    let root = document.documentElement;
    root.addEventListener('click', BulletListener);
    var targets = bullet.getElementsByClassName('target');
    for(let target of targets){
        let id = setInterval(MoveTarget,2000,target);
        myIntervals.push(id);
        console.log('setting interval, id: '+id);
    }
}

function MoveTarget(target){
    if(isGameMode){
        target.style.setProperty('left',Math.floor(Math.random()*100)+"%");
        // console.log(target.style.getPropertyValue('left'));
        target.classList.toggle('move');
    }
    else {
        console.log('clearing intervals...');
        myIntervals.forEach(function(value){
            console.log('clearing interval...id: '+value);
            clearInterval(value)
        });
        myIntervals.length = 0;
    }
}

function followMouse (id) {
    el = document.getElementById(id);
    const position = el.getBoundingClientRect();
    el.style.transition = 'none';
    mousePositionListener = MousePositionListener.bind(position);
    document.addEventListener('mousemove', mousePositionListener, true);
}

function EndGame() {
    if(isGameMode){
        ToggleHideNavButtons();
        console.log('game mode deactivating...')
        isGameMode = false;
        document.removeEventListener('mousemove', mousePositionListener, true);
        document.documentElement.removeEventListener('click', BulletListener);
        el = document.getElementById('home_button');
        el.classList.remove('transition-none');
        el.style.transform = 'rotate(0deg)';
        el.style.transition = 'all .4s linear';
        document.getElementById('gun-barrel').classList.remove('active');
        
    }
}

//Listener Callback Methods
function MousePositionListener(event){
    const x = event.x - (this.x + this.width / 2);
    const y = this.y + this.height / 2 - event.y;
    const degrees = Math.atan(x / y) * (180 / Math.PI) + (y < 0 ? 180 : 0);
    el.style.transform = `rotate(${degrees}deg)`;
}

function BulletListener(event){
    if(!bullet.classList.contains('move') && bullet.offsetLeft == 50){ //can't shoot until it's returned to starting pos
        bullet.classList.toggle('move');
        this.style.setProperty('--mouse-x', event.clientX + "px");
        this.style.setProperty('--mouse-y', event.clientY + "px");
        setTimeout(function(){
            bullet.classList.toggle('move');
        }, 1000);
    }
}