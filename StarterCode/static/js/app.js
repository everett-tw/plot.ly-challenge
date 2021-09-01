const samples = "https://raw.githubusercontent.com/everett-tw/plot.ly-challenge/main/data/samples.json"

function graph_all_the_things(this_sample,this_metadata){
    //https://plotly.com/javascript/horizontal-bar-charts/
    var bar_data = [{
        type: 'bar',
        x: this_sample.sample_values.slice(0,10),
        y: this_sample.otu_ids.slice(0,10).map(x => 'OTU '+ x),
        text: this_sample.otu_labels.slice(0,10),
        orientation: 'h'
    }];

    //.map(x => 'OTU'+ x)
    Plotly.newPlot('bar', bar_data);

    //https://plotly.com/javascript/bubble-charts/
    var trace1 = {
        x: this_sample.otu_ids,
        y: this_sample.sample_values,
        text: this_sample.otu_labels,
        mode: 'markers',
        marker: {
            color: 'rgb(31, 119, 180)',
            opacity: 0.6,
            size: this_sample.sample_values
        }
    };
    var layout = {
        title: 'OTU ID',
        showlegend: false,
        // height: 600,
        // width: 600
    };
    var bubble_data = [trace1];
    Plotly.newPlot('bubble', bubble_data, layout);

    sample_metadata = d3.select('#sample-metadata');
    sample_metadata.selectAll('p').remove()
    for(key in this_metadata)
          sample_metadata.append('p').text(`${key}:${this_metadata[key]}`);
};


let array_object = []
let metadata_object = [];

d3.json(samples).then(function(data){
    console.log(data);
    array_object = data.samples;
    metadata_object = data.metadata;
    user_input();
});

d3.selectAll("#selDataset").on("change", updatePlotly);

function user_input() {
    graph_all_the_things(array_object[0], metadata_object[0]);
    dropdown = d3.select('#selDataset')
    array_object.forEach((value, i) =>
        dropdown.append('option').attr('value',i).text(value.id)
    )
  }


function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");
    var curr_belly = dropdownMenu.property("value");
    graph_all_the_things(array_object[curr_belly], metadata_object[curr_belly]);
}

