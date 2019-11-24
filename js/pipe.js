class Pipe
{
    constructor()
    {
        this.limitspace = 200;
        this.top = random(height - this.limitspace);
        this.bottom = height - this.top - this.limitspace;
        this.x = width;
        this.width = 80;
        this.speed = 5;
    }

    dead()
    {
        return this.x < this.width;
    }
    main()
    {
        this.x -= this.speed;
    }
    collide(x, y, radius)
    {
        if(collideRectCircle(this.x, 0, this.width, this.top, x, y, radius-1))
            return true;
        
        if(collideRectCircle(this.x, height-this.bottom, this.width, this.bottom, x, y, radius-1))
            return true;
        
        return false;
    }

    show()
    {
        fill(255);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, height-this.bottom, this.width, this.bottom);
    }
}