var donutchartvalue = document.getElementById('donutchartvalue').value

 var datalabel = []
var dataseries = []
var content = JSON.parse(donutchartvalue)
for ( const [key,value] of Object.entries(content ) ) {
 datalabel.push(key)
 dataseries.push(value)
}
var chart;options={
    series:dataseries,
    chart:{
        type:"donut",
        height:240},
    labels: datalabel,
    colors:[
        "#74788D",
        "#50A5F1",
        "#34C38F"
           ],
    legend:{show:!1},
    plotOptions:{
        pie:{
            donut:
                {size:"70%"}}}};(chart=new ApexCharts(document.querySelector("#donut-chart"),options)).render();





