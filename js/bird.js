class Bird
{
    constructor()
    {
        this.x = 64;
        this.y = height/2;
        this.radius = 32;
        
        this.gravity = 0.5;
        this.speed = 0;
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

    show()
    {
        this.main();
        noStroke();
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.radius);
    }
}