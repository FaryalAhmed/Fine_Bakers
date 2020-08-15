module.exports= function myCart(cart)
{
    this.items= cart.items;
    this.Qty=cart.Qty;
    this.Price=cart.Price;

    this.add = (item,id)=>
    {
        var sitem = this.items[id];
        if(!sitem)
        {
            sitem =this.items[id] = {item:item, quantity:0,priceIs:0 }
        }

        sitem.quantity++;
    sitem.priceIs = sitem.item.priceIs * sitem.quantity;
    this.Qty++;
    this.Price += sitem.priceIs    
    }
    this. arrayGeneration = 
}