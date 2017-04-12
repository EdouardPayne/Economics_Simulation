markets = ["Primary", "Secondary", "Service"]
countries = ["France", "United Kingdom", "Second"]

LaborPrices = {};
CapitalPrices = {};

      function Competitor(name, sector, capital, employees, land, type, id, efficiency, country) {
           var self = Business(name, sector, capital, employees, land, type, id, efficiency, country);

            self.upgrade = function(){ //Competitor
              if(self.cash>5 && self.upgrades['Start-up']==false){
                self.firstUpgrade();
              } else if (self.cash>500 && self.upgrades['Medium Firm']==false){
                self.secondUpgrade();
              }   
            } 

            self.checkCashFlow = function(){ //Business
              self.cashFlow = self.income - self.expenses;
              if(isNaN(self.cash)){
                self.cash=0
                self.cash += self.cashFlow;
                self.networth += self.cashFlow;
              }
              self.cash += self.cashFlow;
              self.networth += self.cashFlow;
              /*  if(self.cash<-2){
                for(key in Competitor.list){
                  if(self.id = Competitor.list[id]){
                    delete Competitor.list[id];
                    break;
                  }
                
                }
              }*/
            }
            Competitor.list[id] = self; 
            return self;
        };

      function Player(name, sector, capital, employees, land, type, id, efficiency, country){
        var self = Business(name, sector, capital,  employees,land, type, id, efficiency, country);
        self.stock=0;
        self.capcity=100;

         
        self.produceOutput = function(employees, capital){
          for(key in Country.list){
              if(self.country==Country.list[key].country){
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="labor"){  
                    Country.list[key][key2].demand = Country.list[key][key2].demand + employees; //store it in a variable so we can manipulate it
                    Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply
                    costOfLabor = employees * Country.list[key][key2].price
                  }
                  if(Country.list[key][key2].name=="capital"){
                    Country.list[key][key2].demand = Country.list[key][key2].demand + capital; //store it in a variable so we can manipulate it
                    Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply
                    costOfCapital = capital * Country.list[key][key2].price
                  }
                  if(Country.list[key][key2].name=="land"){
                    costOfLand = Country.list[key][key2].price*self.land;
                  }


                  
                }
                player.cash -= (costOfLabor + costOfCapital + costOfLand);

              }
            }
          for(var key in Market.list){
                if(self.country==Market.list[key].country){
                  if(self.sector==Market.list[key].sector){
                      self.capacity = 100;
                    if(self.upgrades=="Start-up"){
                      self.capacity = 1000;
                    } else if (self.upgrades=="Medium Firm"){
                      self.capcity = 10000;
                    } else if (self.upgrades=="Large Firm"){
                      self.capacity = 100000;
                    }
                    output = employees*capital;

                    spareCapacity = output/self.capacity;
                    if(output>self.capacity){
                    output = output / Math.exp(spareCapacity-1);}

                    self.stock += output;

                    updateCompanyDetailsUI();
                  } 
                } 
            }
        }
        self.sellOutput = function(amount){
            for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                      Market.list[key].supply += amount;

                      Market.list[key].price = Market.list[key].demand/Market.list[key].supply;

                      self.cash += Market.list[key].price * amount;
                      self.stock -= amount;

                      updateCompanyDetailsUI();
                    } 
                  } 
            }
        }

        self.predictiveCost = function(employees, capital){           
          for(key in Country.list){
              if(self.country==Country.list[key].country){
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="labor"){
                    
                    originalDemandLabor = Country.list[key][key2].demand; //store it in a variable so we can manipulate it
                    newDemandLabor = Country.list[key][key2].demand + employees; //add the employees onto the country market
                    originalSupplyLabor = Country.list[key][key2].supply; //store the supply in a variable so we can manipulate it
                    priceOfLabor = newDemandLabor/originalSupplyLabor
                  }
                  if(Country.list[key][key2].name=="capital"){
                    
                   
                    originalDemandCapital = Country.list[key][key2].demand;
                    newDemandCapital = Country.list[key][key2].demand + capital;
                    originalSupplyCapital = Country.list[key][key2].supply;
                    priceOfCapital = newDemandCapital/originalSupplyCapital
                 
                  }
                  if(Country.list[key][key2].name=="land"){
                    
                   
                    priceOfLand = Country.list[key][key2].price
                 
                  }
                }

                costOfLand = priceOfLand*self.land;
                costOfLabor = priceOfLabor*employees; 
                costOfCapital = priceOfCapital*capital; 
                totalCost = costOfCapital + costOfLabor + costOfLand;
                return {
                      "laborCost": costOfLabor,
                      "capitalCost": costOfCapital,
                      "landCost": costOfLand,
                      "totalCost": totalCost,
                      "priceOfCapital": priceOfCapital,
                      "priceOfLabor": priceOfLabor
                };
                self.expenses += (CostOfCapital + CostOfLabor)/self.efficiency;
                break;
              }
            }
          }

        self.predictIncome = function(employees, capital){
            for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                      self.capacity = 100;
                      if(self.upgrades=="Start-up"){
                        self.capacity = 1000;
                      } else if (self.upgrades=="Medium Firm"){
                        self.capcity = 10000;
                      } else if (self.upgrades=="Large Firm"){
                        self.capacity = 100000;
                      }
                      output = employees*capital;

                      spareCapacity = output/self.capacity;
                      if(output>self.capacity){
                      output = output / Math.exp(spareCapacity-1);}

                      originalSupplyMarket = Market.list[key].supply
                      originalDemandMarket = Market.list[key].demand
                      newSupplyMarket = Market.list[key].supply + output
                      price = originalDemandMarket/newSupplyMarket;
                      totalIncome = output * price;

                      return {
                      "output": output,
                      "price": price,
                      "totalIncome": totalIncome,
                      };
                    } 
                  } 
            }
        }

        return self;
        }
      function Business(name, sector, capital, employees, land, type, id, efficiency, country) {
              var self = {
              name:name,  
              sector:sector,
              capital:capital,
              employees:employees,
              land:land,
              type:type,
              id:id,
              efficiency: efficiency,
              country: country,
              upgrades: {'Start-up' : false,
                         'Medium Firm' : false,
                         'Large Firm' : false, },

              };
              self.cashFlow=0;
              self.cash=0;
              self.income = 0;
              self.expenses = 0;
              self.networth = self.cash;

              self.demandOfFactors = function(){
              for(var key2 in Country.list){
                if(self.country==Country.list[key2].country){
                  
                  self.addDemandofFactors(key2);
                }
              }
              }
              self.addDemandofFactors = function(key2){
                for(key3 in Country.list[key2]){
                  if(Country.list[key2][key3].name=="labor"){
                    Country.list[key2][key3].demand += self.employees;
                  } else if (Country.list[key2][key3].name=="capital"){
                    Country.list[key2][key3].demand += self.capital;
                  } else if(Country.list[key2][key3].name=="land"){
                    Country.list[key2][key3].demand += self.land;
                  }
                }
              }
              self.produce = function(){   //Business         
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                     self.generateSupply(key);
                    }  
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateDemand(key);
                    } else if (self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateDemand(key);
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateDemand(key);
                    }
                  }
                } 

              }

              self.exchange = function(){
                self.sector
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                      self.generateIncome(key); //Sell the product, need to get taxed
                    }
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor(); //Buy the produce, need to get taxed 
                      
                    } else if(self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor();
                      
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor();
                     
                      } 
                    }
                  }
                }



              self.generateIncome = function(key){  //Business
                self.income = (Market.list[key].price * (self.capital*self.employees))*self.efficiency;  
              }

              self.generateProduceExpense = function(key){ //This function looks at how much it costs to purchase raw materials

                self.expenses = (Market.list[key].price * (self.capital*self.employees))/self.efficiency;
              }

              self.generateExpenseFactor = function(){ //This function looks at how much it costs to purchase labor and capital in respective countries.
                  
                  for(key in Country.list){
                    if(self.country==Country.list[key].country){
                      for(key2 in Country.list[key]){
                        if(Country.list[key][key2].name=="labor"){
                          priceOfLabor = Country.list[key][key2].price

                        }
                        if(Country.list[key][key2].name=="capital"){
                          priceOfCapital = Country.list[key][key2].price
                        }
                        if(Country.list[key][key2].name=="land"){
                          priceOfLand = Country.list[key][key2].price
                          break;
                        }
                      }

                      CostOfLabor = priceOfLabor*self.employees 
                      CostOfCapital = priceOfCapital*self.capital 
                      CostOfLand = priceOfLand*self.land

                      self.expenses += (CostOfCapital + CostOfLabor + CostOfLand)/self.efficiency;
                      break;
                    }
                  }
                
              }

              self.generateSupply = function(key){ //Business
                Market.list[key].supply  += (self.capital*self.employees); //Sell the goods onto the market
                
              }

              self.generateDemand = function(key){ //Business
                Market.list[key].demand +=(self.capital*self.employees);
              
              }

              self.checkCashFlow = function(){ //Business
                self.cashFlow = self.income - self.expenses;

                if(isNaN(self.cash)){
                  self.cash=0
                  self.cash += self.cashFlow;
                  self.networth += self.cashFlow;
                }
                self.cash += self.cashFlow;
                self.networth += self.cashFlow;
                if(self.cash<-2){
                  delete player;
                }
              }

              self.upgrade = function(){
                if(self.cash>5 && self.upgrades['Start-up']==false){
                  $('#startUp').attr('disabled', false);
                  console.log("Hello Start-up");

                } else if (self.cash>500 && self.upgrades['Medium Firm']==false){
                  console.log("Hello Medium Firm");
                  $('#mediumFirm').attr('disabled', false);
                  self.upgrades['Medium Firm']=true;
                }   
              } 

              self.firstUpgrade = function(){
                  console.log("Hello Start-up");
                  self.upgrades['Start-up']=true;
                  self.cash -= 5;
                  self.efficiency *= 5;
                  self.employees *= 10;
                  self.capital *= 10;
                  self.land *= 10;
                  self.networth += 5;
              }

              self.secondUpgrade = function(){
                  console.log("Hello Medium Firm");
                  self.upgrades['Medium Firm']=true;
                  self.cash -= 500;
                  
                  self.employees *= 10;
                  self.capital *= 10;
                  self.land *= 10;
                  self.networth += 500;
              }
                


              return self;
          };

      function generateCountry() {
          for (x = 0; x < countries.length; x++) {
              country = countries[x];

              supplyOfLabor = 500;
              supplyOfCapital = 500;
              supplyOfLand = 500;
              Country(country, supplyOfLabor, supplyOfCapital, supplyOfLand)
          }          
      }

      function Country(country, supplyOfLabor, supplyOfCapital, supplyOfLand) {
          var self = {
          
                  labor: {
                      demand: 0,
                      supply: supplyOfLabor,
                      price: 0,
                      name: "labor",
                  },
                  capital: {
                      demand: 0,
                      supply: supplyOfCapital,
                      price: 0,
                      name: "capital",
                  },
                  land: {
                      demand:0,
                      supply: supplyOfLand,
                      price:0,
                      name: "land",
                  },



            
              country: country,
          }
          self.generatePrice = function(key){
            
            for(key2 in Country.list[key]){
              Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply
            }
            
          }
          self.resetDemand = function(key){
            for(key2 in Country.list[key]){
              Country.list[key][key2].demand = 0;
            }
          }

          self.immigrate = function(key){
        
            for(key2 in Country.list[key]){
              
              if(Country.list[key][key2].name=="labor"){
                

                LaborPrices[Country.list[key].country] = Country.list[key][key2].price;
                for(key3 in LaborPrices){
                  original = LaborPrices[key3]
                  console.log(key3)
                  difference = Country.list[key][key2].price-LaborPrices[key3]
                  movement = Country.list[key][key2].supply
                  value = difference/original

                  Country.list[key3][key2].supply

                  immigrants= value*Country.list[key3][key2].supply
                  console.log(immigrants)
                  if(immigrants>=Country.list[key3][key2].supply){
                    immigrants=Country.list[key3][key2].supply-1
                  }
                  immigrants = immigrants/30;
                  console.log(immigrants)
                  Country.list[key3][key2].supply-=immigrants;
                  Country.list[key3][key2].price = Country.list[key3][key2].demand/Country.list[key3][key2].supply;
                  Country.list[key][key2].supply+=immigrants;
                  Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply;
                  console.log(value)
                }
              }
              
              }
           } 

          self.capitalMovement = function(key){
            for(key2 in Country.list[key]){
              if(Country.list[key][key2].name=="capital"){
                CapitalPrices[Country.list[key].country]=Country.list[key][key2].price;
                for(key3 in CapitalPrices){
                  original = CapitalPrices[key3]
                  console.log(key3)
                  difference = Country.list[key][key2].price-CapitalPrices[key3]
                  movement = Country.list[key][key2].supply
                  value = difference/original

                  Country.list[key3][key2].supply
                  immigrants= value*Country.list[key3][key2].supply
                  console.log(immigrants)
                  immigrants = immigrants/10;

                  if(immigrants>=Country.list[key3][key2].supply){
                    immigrants=Country.list[key3][key2].supply-1
                  }
                  
                  console.log(immigrants)
                  Country.list[key3][key2].supply-=immigrants;
                  Country.list[key3][key2].price = Country.list[key3][key2].demand/Country.list[key3][key2].supply;
                  Country.list[key][key2].supply+=immigrants;
                  Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply;
                  console.log(value)
                }
              }
            }
          }
          self.countryShock = function(key){
            
            chance = Math.round(Math.random()*100)
            result = Math.floor(Math.random()*4)

            switch(chance){
              case 1: //population Boom
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="labor"){
                    Country.list[key][key2].supply += 50;
                  }
                }
                switch(result){
                  case 1:
                   $( "#economic_info" ).prepend( "<p>Increase in labor supply for "+ Country.list[key].country + ". Following on from an increase in government subsidies to babies - more children born.</p>" );
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Increase in labor supply for "+ Country.list[key].country + ". Following on from a development in medicine - people live longer.</p>" );
                  break;
                  case 3:
                    $( "#economic_info" ).prepend( "<p>Increase in labor supply for "+ Country.list[key].country + ". Following on from a increase in retirement age - people work longer.</p>" );
                  break;
                  case 4:
                   $( "#economic_info" ).prepend( "<p>Increase in labor supply for "+ Country.list[key].country + ". Following on from a great harvest - more children born.</p>" );
                  break;
                }
              break;

              case 2: //populaton Decrease
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="labor"){
                    Country.list[key][key2].supply -= 50;
                  }
                }
                switch(result){
                  case 1:
                    $( "#economic_info" ).prepend( "<p>Decrease in labor supply for "+ Country.list[key].country + ". Following on from an decrease in government subsidies to babies - less children born.</p>" );
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Decrease in labor supply for "+ Country.list[key].country + ". Following on from an epidemic - less laborers in the economicy.</p>" );
                  break;
                  case 3:
                    $( "#economic_info" ).prepend( "<p>Decrease in labor supply for "+ Country.list[key].country + ". Following on from a decrease in retirement age - people work shorter.</p>" );
                  break;
                  case 4:
                    $( "#economic_info" ).prepend( "<p>Decrease in labor supply for "+ Country.list[key].country + ". Following on from a bad harvest - less children born.</p>" );
                  break;
                }

              break;
              case 3: //Capital Boom
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="capital"){
                    Country.list[key][key2].supply += 50;
                  }
                }
                switch(result){
                  case 1:
                    $( "#economic_info" ).prepend( "<p>Increase in capital supply for "+ Country.list[key].country + ". Following on from a innovation domestically - efficency has increased.</p>" );
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Increase in capital supply for "+ Country.list[key].country + ". Following on from investment abroad - capital supply has increased.</p>" );
                  break;
                  case 3:
                   $( "#economic_info" ).prepend( "<p>Increase in capital supply for "+ Country.list[key].country + ". Following on from increase in stock - capital efficency has increased.</p>" );
                  break;
                  case 4:
                   $( "#economic_info" ).prepend( "<p>Increase in capital supply for "+ Country.list[key].country + ". Following on from deregulation there is greater investment - capital has increased.</p>" );
                  break;
                }

              break;
              case 4: //Capital Decrease
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="capital"){
                    Country.list[key][key2].supply -= 50;
                  }
                }
                switch(result){
                  case 1:
                    $( "#economic_info" ).prepend( "<p>Decrease in capital supply for "+ Country.list[key].country + ". Following on from a innovation abroad - efficency has decreased.</p>" );
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Decrease in capital supply for "+ Country.list[key].country + ". Following on from investors leaving the economy - capital supply has decreased.</p>" );
                  break;
                  case 3:
                   $( "#economic_info" ).prepend( "<p>Decrease in capital supply for "+ Country.list[key].country + ". Following on from decrease in stock - capital efficency has decreased.</p>" );
                  break;
                  case 4:
                   $( "#economic_info" ).prepend( "<p>Decrease in capital supply for "+ Country.list[key].country + ". Following on from regulation there is a reduction in investment - capital has decreased.</p>" );
                  break;
                }

              break;
              case 5: //Land Increase
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="land"){
                    Country.list[key][key2].supply += 50;
                  }
                }
                switch(result){
                  case 1:
                    $( "#economic_info" ).prepend( "<p>Increase in land supply for "+ Country.list[key].country + ". Following on from a succesful war - land has increased.</p>" );
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Increase in land supply for "+ Country.list[key].country + ". Following on from deregulation in office market - land has increased.</p>" );
                  break;
                  case 3:
                    $( "#economic_info" ).prepend( "<p>Increase in land supply for "+ Country.list[key].country + ". Following on from a development of mult-story skyscrappers - land has increased.</p>" );
                  break;
                  case 4:
                    $( "#economic_info" ).prepend( "<p>Increase in land supply for "+ Country.list[key].country + ". Following on from an increase in house sharing - land has increased.</p>" );
                  break;
                }
          break;
              case 6: //Land Decrease
                for(key2 in Country.list[key]){
                  if(Country.list[key][key2].name=="land"){
                    Country.list[key][key2].supply -= 50;
                  }
                }
                switch(result){
                  case 1:
                    $( "#economic_info" ).prepend( "<p>Decrease in land supply for "+ Country.list[key].country + ". Following on from a invasion - land has decreased.</p>" );
  
                  break;
                  case 2:
                    $( "#economic_info" ).prepend( "<p>Decrease in land supply for "+ Country.list[key].country + ". Following on from regulation in office market - land has decreased.</p>" );

                  break;
                  case 3:
                    $( "#economic_info" ).prepend( "<p>Decrease in land supply for "+ Country.list[key].country + ". Following on from a reduction in development of mult-story skyscrappers - land has decreased.</p>" );
                  break;
                  case 4:
                    $( "#economic_info" ).prepend( "<p>Decrease in land supply for "+ Country.list[key].country + ". Following on from a more homes being built- land has decreased.</p>" );
                  break;
                }


              break;
            } 
            
          }

          Country.list[country] = self;

          return self
      }

      function generateMarket() {
          id = 0
           for (x = 0; x < countries.length; x++) {
              countries[x]
              for (y = 0; y < markets.length; y++) {
                  markets[y]
                  id++
                  var sector = markets[y];
                  var country = countries[x];
                  var supply = 0;
                  var demand = 0;
                  var id = id
                  
        

                  Market(sector, supply, demand, country, id)
              }
          }

      }

      function Market(sector, supply, demand, country, id){
          var self = {
              country: {
                  sector: {
                      supply: supply,
                      demand: demand,
                      sector: sector,
                      price: 0,
                  },
                  
              },

            country:country,
            sector:sector,
            supply:supply,
            demand:demand,
          }
          self.generatePrice = function(){
            

            self.price = self.demand/self.supply;
          }

          self.newEntrants = function(){
            if(game.tickCount%2 === 0){
              if(self.demand>self.supply){
                Competitor.generate(5, self.country, self.sector);
                self.sector
                self.country
              }
            }
          }
          self.resetDay = function(){
            self.supply = 0;
            self.demand = 0;
            self.price = 0;
          }

          self.cycliacalDemand = function(){
           return Math.sin(Math.PI * ((game.tickCount/180)*16))+5;
          }

          self.shock = function(){
            shockChance = Math.random();

            if(shockChance<=0.01){
              Market.list[5]
            }
          }




          self.updateChartLabor = function(){
            if (typeof chartDataLabor == 'undefined') {
              chartDataLabor = [];
            }
            chartDataLabor.push({
              date: game.tickCount,
              visits: self.price,
            });
            priceLabor.validateData();
            return chartDataLabor;
            }

          self.updateChartCapital = function(){
            if (typeof chartDataCapital == 'undefined') {
              chartDataCapital = [];
            }
            chartDataCapital.push({
              date: game.tickCount,
              visits: self.price,
            });
            priceCapital.validateData();
            return chartDataCapital;
            }
    
        

          Market.list[id] = self;

          return self
      };


      Competitor.generate = function(amount, countryChoice, sectorChoice){ //The parameter will dictate how many competitors to produce and also encourage new entrants into the market
        for (var i = 0; i < amount; i++) { //Simple for loop which generates a competitor
          capitalAmount = Math.random() //Proportion of Capital of this Business
          employeeAmount = 1 - capitalAmount //Proportion of Employees of this Business 

          
          


          var data = [
            {"Company": "Nullam Ut Nisi PC"},
            {"Company": "Cursus Vestibulum Mauris Corp."},
            {"Company": "Cursus Vestibulum Limited"},
            {"Company": "Velit Sed LLP"},
            {"Company": "Sem Ut Dolor Institute"},
            {"Company": "Donec Associates"},
            {"Company": "Aenean Gravida Institute"},
            {"Company": "Per Incorporated"},
            {"Company": "Suspendisse Eleifend Inc."},
            {"Company": "Turpis Non Enim LLC"},
            {"Company": "Suspendisse Eleifend Cras Ltd"},
            {"Company": "Imperdiet Company"},
            {"Company": "Non Sapien Molestie LLP"},
            {"Company": "Dui Semper LLC"},
            {"Company": "Quisque Associates"},
            {"Company": "In Lorem Donec Foundation"},
            {"Company": "Ultricies Dignissim Lacus LLC"},
            {"Company": "Duis PC"},
            {"Company": "Dolor Fusce Corporation"},
            {"Company": "Sem Molestie Industries"},
            {"Company": "Dolor Vitae Dolor Company"},
            {"Company": "Cum Sociis Natoque LLC"},
            {"Company": "Erat Vivamus Associates"},
            {"Company": "Volutpat Industries"},
            {"Company": "Ac LLC"},
            {"Company": "Dapibus Institute"},
            {"Company": "Sapien Inc."},
            {"Company": "Lectus Convallis Est Institute"},
            {"Company": "Et Magnis Dis Industries"},
            {"Company": "Phasellus Vitae Industries"},
            {"Company": "Quis Pede Suspendisse Company"},
            {"Company": "Mi LLP"},
            {"Company": "Non Sollicitudin A Institute"},
            {"Company": "Nostra LLC"},
            {"Company": "Quisque Associates"},
            {"Company": "Ipsum Suspendisse Sagittis Institute"},
            {"Company": "Dolor Corporation"},
            {"Company": "Ipsum Suspendisse Company"},
            {"Company": "Blandit Enim Corp."},
            {"Company": "A Neque Nullam Limited"},
            {"Company": "At Nisi Cum Institute"},
            {"Company": "In Ltd"},
            {"Company": "Aliquet LLP"},
            {"Company": "Lorem Inc."},
            {"Company": "Magna Limited"},
            {"Company": "Rutrum Non Hendrerit Incorporated"},
            {"Company": "Dolor Inc."},
            {"Company": "Odio Semper Cursus PC"},
            {"Company": "Ac Institute"},
            {"Company": "Quisque Porttitor Eros PC"},
            {"Company": "Scelerisque Sed Sapien Inc."},
            {"Company": "Tortor At Risus Corp."},
            {"Company": "Lobortis LLP"},
            {"Company": "Elit Corporation"},
            {"Company": "Magna Nec Quam Corp."},
            {"Company": "Eleifend Nunc Risus Consulting"},
            {"Company": "Nec Institute"},
            {"Company": "Nulla Eu Limited"},
            {"Company": "Cum Ltd"},
            {"Company": "In Company"},
            {"Company": "Nunc Company"},
            {"Company": "In Faucibus Inc."},
            {"Company": "Nascetur Foundation"},
            {"Company": "Lorem Ltd"},
            {"Company": "Faucibus Orci Luctus Inc."},
            {"Company": "Facilisis Eget Ltd"},
            {"Company": "Conubia Industries"},
            {"Company": "Commodo Corporation"},
            {"Company": "Interdum Libero Dui PC"},
            {"Company": "Ac Metus Ltd"},
            {"Company": "Duis Corporation"},
            {"Company": "Nunc In Associates"},
            {"Company": "Suspendisse Aliquet Molestie Incorporated"},
            {"Company": "Accumsan Convallis Consulting"},
            {"Company": "Dis Parturient Corp."},
            {"Company": "Placerat Orci Lacus LLP"},
            {"Company": "Amet Corp."},
            {"Company": "Posuere Associates"},
            {"Company": "Ipsum Cursus Limited"},
            {"Company": "Lacinia LLP"},
            {"Company": "Condimentum Donec Industries"},
            {"Company": "Proin Nisl Sem Industries"},
            {"Company": "Nec Euismod In PC"},
            {"Company": "Duis Sit LLP"},
            {"Company": "Auctor Foundation"},
            {"Company": "Aliquam Arcu Aliquam Company"},
            {"Company": "Ridiculus Mus Proin Incorporated"},
            {"Company": "Egestas LLP"},
            {"Company": "Vivamus Rhoncus Institute"},
            {"Company": "Donec Tempor Est Ltd"},
            {"Company": "Adipiscing Ltd"},
            {"Company": "Orci Lobortis PC"},
            {"Company": "Integer Ltd"},
            {"Company": "Nisi Sem Semper LLP"},
            {"Company": "Lorem Associates"},
            {"Company": "Duis Ac Arcu Industries"},
            {"Company": "Magna A Incorporated"},
            {"Company": "Non Nisi Aenean PC"},
            {"Company": "Mollis Dui In PC"},
            {"Company": "Etiam Bibendum Corp."}
          ];

          if(countryChoice == "random"){
          var country = countries[Math.floor(Math.random() * countries.length)];
          } else{
          var country = countryChoice;
          }
          if(sectorChoice == "random"){
          var sector = markets[Math.floor(Math.random() * markets.length)]; //http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
                     //http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
          } else{
          var sector = sectorChoice;
          }
          var name = data[Math.floor(Math.random()*100)].Company; 
          var capital = capitalAmount*18;
          var employees = employeeAmount*10;
          var land = 20;
          
          var id = Math.random();
          var efficiency = Math.random()*10;

          Competitor(name, sector, capital, employees, land, 'competitor', id, efficiency, country);
        };

      }