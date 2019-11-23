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
}