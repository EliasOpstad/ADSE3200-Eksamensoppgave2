
var marginAkse = {top: 0, right: 50, bottom: 100, left: 100}

var height = 1000 - marginAkse.top - marginAkse.bottom;
var width = 1200 - marginAkse.left - marginAkse.right;


const svg = d3.select("#visualiseringHolderNr1")
    .append("svg")
        .attr("width", width + marginAkse.right + marginAkse.left)
        .attr("height", height + marginAkse.right + marginAkse.left)
        .style("background-color", "whitesmoke");

        var xVerdi = d3.scaleBand()
        .range([0, width])
        .padding([0.25]);

        var yVerdi = d3.scaleLinear()
        .domain([0, 858373000])
        .range([height, 150]);
        
        

        d3.csv("csv/HighestGrossers.csv").then(function(data){
            xVerdi.domain(data.map(function(d){
                return d.MOVIE}));
            svg.append("g")
                .attr("transform", "translate(" + marginAkse.left + "," + height+ ")")
                .call(d3.axisBottom(xVerdi))
                .selectAll("text")
                .attr('transform', 'translate(-15,' + 65+ ')rotate(-80)')
                
            svg.append("g")
                .attr("transform", "translate(" + marginAkse.bottom + ", 0)").call(d3.axisLeft(yVerdi));


            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(60,' + 120 + ')rotate(-90)')
                .style('font-size', 14)
                .text('Inntekt for et år ->');
            

/*Dette var for å lage linjediagram. Blir brukt i Årlig Billettsalg.
                //Lager dottene i Linjediagrammet
                svg.append("g")
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){return xVerdi(d.MOVIE)})
                    .attr("cy", function(d){return yVerdi(d.TOTAL_FOR_YEAR);})
                    .attr("r", 5)
                    .attr("transform", "translate(120,0)")
                    .style("fill", "#CC0000");

                //Lager linjene mellom dottene
                var line = d3.line()
                .x(function(d) { return xVerdi(d.MOVIE)}) 
                .y(function(d) { return yVerdi(d.TOTAL_FOR_YEAR); }) 
                .curve(d3.curveMonotoneX)


                //Formaterer Linjene
                svg.append("path")
                .datum(data) 
                .attr("class", "line") 
                .attr("transform", "translate(120,0)")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "red")
                .style("stroke-width", "2.5");


                //Lager x-Gridden i Bakgrunnen
                function xbakgrunnsgrid(){
                    return d3.axisBottom(xVerdi).ticks(27)
                }

                //Lager y-Gridden i Bakgrunnen
                function ybakgrunnsgrid(){
                    return d3.axisLeft(yVerdi).ticks(8)
                }
                svg.append("g")
                    .attr("class", "bakgrunnsGrid")
                    .attr("transform", "translate(100,120)")
                    .call(xbakgrunnsgrid()
                        .tickSize(2)
                        .tickFormat("")    
                    )

                svg.append("g")			
                    .attr("class", "bakgrunnsGrid")
                    .attr("transform", "translate(1100,0)")
                    .call(ybakgrunnsgrid()
                        .tickSize(height)
                        .tickFormat("")
                    )

*/
                
            svg.selectAll(".stolpe")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "stolpe")
                .on("mouseover", musOver)
                .on("mouseout", musAv)
                .attr("x", function(d){return xVerdi(d.MOVIE)+marginAkse.left;})
                .attr("y", function(d){return yVerdi(d.TOTAL_FOR_YEAR);})
                .attr("width", xVerdi.bandwidth())
                .attr("height", function(d){return height - yVerdi(d.TOTAL_FOR_YEAR);});

                
                

                
        });
/*
        function byttVisualisering(){
            if()
        }
        
*/

        function musOver(d, i){
            d3.select(this).attr("class", "musOverStolpe");
            d3.select(this)
            .transition()
            .duration(300)
            .style("fill", "grey")
            .attr("width", xVerdi.bandwidth() + 5)
            .attr("yVerdi", function(d){return yVerdi(d.TOTAL_FOR_YEAR) - 10;})
            .attr("height", function(d){return height -yVerdi(d.TOTAL_FOR_YEAR) + 10})
            
            svg.append("text")
                .attr("class", "val")
                .attr("xVerdi", function(){
                    return xVerdi(d.MOVIE);
                })
                .attr("yVerdi", function(){
                    return yVerdi(d.value)-15;
                })
                .text(function(){
                    return ["År: " + (d.MOVIE) + "<br>" + "Film: " + (d.MOVIE) + "<br>" + "Distributor: " 
                    + (d.MOVIE) + "<br>" + "Inntekt: " + (d.TOTAL_FOR_YEAR)];
                })

            }

        function musAv(d,i){
            d3.select(this).attr("class", "stolpe");
            d3.select(this)
            .transition()
            .duration(800)
            .style("fill", "green")
            .attr("width", xVerdi.bandwidth())
            .attr("yVerdi", function(d){
                return yVerdi(d.TOTAL_FOR_YEAR);
            })
            .attr("height", function(d){
                return height - yVerdi(d.TOTAL_FOR_YEAR);
            });

            d3.selectAll("val")
            .remove()

        }
        