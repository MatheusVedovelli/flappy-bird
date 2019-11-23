class Bird
{
    constructor()
    {
        this.x = 64;
        this.y = height/2;
        this.radius = 32;
        
        this.gravity = 0.5;
        this.speed = 0;

        this.brain = new NeuralNetwork({
            input: 5,
            hidden: 10,
            output: 2
        });
    }

    jump()
    {
        this.speed = -10;
    }

    main()
    {
        this.speed += this.gravity;
        this.y += this.speed;
        this.y = constrain(this.y, 0, height);
    }

    think(pipe)
    {
        tf.tidy(() => {
            let inputs = tf.tensor2d([this.x, this.y, pipe.x, pipe.top, height - pipe.bottom], [1, 5]);
            let outputs = this.brain.predict(inputs).dataSync();
            if(outputs[0] > outputs[1])
                this.jump();
        });
    }

    show()
    {
        this.main();
        noStroke();
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.radius);
    }
}