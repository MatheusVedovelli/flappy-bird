let birds = [];
let pipes = [];
let frames = 0;
const POPMAX = 500;
let genCount = 1;
let startTime = 0;


function getTime()
{
    return new Date().getTime();
}

function setup()
{
    createCanvas(600, 800);
    frameRate(60);
    
    for(let i = 0; i < POPMAX; i++)
    {
        birds[i] = new Bird();
    }

    startTime = getTime();
}

function drawInfo()
{
    textAlign(CENTER);
    textSize(30);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    let time = Math.floor((getTime() - startTime) / 1000);
    let secs = Math.floor(time%60);
    let mins = Math.floor((time/60)%60);
    let hours = Math.floor((time/60) / 60);
    let timetext = "Lifetime " + hours + ":" + mins + ":" + secs;
    text(timetext, width/2, height-100);
    let gentext = "Generation " + genCount;
    text(gentext, width/2, height-50);
    stroke(0);
}

function draw()
{
    background(0);

    if(frames%100 == 0)
        pipes.push(new Pipe());

    frames++;

    for(let i = pipes.length-1; i >= 0; i--)
    {
        pipes[i].main();
        pipes[i].show();

        if(pipes[i].dead())
        {
            pipes.slice(i, 1);
        }
    }

    let haveAlive = false;
    for(let i = 0; i < birds.length; i++)
    {
        if(!birds[i].dead)
        {
            haveAlive = true;
            birds[i].think(pipes);
            birds[i].main();
            birds[i].show();
            birds[i].collide(pipes);
        }
    }

    drawInfo();

    if(!haveAlive)
    {
        nextGen();
        pipes = [];
        frames = 0;
        startTime = getTime();
        genCount++;
    }
}