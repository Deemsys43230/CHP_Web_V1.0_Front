/**
 * Created by user on 23/11/15.
 */
var userApp= angular.module('userApp', ['ngRoute','oc.lazyLoad','ngCookies']);

userApp.controller('testController',function($scope) {
    Highcharts.Renderer.prototype.symbols.line = function(x, y, width, height) {
        return ['M',x ,y + width / 2,'L',x+height,y + width / 2];
    };
    //-------------------------------------------------------
    Highcharts.setOptions({
        chart:{
            margin:[5,50,20,50]
        },
        credits:{enabled:false},
        exporting:{enabled:false},
        legend:{enabled:false},
        title:{text:''},
        xAxis:{
            tickLength:0,
            lineColor:'#999',
            lineWidth:1,
            labels:{style:{fontWeight:'bold'}}
        },
        yAxis:{
            min:0,
            minPadding:0,
            maxPadding:0,
            tickColor:'#ccc',
            tickWidth:1,
            tickLength:3,
            gridLineWidth:0,
            endOnTick:true,
            title:{text: ''},
            labels:{
                y:10,
                style:{
                    fontSize:'8px'
                },
                formatter:function(){
                    if (this.isLast){
                        return this.value + ' Kgs';
                    }
                    else{
                        return this.value;
                    }
                }
            }
        },
        tooltip:{
            enabled:true,
            backgroundColor:'rgba(255, 255, 255, 1)',
            borderWidth:0,
            shadow:true,
            style:{fontSize:'10px',padding:2},
            formatter:function() {
                return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,2) +" Kgs"+ "</strong>";
            }
        },
        plotOptions:{
            bar:{
                color:'#f8ba01',
                shadow:false,
                borderWidth:0
            },
            scatter:{
                marker:{
                    symbol:'line',
                    lineWidth:3,
                    radius:8,
                    lineColor:'#ff0000'
                }
            }
        }
    });

    //-------------------------------------------------------
    var targetchart = new Highcharts.Chart({
        chart:{renderTo:'container1'},
        xAxis:{categories:['Goal']},
        yAxis:{
            max:150,
            labels:{y:10,style:{fontSize:'8px'}},
            plotBands:[{color: 'rgba(103,103,103,.35)'}]
        },
        series:[{name:'Current Weight',type: 'bar',pointWidth:10,data:[100]},
            {name:'Target',type: 'scatter',data:[90]}]
    });
});