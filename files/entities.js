markets = ["Primary", "Secondary", "Service"]
countries = ["France", "United Kingdom"]

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
              if(self.cash<-2){
                for(key in Competitor.list){
                  if(self.id = Competitor.list[id]){
                    delete Competitor.list[id];
                    break;
                  }
                
                }
              }
            }
            Competitor.list[id] = self; 
            return self;
        };

      function Player(name, sector, capital, employees, land, type, id, efficiency, country){
        var self = Business(name, sector, capital,  employees,land, type, id, efficiency, country);
        self.stock=0;
        self.capacity=100;

         
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
                costOfLabor = round(costOfLabor, 2);
                costOfCapital = round(costOfCapital, 2);
                costOfLand = round(costOfLand, 2);
                player.cash -= (costOfLabor + costOfCapital + costOfLand); //works out the cost of labor, capital and land

              }
            }
          for(var key in Market.list){ //checks the capacity of your business
                if(self.country==Market.list[key].country){
                  if(self.sector==Market.list[key].sector){
                      self.capacity = 100;
                    if(self.upgrades=="Start-up"){
                      self.capacity = 1000;
                    } else if (self.upgrades=="Medium Firm"){
                      self.capacity = 10000;
                    } else if (self.upgrades=="Large Firm"){
                      self.capacity = 100000;
                    }
                    output = employees*capital;

                    spareCapacity = output/self.capacity;
                    if(output>self.capacity){
                    output = output / Math.exp(spareCapacity-1);} //if output exceeds capacity provide a penalty 

                    self.stock += output;

                    updateCompanyDetailsUI();
                  } 
                } 
            }
        }
        self.sellOutput = function(amount){
            for(var key in Market.list){
                  if(self.country==Market.list[key].country){ //checks the country
                    if(self.sector==Market.list[key].sector){ //checks the sector
                      Market.list[key].supply += amount; //increases the supply

                      Market.list[key].price = Market.list[key].demand/Market.list[key].supply; //works out the new price

                      income = Market.list[key].price * amount; //increases the cash

                      self.cash += round(income,2);
                      self.stock -= amount; //reduces the stock

                      updateCompanyDetailsUI(); //updates the UI
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
                    newDemandLabor = Country.list[key][key2].demand + employees; //add the employees demand onto the country market
                    originalSupplyLabor = Country.list[key][key2].supply; //store the supply in a variable so we can manipulate it
                    priceOfLabor = newDemandLabor/originalSupplyLabor //work out the new price of labor
                  }
                  if(Country.list[key][key2].name=="capital"){
                    
                   
                    originalDemandCapital = Country.list[key][key2].demand; //store it in a variable so we can manipulate it
                    newDemandCapital = Country.list[key][key2].demand + capital; //add the capital onto the country market
                    originalSupplyCapital = Country.list[key][key2].supply; //store the supply in a variable so we can manipulate it
                    priceOfCapital = newDemandCapital/originalSupplyCapital //work out the new price of capital
                 
                  }
                  if(Country.list[key][key2].name=="land"){
                    
                   
                    priceOfLand = Country.list[key][key2].price //store the price of land in a variable
                 
                  }
                }

                costOfLand = priceOfLand*self.land; //work out total cost of land
                costOfLabor = priceOfLabor*employees; //work out total cost of labor
                costOfCapital = priceOfCapital*capital; //work out total cost of capital
                totalCost = costOfCapital + costOfLabor + costOfLand; //add all of these variables together

                costOfLabor = round(costOfLabor, 2);
                costOfCapital = round(costOfCapital,2);
                landCost = round(landCost, 2);
                totalCost = round(totalCost, 2);
                priceOfCapital = round(priceCapital, 2);
                priceOfLabor = round(priceOfLabor, 2);
                return { //save these variables in an object
                      "laborCost": costOfLabor,
                      "capitalCost": costOfCapital,
                      "landCost": costOfLand,
                      "totalCost": totalCost,
                      "priceOfCapital": priceOfCapital,
                      "priceOfLabor": priceOfLabor
                };
                
                break;
              }
            }
          }

        self.predictIncome = function(employees, capital){
            for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){ //check capacity of business
                      self.capacity = 100;
                      if(self.upgrades=="Start-up"){
                        self.capacity = 1000;
                      } else if (self.upgrades=="Medium Firm"){
                        self.capacity = 10000;
                      } else if (self.upgrades=="Large Firm"){
                        self.capacity = 100000;
                      }
                      output = employees*capital; //produce the output from employees and capital

                      spareCapacity = output/self.capacity;
                      if(output>self.capacity){
                      output = output / Math.exp(spareCapacity-1);} //if output exceeds the capacity provide penalty

                      originalSupplyMarket = Market.list[key].supply //get the supply of the sector
                      originalDemandMarket = Market.list[key].demand //get the demand of the sector
                      newSupplyMarket = Market.list[key].supply + output //add the output to the supply
                      price = originalDemandMarket/newSupplyMarket; //work out the new price
                      totalIncome = output * price; //multiply it by output

                      output = round(output, 2)
                      price = round(price, 2)
                      totalIncome = round(totalIncome, 2)

                      return {//store it in the object
                      "output": output, 
                      "price": price,
                      "totalIncome": totalIncome,
                      };
                    } 
                  } 
            }
        }

        self.checkCashFlow = function(){ 
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

        self.firstUpgrade = function(){



          self.upgrades['Start-up']=true;
          self.cash -= 25;
          self.efficiency *= 2;
          self.land *= 10;
          self.networth += 25;
          self.capacity *= 5;


        }

        self.secondUpgrade = function(){
          self.upgrades['Medium Firm']=true;
          self.cash -= 5000;
          self.efficiency *= 2;
          self.land *= 10;
          self.capacity *= 5;
          self.networth += 5000;
        }

        self.thirdUpgrade = function(){
          self.upgrades['Large Firm']=true;
          self.cash -= 5000000;
          self.efficiency *= 2;
          self.capacity *= 5;
          self.land *= 10;
          self.networth += 5000000;
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
                if(self.country==Country.list[key2].country){ //match the country
                  
                  self.addDemandofFactors(key2);  //loop through businesses and add demand of the factors
                }
              }
              }
              self.addDemandofFactors = function(key2){ //add demand of factors to each country
                for(key3 in Country.list[key2]){
                  if(Country.list[key2][key3].name=="labor"){
                    Country.list[key2][key3].demand += self.employees; //add the demand of employees to the respective country
                  } else if (Country.list[key2][key3].name=="capital"){
                    Country.list[key2][key3].demand += self.capital; //add the demand of capital to the respective country
                  } else if(Country.list[key2][key3].name=="land"){
                    Country.list[key2][key3].demand += self.land; //add the demand of land to the respective country
                  }
                }
              }
              self.produce = function(){   //produce output         
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                     self.generateSupply(key); //add the supply of the sector that business operates in
                    }  
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateDemand(key);  //if you are supplying sector primary, you are demanding sector secondary
                    } else if (self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateDemand(key); //if you are supplying sector Secondary, you are demanding sector Service
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateDemand(key); //if you are supplying sector Service, you are demanding sector Primary
                    }
                  }
                } 
              }

              self.generateSupply = function(key){ //Business
                Market.list[key].supply  += (self.capital*self.employees); //Add the supply to the market 
              }

              self.generateDemand = function(key){ //Business
                Market.list[key].demand +=(self.capital*self.employees); //Add the demand to the market
              
              }

              self.exchange = function(){ //
                self.sector
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                      self.generateIncome(key); //Sell the product
                    }
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateProduceExpense(key); //Buy the Raw Materials
                      self.generateExpenseFactor(); //Buy the factors of production
                      
                    } else if(self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateProduceExpense(key); //Buy the Raw Materials
                      self.generateExpenseFactor(); //Buy the factors of production
                      
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateProduceExpense(key); //Buy the Raw Materials
                      self.generateExpenseFactor(); //Buy the factors of production
                     
                      } 
                    }
                  }
                }



              self.generateIncome = function(key){  //Business
                self.income = (Market.list[key].price * (self.capital*self.employees))*self.efficiency;  //Multiply the price of the market with the output (capital*employees) and multiply by efficiency 
              }

              self.generateProduceExpense = function(key){ //This function looks at how much it costs to purchase raw materials

                self.expenses = (Market.list[key].price * (self.capital*self.employees))/self.efficiency; //Multiply the price of the market list with the amount of output (capital*employees) and divide by efficency
              }

              self.generateExpenseFactor = function(){ //This function looks at how much it costs to purchase labor and capital in respective countries.
                  
                  for(key in Country.list){
                    if(self.country==Country.list[key].country){
                      for(key2 in Country.list[key]){
                        if(Country.list[key][key2].name=="labor"){
                          priceOfLabor = Country.list[key][key2].price  //find the price of labor for the respective country

                        }
                        if(Country.list[key][key2].name=="capital"){
                          priceOfCapital = Country.list[key][key2].price //find the price of capital the respective country
                        }
                        if(Country.list[key][key2].name=="land"){
                          priceOfLand = Country.list[key][key2].price //find the price of land the respective country
                          break;
                        }
                      }

                      CostOfLabor = priceOfLabor*self.employees //multiply the price of labor with the amount of employees in the business
                      CostOfCapital = priceOfCapital*self.capital //multiply the price of capital with the amount of capital in the business
                      CostOfLand = priceOfLand*self.land //multiply the price of land with the amount of land the firm owns

                      self.expenses += (CostOfCapital + CostOfLabor + CostOfLand)/self.efficiency; //add all of these factors of production together and divide it by the efficency of the firm
                      break;
                    }
                  }
                
              }







              self.upgrade = function(){
                if(self.cash>5 && self.upgrades['Start-up']==false){ //upgrade characteristics
                  $('#startUp').attr('disabled', false);

                } else if (self.cash>500 && self.upgrades['Medium Firm']==false){
                  $('#mediumFirm').attr('disabled', false);
                  self.upgrades['Medium Firm']=true;
                }   
              } 

              self.firstUpgrade = function(){
                  self.upgrades['Start-up']=true;
                  self.cash -= 5;
                  self.efficiency *= 2;
                  self.employees *= 10;
                  self.capital *= 10;
                  self.land *= 10;
                  self.networth += 5;
              }

              self.secondUpgrade = function(){
                  self.upgrades['Medium Firm']=true;
                  self.cash -= 500;
                  
                  self.employees *= 10;
                  self.capital *= 10;
                  self.land *= 10;
                  self.networth += 500;
              }
                


              return self;
          };

      function generateCountry() { //the supply, capital and labor of each country
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
              Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply //generate the price for factors of production
            }
            
          }
          self.resetDemand = function(key){
            for(key2 in Country.list[key]){
              Country.list[key][key2].demand = 0;  //reset the demand for the
            }
          }

          self.immigrate = function(key){
        
            for(key2 in Country.list[key]){
              
              if(Country.list[key][key2].name=="labor"){
                

                LaborPrices[Country.list[key].country] = Country.list[key][key2].price;
                ol = Object.keys(LaborPrices);
                break;
                
                }
              continue;
              }
              if(ol.length==countries.length){
                for(key3 in LaborPrices){
                    original = LaborPrices[key3]
                    console.log(key3)
                    console.log(original)

                    //console.log(Country.list[key3].country)
                    console.log(Country.list[key3][key2].price)
                   
                    difference = Country.list[key][key2].price-LaborPrices[key3]
                    movement = Country.list[key][key2].supply
                    value = difference/original

                    Country.list[key3][key2].supply

                    immigrants= value*Country.list[key3][key2].supply
           
                    if(immigrants>=Country.list[key3][key2].supply){
                      immigrants=Country.list[key3][key2].supply-1
                    }
                    immigrants = immigrants/30;
               
                    Country.list[key3][key2].supply-=immigrants;
                    Country.list[key3][key2].price = Country.list[key3][key2].demand/Country.list[key3][key2].supply;
                    Country.list[key][key2].supply+=immigrants;
                    Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply;
                }
              }
           } 

          self.capitalMovement = function(key){
            for(key2 in Country.list[key]){
              if(Country.list[key][key2].name=="capital"){
                CapitalPrices[Country.list[key].country]=Country.list[key][key2].price;
                for(key3 in CapitalPrices){
                  original = CapitalPrices[key3]
                  difference = Country.list[key][key2].price-CapitalPrices[key3]
                  movement = Country.list[key][key2].supply
                  value = difference/original

                  Country.list[key3][key2].supply
                  immigrants= value*Country.list[key3][key2].supply
                  immigrants = immigrants/10;

                  if(immigrants>=Country.list[key3][key2].supply){
                    immigrants=Country.list[key3][key2].supply-1
                  }
                  
                  Country.list[key3][key2].supply-=immigrants;
                  Country.list[key3][key2].price = Country.list[key3][key2].demand/Country.list[key3][key2].supply;
                  Country.list[key][key2].supply+=immigrants;
                  Country.list[key][key2].price = Country.list[key][key2].demand/Country.list[key][key2].supply;
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