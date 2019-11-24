function nextGen()
{
    let newGen = createNewGen(birds);

    for(bird of birds)
    {
        bird.dispose();
    }

    birds = newGen;

    //console.log(tf.memory());
}

function createNewGen(oldGen)
{
    calcFit(oldGen);

    let newGen = [];

    for(let i = 0; i < POPMAX; i++)
    {
        let picked = pickOne(oldGen);
        newGen[i] = new Bird(picked.clone());
        newGen[i].mutate(0.1);
    }

    return newGen;
}

function pickOne(list)
{
    let index = 0;
    let r = random(1);

    while(r > 0)
    {
        r = r - list[index].fitness;
        index++;
    }
    index--;

    return list[index];
}

function calcFit(list)
{
    let sum = 0;
    list.map((bird) => sum += bird.score);
    return list.map((bird) => {
        bird.fitness = (bird.score / sum);
        return bird;
    });
}