// this is most popular way of creating moduler in javaScrip using IFEE and each module have its own indepedent process 

// Budget Controller
var budgetController = (function(){
    
    // some code here 
    // create an constructor of Expense and income. Create an object of expense and income. create object of totals. 
    
    var Expense = function(id, discription , value){
        this.id  = id; // unique id for keeping track
        this.discription = discription;
        this.value = value;
    }
    
    var Income = function(id, discription, value){
        this.id =id;
        this.discription = discription;
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
            
        },
        
        testing: function(){
            return data; 
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
        
        
    }
    
    return {
        
        getInput: function(){
            
            return {
             
                type : document.querySelector(DOMStrings.inputType).value,
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value,
            
           
                };
        },
        
        getDomStrings : function(){
            return DOMStrings;
                }
        
    }
    
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
        
        budgetctrl.addItem(input.type, input.description, input.value);
        
    // 3. add item to UI controler
    
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