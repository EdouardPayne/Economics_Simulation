function updateUI(){
	updateSectorPrices();
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
	  	$("#"+simple+"").remove();
	     
	    $("#dynamicTable").append("<div class='tab-pane' id="+simple+">")

	    var table = $('<table style="width:50%"></table>').attr('id', simple+'_table');
	    $("#"+simple).append(table);



	    for(key in Market.list){
	      if(Market.list[key].country == UniqueCounties[i]){
	        var sector = $('<tr></tr>').attr('id', Market.list[key].sector+'_table');

	        var name = $('<td></td>').text(Market.list[key].sector);
	        var demand = $('<td></td>').text(Market.list[key].demand);
	        var supply = $('<td></td>').text(Market.list[key].supply);
	        var price = $('<td></td>').text(Market.list[key].price);


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