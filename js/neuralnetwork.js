class NeuralNetwork
{
    constructor(setup)
    {
        this.input_nodes = setup.input;
        this.hidden_nodes = setup.hidden;
        this.output_nodes = setup.output;

        if(setup.model)
        {
            this.model = setup.model;
        }
        else
        {
            this.model = this.createModel();
        }
    }

    createModel()
    {
        let model = tf.sequential();
        model.add(tf.layers.dense({units: this.hidden_nodes, inputShape: this.input_nodes, activation: 'sigmoid'}));
        model.add(tf.layers.dense({units: this.output_nodes, activation: 'softmax'}));
        return model;
    }

    predict(inputs)
    {
        return this.model.predict(inputs);
    }

    dispose()
    {
        this.model.dispose();
    }

    mutate(rate)
    {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) 
            {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) 
                {
                    if (random(1) < rate) 
                    {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    clone()
    {
        let newModel = this.createModel();
        newModel.setWeights(this.model.getWeights());
        return new NeuralNetwork({
            input: this.input_nodes,
            hidden: this.hidden_nodes,
            output: this.output_nodes,
            model: newModel
        });
    }
}