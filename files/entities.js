markets = ["Primary", "Secondary", "Service"]
countries = ["France", "United Kingdom"]



      function Competitor(name, sector, capital, employees, type, id, efficiency, country) {
           var self = Business(name, sector, capital, employees, type, id, efficiency, country);

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
                  delete Competitor.list[id];
                }
              }
            }
            Competitor.list[id] = self; 
            return self;
        };

      function Player(name, sector, capital, employees, type, id, efficiency, country){
        var self = Business(name, sector, capital, employees, type, id, efficiency, country);
         self.stock=0;

         
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
                    break;
                  }


                  
                }
                player.cash -= (costOfLabor + costOfCapital);

              }
            }
          for(var key in Market.list){
                if(self.country==Market.list[key].country){
                  if(self.sector==Market.list[key].sector){
                    capacity = 100;
                    if(self.upgrades=="Start-up"){
                      capacity = 1000;
                    } else if (self.upgrades=="Medium Firm"){
                      capcity = 10000;
                    } else if (self.upgrades=="Large Firm"){
                      capacity = 100000;
                    }
                    output = employees*capital;

                    spareCapacity = output/capacity;
                    if(output>capacity){
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
                    break;
                  }
                }


                costOfLabor = priceOfLabor*employees; 
                costOfCapital = priceOfCapital*capital; 
                totalCost = costOfCapital + costOfLabor;
                return {
                      "laborCost": costOfLabor,
                      "capitalCost": costOfCapital,
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
                      capacity = 100;
                      if(self.upgrades=="Start-up"){
                        capacity = 1000;
                      } else if (self.upgrades=="Medium Firm"){
                        capcity = 10000;
                      } else if (self.upgrades=="Large Firm"){
                        capacity = 100000;
                      }
                      output = employees*capital;

                      spareCapacity = output/capacity;
                      if(output>capacity){
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
      function Business(name, sector, capital, employees, type, id, efficiency, country) {
              var self = {
              name:name,  
              sector:sector,
              capital:capital,
              employees:employees,
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
                  console.log("Match");
                  self.addDemandofFactors(key2)
                }
              }
              }
              self.addDemandofFactors = function(key2){
                for(key3 in Country.list[key2]){
                  if(Country.list[key2][key3].name=="labor"){
                    Country.list[key2][key3].demand += self.employees
                  } else if (Country.list[key2][key3].name=="capital"){
                    Country.list[key2][key3].demand += self.capital
                  }
                }
              }
              self.produce = function(){   //Business         
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                     self.generateSupply(key)
                    }  
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateDemand(key)
                    } else if (self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateDemand(key);
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateDemand(key);
                    }
                  }
                } 

              }

              self.exchange = function(){
                for(var key in Market.list){
                  if(self.country==Market.list[key].country){
                    if(self.sector==Market.list[key].sector){
                      self.generateIncome(key); //Sell the product, need to get taxed
                    }
                    if(self.sector=="Primary" && Market.list[key].sector=="Secondary"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor(); //Buy the produce, need to get taxed 
                      break;
                    } else if(self.sector=="Secondary" && Market.list[key].sector=="Service"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor();
                      break;
                    } else if (self.sector=="Service" && Market.list[key].sector=="Primary"){
                      self.generateProduceExpense(key);
                      self.generateExpenseFactor();
                      break;
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
                          break;
                        }
                      }

                      CostOfLabor = priceOfLabor*self.employees 
                      CostOfCapital = priceOfCapital*self.capital 

                      self.expenses += (CostOfCapital + CostOfLabor)/self.efficiency;
                      break;
                    }
                  }
                
              }

              self.generateSupply = function(key){ //Business
                Market.list[key].supply  += (self.capital*self.employees); //Sell the goods onto the market
                console.log("Generated supply " + Market.list[key].supply)
              }

              self.generateDemand = function(key){ //Business
                Market.list[key].demand +=(self.capital*self.employees);
                console.log("Generated demand " + Market.list[key].demand)
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
                  self.networth += 5;
              }

              self.secondUpgrade = function(){
                  console.log("Hello Medium Firm");
                  self.upgrades['Medium Firm']=true;
                  self.cash -= 500;
                  
                  self.employees *= 10;
                  self.capital *= 10;
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
            if(game.tickCount%4 === 0){
              if(self.demand>self.supply)
                Competitor.generate(5);
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


      Competitor.generate = function(amount){ //The parameter will dictate how many competitors to produce and also encourage new entrants into the market
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

          var name = data[Math.floor(Math.random()*100)].Company; 
          var capital = capitalAmount*18;
          var employees = employeeAmount*10;
          var sector = markets[Math.floor(Math.random() * markets.length)]; //http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
          var country = countries[Math.floor(Math.random() * countries.length)]; //http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
          var id = Math.random();
          var efficiency = Math.random()*10;

          Competitor(name, sector, capital, employees, 'competitor', id, efficiency, country);
        };

      }