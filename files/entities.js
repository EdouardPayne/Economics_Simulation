      function Competitor(name, sector, capital, employees, type, id, efficiency){
         var self = Business(name, sector, capital, employees, type, id, efficiency);

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

      function Business(name, sector, capital, employees, type, id, efficiency) {
          var self = {
          name:name,  
          sector:sector,
          capital:capital,
          employees:employees,
          type:type,
          id:id,
          efficiency:efficiency,
          upgrades: {'Start-up' : false,
                     'Medium Firm' : false,
                     'Large Firm' : false, },

         };
         self.cashFlow=0;
         self.cash=0;
         self.income = 0;
         self.expenses = 0;
         self.networth = self.cash;

         var produced = self.capital*self.employees;
          self.produce = function(){   //Business         
            for(var key in Market.list){
              if(self.sector==Market.list[key].sector){
                self.generateSupply(key);
              } 
              if(self.sector=="primary" && Market.list[key].sector=="secondary"){
                self.generateDemand(key);
              } else if(self.sector=="secondary" && Market.list[key].sector=="service"){
                self.generateDemand(key);
              } else if (self.sector=="service" && Market.list[key].sector=="primary"){
                self.generateDemand(key);
              }
              if(Market.list[key].sector=="labour") {
                Market.list[key].demand += self.employees; 
              }
              if(Market.list[key].sector=="capital") {
                Market.list[key].demand += self.capital; 
              };
            }               
          }

          self.exchange = function(){
            for(var key in Market.list){ //Business
              if(self.sector==Market.list[key].sector){
                self.generateIncome(key);

              }
              if(self.sector=="primary" && Market.list[key].sector=="secondary"){
                self.generateProduceExpense(key);
                self.generateExpenseFactor();
              } else if(self.sector=="secondary" && Market.list[key].sector=="service"){
                self.generateProduceExpense(key);
                self.generateExpenseFactor();
              } else if (self.sector=="service" && Market.list[key].sector=="primary"){
                self.generateProduceExpense(key);
                self.generateExpenseFactor();
                } 
              }
            }



          self.generateIncome = function(key){  //Business
            self.income = (Market.list[key].price * produced)*self.efficiency;  
          }

          self.generateProduceExpense = function(key){ //Business
            self.expenses = (Market.list[key].price * produced)/self.efficiency;
          }

          self.generateSupply = function(key){ //Business
            Market.list[key].supply  += produced; //Sell the goods onto the market
          }

          self.generateDemand = function(key){ //Business
            Market.list[key].demand +=produced;
          }

          self.generateExpenseFactor = function(){ //Business
            generateExpenseCapital = Market.list[5].price * self.capital;
            generateExpenseLabour = Market.list[4].price * self.employees;

            self.expenses += (generateExpenseCapital + generateExpenseLabour)/self.efficiency;
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
              self.efficiency *= 10;
              self.employees *= 10;
              self.capital *= 10;
              self.networth += 5;
          }

          self.secondUpgrade = function(){
              console.log("Hello Medium Firm");
              self.upgrades['Medium Firm']=true;
              self.cash -= 500;
              self.efficiency *= 10;
              self.employees *= 10;
              self.capital *= 10;
              self.networth += 500;
          }
          


          return self;
      };

      function Market(sector, supply, demand, id){
          var self = {
            sector:sector,
            supply:supply,
            demand:demand,
            id:id,
          }
          self.generatePrice = function(){
            
            if(self.id==5 || self.id==4 ){
              self.supply=5;
            }
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

          self.consumerDemand = function(){
           console.log(Math.sin(Math.PI * (game.tickCount/180))+5);
          }




          self.updateChartLabour = function(){
            if (typeof chartDataLabour == 'undefined') {
              chartDataLabour = [];
            }
            chartDataLabour.push({
              date: game.tickCount,
              visits: self.price,
            });
            priceLabour.validateData();
            return chartDataLabour;
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

            sectorChance = Math.random()
            if(sectorChance>0 && sectorChance<=0.33){
              var sectorChoice = "primary";
            } else if(sectorChance>0.33 && sectorChance<=0.66){
              var sectorChoice = "secondary";
            } else{
              var sectorChoice = "service";
            }

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
            var capital = capitalAmount;
            var employees = employeeAmount;
            var sector = sectorChoice;
            var id = Math.random();
            var efficiency = Math.random()*10;

            Competitor(name, sector, capital, employees, 'competitor', id, efficiency);
          };

        }