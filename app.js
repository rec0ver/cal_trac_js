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
})();

// UI CONTROLLER
const UICtrl = (function(){

})();

// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){

})(ItemCtrl, UICtrl);