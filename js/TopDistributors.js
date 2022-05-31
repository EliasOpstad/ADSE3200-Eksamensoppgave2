

var avstandPadding = 0.25

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
        .padding([avstandPadding]);

        var yVerdi = d3.scaleLinear()
        .domain([0, 40472424278])
        .range([height, 150]);
        
        

        d3.csv("https://eliasopstad.github.io/ADSE3200-Eksamensoppgave2/csv/TopDistributors.csv").then(function(data){
            xVerdi.domain(data.map(function(d){
                return d.DISTRIBUTORS}));
            var x = svg.append("g")
                .attr("transform", "translate(" + marginAkse.left + "," + height+ ")").call(d3.axisBottom(xVerdi));
            var y = svg.append("g")
                .attr("transform", "translate(" + marginAkse.bottom + ", 0)").call(d3.axisLeft(yVerdi));
            

            svg.selectAll(".stolpe")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "stolpe")
                .on("mouseover", musOver)
                .on("mouseout", musAv)
                .attr("x", function(d){return xVerdi(d.DISTRIBUTORS)+marginAkse.left;})
                .attr("y", function(d){return yVerdi(d.TOTAL_GROSS);})
                .attr("width", xVerdi.bandwidth())
                .attr("height", function(d){return height - yVerdi(d.TOTAL_GROSS);});
        });
        
        function musOver(d, i){
            d3.select(this).attr("class", "musOverStolpe");
            d3.select(this)
            .transition()
            .duration(300)
            .style("fill", "grey")
            .attr("width", xVerdi.bandwidth() + 5)
            .attr("yVerdi", function(d){return yVerdi(d.TOTAL_GROSS) - 10;})
            .attr("height", function(d){return height -yVerdi(d.TOTAL_GROSS) + 10})
            
            svg.append("text")
                .attr("class", "val")
                .attr("xVerdi", function(){
                    return xVerdi(d.DISTRIBUTORS);
                })
                .attr("yVerdi", function(){
                    return yVerdi(d.value)-15;
                })
                .text(function(){
                    return ["År: " + (d.YEAR) + "<br>" + "Film: " + (d.MOVIE) + "<br>" + "Distributor: " 
                    + (d.DISTRIBUTORS) + "<br>" + "Inntekt: " + (d.TOTAL_GROSS)];
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
                return yVerdi(d.TOTAL_GROSS);
            })
            .attr("height", function(d){
                return height - yVerdi(d.TOTAL_GROSS);
            });

           

        }
        

        