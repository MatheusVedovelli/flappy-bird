let bird;
let pipes = [];
function setup()
{
    createCanvas(600, 800);
    frameRate(60);
    bird = new Bird();
    pipes.push(new Pipe());
}

function mousePressed()
{
    bird.jump();
}

function keyPressed()
{
    if(key == ' ')
        bird.jump();
}

function draw()
{
    background(0);

    if(frameCount%70 == 0)
        pipes.push(new Pipe());

    for(let i = pipes.length-1; i >= 0; i--)
    {
        pipes[i].show();

        if(pipes[i].collide(bird.x, bird.y, bird.radius))
        {
            //console.log("colidiu");
        }

        if(pipes[i].dead())
        {
            pipes.slice(i, 1);
        }
    }

    bird.think(pipes[0]);
    bird.show();
}