function updateUI(){
	updateSectorPrices();
	updateCompanyDetailsUI();
	updateGDP();
}

function updateSectorPrices(){
for (var key in Market.list) {
	$( "#demand_"+key ).html(Market.list[key].demand)
	$( "#supply_"+key ).html(Market.list[key].supply)
	$( "#price_"+key ).html(Market.list[key].price)

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