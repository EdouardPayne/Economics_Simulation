function updateUI(){
	updateSectorPrices();
	updateCountryPrices();
	updateCompanyDetailsUI();
	updateGDP();
	//Update Immigration/Capital Changes
}

function updateSectorPrices(){
	CountryDOM = []
	  for (var key in Market.list) {
	    CountryDOM.push(Market.list[key].country);
	    }


	  var UniqueCounties = CountryDOM.filter(function(elem, pos) {
	    return CountryDOM.indexOf(elem) == pos;  //http://mikeheavers.com/tutorials/removing_duplicates_in_an_array_using_javascript/
	  });
	    


	  for (var i = 0; i < UniqueCounties.length; i++) {
	    simple = UniqueCounties[i].replace(/\s+/, "") 
	  	$("#"+simple+"_table").remove();
	     
	    $("#dynamicTable").append("<div class='tab-pane' id="+simple+">")

	    var table = $('<table style="width:50%"></table>').attr('id', simple+'_table');
	    $("#"+simple).append(table);
		var colheader = '<tr><th>Sector Name</th><th>Demand</th><th>Supply</th><th>Price</th></tr>\n';

		table.append(colheader);
	    for(key in Market.list){
	      if(Market.list[key].country == UniqueCounties[i]){
	      	
	        var sector = $('<tr></tr>').attr('id', Market.list[key].sector+'_table');
	      
	        console.log(Object.keys(Market.list)[key])
	        var name = $('<td></td>').text(Market.list[key].sector);
	        var demand = $('<td></td>').text(round(Market.list[key].demand,2));
	        var supply = $('<td></td>').text(round(Market.list[key].supply,2));
	        var price = $('<td></td>').text(round(Market.list[key].price,2));

	        
	        table.append(sector);
	        sector.append(name);
	        sector.append(demand);
	        sector.append(supply);
	        sector.append(price);
	      }
	    }
	    $("#dynamicTable").last().addClass("active")
	}
}

function updateCountryPrices(){
		  for(key in Country.list){
		  	if (Country.list.hasOwnProperty(key)) {
		    simple = Country.list[key].country.replace(/\s+/, "")
		    $("#"+simple+"_tableMacro").remove();

		   
		    var table = $('<table style="width:50%"></table>').attr('id', simple+'_tableMacro');
		    $("#"+simple+"_macro").append(table);
		    var country = Country.list[key]
		    var colheader = '<tr><th>Country Name</th><th>Demand</th><th>Supply</th><th>Price</th></tr>\n';
		    table.append(colheader);
		    for(key2 in country){
		    	if(typeof(country[key2]) === 'object'){

		        var type = $('<tr></tr>').attr('id', country[key2].name+'_table');

		        var name = $('<td></td>').text(country[key2].name);
		        var demand = $('<td></td>').text(round(country[key2].demand,2));
		        var supply = $('<td></td>').text(round(country[key2].supply,2));
		        var price = $('<td></td>').text(round(country[key2].price,2));

		        table.append(type);
		        type.append(name);
		        type.append(demand);
		        type.append(supply);
		        type.append(price);
		        } else{};
		    }
		}
		  }

}

function updateCompanyDetailsUI(){
	    $("#companyName").text(player.name);
        $("#numberEmployees").text(player.employees);
        $("#numberCapital").text(player.capital);
        $("#stockLevels").text(player.stock);
        $("#cash").text(player.cash);
}

function updateChart(){
	marketShare.dataProvider = [];

	length = Object.keys(Competitor.list).length;
	for (var key in Competitor.list){
		marketShare.dataProvider.push({
	 	 "country": Competitor.list[key].name,
		  "litres": Competitor.list[key].networth,
	})

	}
	marketShare.validateData();
};

function updateGDP(){
	var sumOfGDP = 0
	for(key in Competitor.list){
		sumOfGDP +=Competitor.list[key].cashFlow;
	}
    chartDataGDP.push({
      date: game.tickCount,
      visits: sumOfGDP,
    });
    GDPLevel.validateData();
	console.log(sumOfGDP);
}

