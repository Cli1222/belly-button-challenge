
d3.json('data/samples.json').then(({ names }) => {
    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });
    optionChanged();
});

const optionChanged = () => {
    let selection = d3.select('select').node().value;
    console.log(selection);

    d3.json('data/samples.json').then(({ metadata,samples }) => {
        let meta =metadata.filter(obj=>obj.id==selection)[0];
        let sample = samples.filter(obj=>obj.id==selection)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val])=>{
            d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
        });

        console.log(sample);

        let {otu_ids,sample_values,otu_labels} = sample;

        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
              type: 'bar',
              orientation: 'h',
              text: otu_labels.slice(0,10).reverse()
            }
          ];
          
          Plotly.newPlot('bar', data);


          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: 'Earth',
              text: otu_labels
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', data);
    });
}

