var isGameMode = false;
let mousePositionListener = null; //temporary as not sure how to remove event listener that has a binded property without this
const myIntervals = []; //for interval also not sure yet how to better handle this...just want it to work first
const collisionChecks = [];
const skillsList = [
    'C#',
    '.NET FRAMEWORK',
    'MVC/ASP.NET',
    'Entity Framework',
    'HTML5',
    'CSS3',
    'JavaScript',
    'SQL',
    'OOP',
    'Git',
    'TFS',
    'Azure Repos',
    'Azure Kubernetes Service',
    'Azure Pipelines',
    'Azure Container Registry',
    'Azure DevOps',
    'Azure Boards',
    'Kafka',
    'Java',
    'SpringBoot',
    'API',
    'Open API',
    'Bootstrap',
    'Agile',
    'Scrum',
    'Jira',
    'Linux VMs',
    'Ubuntu',
    'Python',
    'Bash',
    'ETL',
    'Tomcat',
    'Webhooks',
    'Jenkins',
    'Docker'
];
let skillsListCopy = [...skillsList];

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
        x.style.visibility = x.style.visibility == 'hidden' ? 'visible' : 'hidden';
    }
    const secondaryCircles = document.getElementsByClassName('secondary-circle');
    Array.from(secondaryCircles).forEach(x => {
        if (x.classList.contains('toggle-secondary-circle')) x.classList.toggle('toggle-secondary-circle');
    });
}

function SetupGame() {
    isGameMode = true;
    skillsListCopy = Shuffle([...skillsList]);
    ToggleHideNavButtons();
    var gunBarrel = document.getElementById('gun-barrel');
    var bullet = document.getElementById('bullet');
    document.getElementById('body-shirt').style.cursor = 'crosshair';
    gunBarrel.classList.toggle('active');
    let root = document.documentElement;
    root.addEventListener('click', BulletListener);
    var targets = bullet.getElementsByClassName('target');
    for(let target of targets){
        let id = setInterval(MoveTarget,2000,target);
        myIntervals.push(id);
        console.log('setting interval, id: '+id);

        id = setInterval(CheckCollision,10,bullet,target);
        console.log('setting collisionCheck, id: '+id);
        collisionChecks.push(id);
    }
    let skl = document.getElementById('skills-list')
    skl.innerHTML= "SKILLS:<br>";
    if (!skl.classList.contains('show')) skl.classList.toggle('show');
    document.getElementById('skip-game').classList.toggle('show');
    Array.from(document.getElementsByClassName('background_text')).forEach(x => {x.style.opacity = 0});
}

function AddSkillToList(){
    if(skillsListCopy.length > 0){
        let el = document.getElementById('skills-list');
        el.innerHTML += skillsListCopy.pop()+"<br>";
    }
}

function MoveTarget(target){
    if(isGameMode){
        target.style.setProperty('left',Math.floor(Math.random()*100)+"%");
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

function FollowMouse (id) {
    el = document.getElementById(id);
    const position = el.getBoundingClientRect();
    el.style.transition = 'none';
    mousePositionListener = MousePositionListener.bind(position);
    document.addEventListener('mousemove', mousePositionListener, true);
}

function EndGame(skip) {
    if(isGameMode){
        ToggleHideNavButtons();
        console.log('game mode deactivating...')
        isGameMode = false;
        document.removeEventListener('mousemove', mousePositionListener, true);
        document.documentElement.removeEventListener('click', BulletListener);
        document.getElementById('body-shirt').style.cursor = 'auto';
        el = document.getElementById('home_button');
        el.classList.remove('transition-none');
        el.style.transform = 'rotate(0deg)';
        el.style.transition = 'all .4s linear';
        el.children[0].classList.remove('loaded'); //home-button-photo
        document.getElementById('gun-barrel').classList.remove('active');
        document.getElementById('skip-game').classList.toggle('show');
        let skl = document.getElementById('skills-list');
        if (skip) {
            skl.innerHTML = "SKILLS:<br>";
            skillsList.forEach(function(value){
                skl.innerHTML += value+'<br>';
            });
        } else {
            skl.classList.toggle('show');
        }
        Array.from(document.getElementsByClassName('background_text')).forEach(x => {x.style.opacity = '1'});
    }
}

function CheckCollision(el1, el2) {
    if(isGameMode){
        var el1Rect = el1.getBoundingClientRect();
        var el2Rect = el2.getBoundingClientRect();
      
        if ((el1Rect.right >= el2Rect.left && el1Rect.left <= el2Rect.right) &&
            (el1Rect.bottom >= el2Rect.top && el1Rect.top <= el2Rect.bottom)){
                if(!el1.children[0].classList.contains('caught')){
                    el1.children[0].classList.toggle('caught');
                }
                setTimeout(function(){
                    AddSkillToList();
                },1000);
                el2.classList.toggle('move');
        }
    } else {
        console.log('clearing collisionChecks...');
        collisionChecks.forEach(function(value){
            console.log('clearing collisionCheck id: '+value);
            clearInterval(value);
        });
        CheckCollision.length = 0;
    }
    
  }

function Shuffle(array) {
let currentIndex = array.length,  randomIndex;

// While there remain elements to shuffle.
while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
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
        let homeButtonPhoto = document.getElementById('home-button-photo');
        homeButtonPhoto.classList.remove('loaded');
        bullet.classList.toggle('move');
        this.style.setProperty('--mouse-x', event.clientX + "px");
        this.style.setProperty('--mouse-y', event.clientY + "px");
        bullet.children[0].classList.remove('caught');
        setTimeout(function(){
            bullet.classList.toggle('move');
        }, 1000);
        setTimeout(function(){
            if (isGameMode) homeButtonPhoto.classList.add('loaded');
        }, 2000);
    }
}