// STORAGE CONTROLLER


// ITEM CONTROLLER
const ItemCtrl = (function(){
  // ^^ iffy function run immediatley and assign
  // to the variable
  // Item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // data structure / state
  const data = {
    items: [
      // hard coded data
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300},
    ],
    // item to update
    currentItem: null,
    totalCalories: 0
  }

  // public methods
  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})();


// UI CONTROLLER
const UICtrl = (function(){
  // selectors for updating later possibly
    const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn'
    }

    // public methods
    return{
      populateItemList: function(items){
        // loopthrough items and make into a
        // list item and then insert
        let html = '';

        items.forEach((item) => {
          html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
        });
        // ifor each item in list
        // insert into html
        document.querySelector(UISelectors.itemList).innerHTML = html;
      },
      getSelectors: function(){
        return UISelectors;
      }
    }
})();


// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){
  // function expresson to load events
  const loadEventListeners = function(){
    // get all selectors
    const UISelectors = UICtrl.getSelectors();

    // add item event
    document.querySelector(UISelectors.addBtn).loadEventListeners('click', itemAddSubmit);
  }

  // Add item submit
  const itemAddSubmit = function (e) {
    console.log('add');

    e.preventDefault();
  }

  // public methods
  return {
    init: function(){
      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // populate list with items
      UICtrl.populateItemList(items);

      // load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// INITIALIZE APP
AppCtrl.init();