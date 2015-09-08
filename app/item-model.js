var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observableModule = require("data/observable");

var ItemModel = (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(itemName, itemLot, itemQuantity, itemStock) {
    	_super.call(this);
        this._itemName = itemName;
    	this._itemLot = itemLot; 
        this._itemQuantity = parseInt(itemQuantity);   
        this._itemStock = parseInt(itemStock);
    }
    Object.defineProperty(ItemModel.prototype, "itemName", {
        get: function () {
            return this._itemName;
        },
        set: function (value) {
            if (this._itemName !== value) {
                this._itemName = value;
                this.notifyPropertyChanged("itemName", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemModel.prototype, "itemLot", {
        get: function () {
            return this._itemLot;
        },
        set: function (value) {
            if (this._itemLot !== value) {
                this._itemLot = value;
                this.notifyPropertyChanged("itemLot", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemModel.prototype, "itemQuantity", {
        get: function () {
            return this._itemQuantity;
        },
        set: function (value) {
            console.log("Being set! Initial value = " + this._itemQuantity);
            value = parseInt(value) || 0;
            if (this._itemQuantity !== value) {
                if(value > this._itemStock){

                    console.log("Not enough stock!");
                    value = this._itemStock;
                    this._itemQuantity = value;
                } 
                else if(value < 0) {
                   this._itemQuantity = 0;
                }
                else
                    this._itemQuantity = value;

                console.log("Final value = " + this._itemQuantity);
                this.notifyPropertyChanged("itemQuantity", value); 
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemModel.prototype, "itemStock", {
        get: function () {
            return this._itemStock;
        },
        set: function (value) {
            if (this._itemStock !== value) {
                this._itemStock = value;
                this.notifyPropertyChanged("itemStock", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemModel.prototype.addToQuantity = function(amount){
        if(this._itemQuantity + amount >= 0 && this._itemQuantity + amount <= this._itemStock)
            this._itemQuantity += amount;
        else if(this._itemQuantity + amount > this._itemStock)
            console.log("Max stock = " + this._itemStock);
    };

    return ItemModel;
})(observableModule.Observable);
exports.ItemModel = ItemModel;

