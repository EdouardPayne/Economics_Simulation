function updateUI(){
	updateSectorPrices();
	updateCompanyDetailsUI();
	updateGDP();
}

function updateSectorPrices(){
  for (var i = 1; i < 6; i++) { //need to fix this so that it knows how many sectors are in a market, instead of manually entering the data.
    for(var key2 in Market.list[i]){ //loop through each sector in the market     
      $( "#demand_"+i ).html(Market.list[i].demand); //get the amount saved and show result.
      $( "#supply_"+i ).html(Market.list[i].supply); 
      $( "#price_"+i ).html(Market.list[i].price); 
    }
  }	
}

function updateCompanyDetailsUI(){
	    $("#companyName").text(player.name);
        $("#numberEmployees").text(player.employees);
        $("#numberCapital").text(player.capital);
        $("#foreCastedIncome").text(player.cashFlow);
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