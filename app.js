// STORAGE CONTROLLER

// ITEM CONTROLLER
// iffy function
const ItemCtrl = (function(){
  // Item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // data structure / state
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300},
    ],
    // item to update
    currentItem: null,
    totalCalories: 0
  }

  // public return
  return {
    
  }
})();

// UI CONTROLLER
const UICtrl = (function(){

})();

// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){

})(ItemCtrl, UICtrl);