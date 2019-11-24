class Bird
{
    constructor(brain)
    {
        this.x = 64;
        this.y = height/2;
        this.radius = 32;
        
        this.gravity = 0.5;
        this.speed = 0;

        this.dead = false;

        this.score = 0;
        this.fitness = 0;

        if(brain)
        {
            this.brain = brain;
        }
        else
        {
            this.brain = new NeuralNetwork({
                input: 5,
                hidden: 10,
                output: 2
            });
        }
    }

    clone()
    {
        return this.brain.clone();
    }

    dispose()
    {
        this.brain.dispose();
    }

    mutate(rate)
    {
        this.brain.mutate(rate);
    }

    jump()
    {
        this.speed = -10;
    }

    main()
    {
        this.score++;
        this.speed += this.gravity;
        this.y += this.speed;
        this.y = constrain(this.y, 0, height);
    }

    collide(pipes)
    {
        for(let i = 0; i < pipes.length; i++)
        {
            if(pipes[i].collide(this.x, this.y, this.radius))
            {
                this.dead = true;
                break;
            }
        }

        if(this.y >= height)
            this.dead = true;
    }

    think(pipes)
    {
        let pipe;
        let mindist = width*2;

        for(let i = 0; i < pipes.length; i++)
        {
            let dist = (pipes[i].x + pipes[i].width) - this.x;
            if(dist > 0 && dist < mindist)
            {
                pipe = pipes[i];
                mindist = dist;
            }
        }

        tf.tidy(() => {
            let inputs = tf.tensor2d([this.y / height, pipe.x / width, pipe.top / height, (height - pipe.bottom) / height, this.speed/10], [1, 5]);
            let outputs = this.brain.predict(inputs).dataSync();
            if(outputs[0] > outputs[1])
                this.jump();
        });
    }

    show()
    {
        fill(255, 100);
        ellipse(this.x, this.y, this.radius);
    }
}