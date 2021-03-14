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
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300},
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
    addItem: function(name, calories){
      let ID;
      // create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // calories to number
      calories = parseInt(calories);

      // create new item
      newItem = new Item(ID, name, calories);

      // add new item to data structure
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id){
      let found = null;
      // loop through items
      data.items.forEach(function(item){
        if (item.id === id){
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories){
      // calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // remove item
      data.items.splice(index, 1);
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;
      // loop through items and accumulate calories
      data.items.forEach(function (item){
        total += item.calories;
      });
      // set total cal in data structure
      data.totalCalories = total;

      return data.totalCalories;
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
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
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
      getItemInput: function(){
        return {
          name: document.querySelector(UISelectors.itemNameInput).value,
          calories: document.querySelector(UISelectors.itemCaloriesInput).value
        }
      },
      addListItem: function(item){
        // show list item
        document.querySelector(UISelectors.itemList).style.display = 'block';
        // Create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // add ID
        li.id = `item-${item.id}`;

        // add HTML
        li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
        // insert item
        document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      },
      updateListItem: function (item){
        let listItems = document.querySelectorAll(UISelectors.listItems);

        // convert
        listItems = Array.from(listItems);

        listItems.forEach(function(listItem){
          const itemID = listItem.getAttribute('id');

          if(itemID === `item-${item.id}`){
            document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
          }
        });
      },
      deleteListItem: function(id){
        const itemID = `#item-${id}`
        const item = document.querySelector(itemID);
        item.remove();
      },
      // clear fields method
      clearInput: function(){
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      addItemToForm: function(){
        document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
        document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
        UICtrl.showEditState();
      },
      hideList: function(){
        document.querySelector(UISelectors.itemList).style.display = 'none';
      },
      showTotalCalories: function(totalCalories){
        document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
      },
      clearEditState: function(){
        UICtrl.clearInput();
        document.querySelector(UISelectors.updateBtn).style.display = 'none';
        document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        document.querySelector(UISelectors.backBtn).style.display = 'none';
        document.querySelector(UISelectors.addBtn).style.display = 'inline';
      },
      showEditState: function(){
        document.querySelector(UISelectors.updateBtn).style.display = 'inline';
        document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
        document.querySelector(UISelectors.backBtn).style.display = 'inline';
        document.querySelector(UISelectors.addBtn).style.display = 'none';
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
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    })

    // edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemsUpdateSubmit);

    // delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  }

  // Add item submit
  const itemAddSubmit = function(e){
    // get form input from UI controller
    const input = UICtrl.getItemInput();

  //  check for input
  if(input.name !== '' && input.calories !== ''){
    // add item
    const newItem = ItemCtrl.addItem(input.name, input.calories);
    // add item to UI list
    UICtrl.addListItem(newItem);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    // Clear fields
    UICtrl.clearInput();
  }
    e.preventDefault();
  }

  // update item submit
  const itemEditClick = function(e){

      // event delegation to search for this item
      // because this item may not exist until
      // after the page loads
    if(e.target.classList.contains('edit-item')){
      // get list item id 
      const listId = e.target.parentNode.parentNode.id;

      // break into an array
      const listIdArr = listId.split('-');
      // brab acutal id
      const id = parseInt(listIdArr[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();
    };

    e.preventDefault();
  };

  // update item submit
  const itemsUpdateSubmit = function (e){

    // get item input
    const input = UICtrl.getItemInput();

    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // update UI
    UICtrl.updateListItem(updatedItem);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Delete button event
  const itemDeleteSubmit = function (e){
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // delete from ui
    UICtrl.deleteListItem(currentItem.id);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // public methods
  return {
    init: function(){

      // clear edit state or set initial state
      UICtrl.clearEditState();

      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // check if any items
      if (items.length === 0){
        UICtrl.hideList();
      }else {
        // populate list with items
      // UICtrl.populateItemList(items);
      console.log(items.length)
      }

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to the ui
      UICtrl.showTotalCalories(totalCalories);

      // load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// INITIALIZE APP
AppCtrl.init();