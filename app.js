// this is most popular way of creating moduler in javaScrip using IFEE and each module have its own indepedent process 

// Budget Controller
var budgetController = (function(){
    
    // some code here 
    // create an constructor of Expense and income. Create an object of expense and income. create object of totals. 
    
    var Expense = function(id, description , value){
        this.id  = id; // unique id for keeping track
        this.description = description;
        this.value = value;
    }
    
    var Income = function(id, description, value){
        this.id =id;
        this.description = description;
        this.value = value ; 
    }
    // we need a data structure where we can save all of the intances of income and expenses
    // data is an object where allitems and totals are objects too which hold inccomes and expenses.. 
    
    var data = {
        
        allitems: {
            exp: [],
            inc: []
        },
        
        totals : {
            exp: 0 ,
            inc: 0
        }
        
    }
    
    // public methods
    return {
        
        addItem: function(type, des, val){
            var newItem, id;
            
            // if arrays are not empty assigning new id by adding 1 on last id based on type . 
            
            if (data.allitems[type].length > 0 ){
                id = data.allitems[type][data.allitems[type].length - 1].id + 1;  
            } else {
                id = 0;
            }
            if (type === 'inc'){
                newItem = new Income(id,des,val);
            } else if (type === 'exp'){
                newItem = new Expense(id,des,val);
                
            }
             // since item is inc and exp. and in data's all item we have exp and inc array which can identify using type and you can push item into it according to type. 
            data.allitems[type].push(newItem); 
            
            return newItem;
            
        }
      
        
    }
    

       
    
})(); // this is IFEE function



// UI controller
var UIController = (function(){
    
    
    // some code here 
    
        
    var DOMStrings = {
        
        inputType: '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputButton : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list'
        
        
    }
    
    return {
        
        getInput: function(){
            
            return {
             
                type : document.querySelector(DOMStrings.inputType).value,
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value,
            
           
                };
        },
         // adding income and expense div 
        addListItem : function(obj, type){
            var html, newHtml, element;
            
           // create html string with place holder text. use of % in place holder is optional just to identify placeholder. 
            if (type === 'inc'){
                    
                    element = DOMStrings.incomeContainer;
                
                     html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           
            } else if (type ==='exp'){
                    
                    element = DOMStrings.expenseContainer;
                    html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div></div>'
                
            }
            // replace place holder with actuall data
            // replace method takes 1st parameter of placeholder and second parameter from what you want to replace with 
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // put html into the DOM
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            
            
        },
        
        getDomStrings : function(){
            return DOMStrings;
                }
        
    };
    
})(); 

// Global App Controller
var controller = (function(budgetctrl, UIctrl){
    
    // this method will initilize all of the eventlistener. 
    var setupEventListener = function(){
        
        var dom = UIctrl.getDomStrings();
       
        document.querySelector(dom.inputButton).addEventListener('click',controlAddItem);
        document.addEventListener('keypress',function(e){
        
        if(e.keyCode === 13 || e.which === 13){
            controlAddItem();
                }
            });
    
        
    }; // end of Setup Event Listener
    
    
    var controlAddItem = function(){
   
    // things to d0
        
    // 1. get the field input data
        var input = UIctrl.getInput();

        
        
    // 2. add the item to budget controller 
        
       var newItem = budgetctrl.addItem(input.type, input.description, input.value);
        
    // 3. add item to UI controler
        UIctrl.addListItem(newItem, input.type);
        
    
    // 4. calculate budgest
    
    // 5. Display the budget on the UI 
        
   
    }
    
    
    // Button Event Hanlder
    
    return {
        init: function(){
            console.log("App has stared");
            setupEventListener();
        }
    } // end of return 
    
    
})(budgetController, UIController);

controller.init(); 