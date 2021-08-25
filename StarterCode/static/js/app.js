const samples = "https://raw.githubusercontent.com/everett-tw/plot.ly-challenge/main/data/samples.json"

var array_object = []
d3.json(samples).then(function(data){
    console.log(data);
    //https://plotly.com/javascript/horizontal-bar-charts/
    
    var bar_data = [{
        type: 'bar',
        x: data.samples[0].sample_values.slice(0,10),
        y: data.samples[0].otu_ids.slice(0,10).map(),
        text: data.samples[0].otu_labels.slice(0,10),
        orientation: 'h'
    }];

    Plotly.newPlot('bar', bar_data);
    
    var array_object = data.samples
});
//https://plotly.com/javascript/bubble-charts/