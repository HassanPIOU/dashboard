var pichartValue = document.getElementById('pieData').value

var datalabel = []
var dataseries = []
var content = JSON.parse(pichartValue)
for ( const [key,value] of Object.entries(content ) ) {
    datalabel.push(key)
    dataseries.push(value)
}

var options={
    chart:{height:250,
        type:"pie"
    },
    series:dataseries,
    labels: datalabel,
    colors:["#34c38f", "#f46a6a"],
    legend:{show:!0, position:"bottom",
        horizontalAlign:"center",
        verticalAlign:"middle",
        floating:!1,
        fontSize:"11px",
        offsetX:0,
        offsetY:-10
    },
    responsive:
        [
            {
                breakpoint:800,
                options:{
                    chart:{height:220},
                    legend:{show:!1
                    }
                }
            }
            ]
};

(chart=new ApexCharts(document.querySelector("#pie_chart"),options)).render();

