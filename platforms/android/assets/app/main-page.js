var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var itemModel = require("./item-model")

var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;
var listView;

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("task", "");
    pageData.set("tasks", tasks);
    listView = page.getViewById("listView");
    listView.items = tasks;
    page.bindingContext = pageData;

    tasks.on("propertyChange", function (args) {
    	console.log("Alto: " + args.eventName + " no object " + args.object);
    });
};

exports.add = function() {
	name = pageData.get("task");
    tasks.push( new itemModel.ItemModel(name, ", Lot", 0, 100) ); //{ name: pageData.get("task")  } //new itemModel.ItemModel(name, "", 0, 100, listView )
    pageData.set("task", "");
    viewModule.getViewById( page, "task" ).dismissSoftInput();
};

exports.removeQuantityTap = function (args) { 
  currItemModule = args.object.bindingContext; 
  value = currItemModule.get("itemQuantity") - 1;
  currItemModule.set("itemQuantity", value);
  /*dockLayout = args.object.parent;
  quantity = parseInt(dockLayout.getViewById("itemQuantityTF").text);
  if(quantity > 0)
    quantity -= 1;
  dockLayout.getViewById("itemQuantityTF").text = String(quantity);*/  
};

exports.addQuantityTap = function (args) {
  dockLayout = args.object.parent;
  quantity = parseInt(dockLayout.getViewById("itemQuantityTF").text);
  quantity += 1;
  dockLayout.getViewById("itemQuantityTF").text = String(quantity);  
};

exports.removeItemTap = function (args) {
	item = args.object.bindingContext;
	index = tasks.indexOf(item);
	tasks.splice(index,1);
};