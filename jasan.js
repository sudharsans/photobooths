simpleCart({
	// array representing the format and columns of the cart,
	// see the cart columns documentation
	cartColumns: [
		{ attr: "name", label: false},
		{ view: "remove", text: "Remove", label: false},
		{view:'image' , attr:'thumb', label: false},
		{ attr: "price" , label: "Price", view: 'currency' } ,
        { view: "decrement" , label: false , text: "-" } ,
        { attr: "quantity" , label: "Qty" } ,
        { view: "increment" , label: false , text: "+" } ,
        { attr: "size" , label: true , text: "print" }

	],

	// "div" or "table" - builds the cart as a 
	// table or collection of divs
	cartStyle: "div", 

	// how simpleCart should checkout, see the 
	// checkout reference for more info 
	checkout: { 
	type: "SendForm" ,
    url: "send.php" ,
    method: "POST" ,
    success: "success.php" ,
    cancel: "cancel.php"
    },

	// set the currency, see the currency 
	// reference for more info

	// collection of arbitrary data you may want to store 
	// with the cart, such as customer info
	data: {},

	// set the cart langauge 
	// (may be used for checkout)
	language: "english-us",

	// array of item fields that will not be 
	// sent to checkout
	excludeFromCheckout: [],

	// custom function to add shipping cost
	shippingCustom: null,

	// flat rate shipping option
	shippingFlatRate: 0,

	// added shipping based on this value 
	// multiplied by the cart quantity
	shippingQuantityRate: 0,

	// added shipping based on this value 
	// multiplied by the cart subtotal
	shippingTotalRate: 0,

	// tax rate applied to cart subtotal
	taxRate: 0,

	// true if tax should be applied to shipping
	taxShipping: false,


	// event callbacks 
	beforeAdd			: null,
	//afterAdd			: null,
	load				: null,
	beforeSave		: null,
	afterSave			: null,
	update			: null,
	ready			: null,
	checkoutSuccess	: null,
	checkoutFail		: null,
	beforeCheckout		: null,
        beforeRemove           : null
});

$( document ).ready(function() {
$( ".order" ).click(function() {

    if($(".itemRow").length == 0) {
     alert("Search and add photos to print")
 }else{
location.href= "http://crhm2015.inkfly.in/print.php";
 }
 });
simpleCart.bind( "afterAdd" , function( item ){
$( ".simpleCart_items" ).prepend( '</br><p class="alert alert-success">You have added the following photos, you can also search and add more than one bib no. Cick Print Orders once done</p>' );
$( ".simpleCart_items" ).focus();
$('html, body').animate({
        scrollTop: $(".order").offset().top
    }, 2000);
});

simpleCart.bind( 'beforeAdd' , function( item ){
  if( item.get( 'size' ) == '4x6' ){
    item.price( 50 );
  } else if( item.get( 'size' ) == '8x12' ){
    item.price( 100 );
  } else if( item.get( 'size' ) == '12x18' ){
    item.price( 150 );
  } else if( item.get( 'size' ) == 'Coffe Mug' ){
    item.price( 300 );
  } 

});
simpleCart.currency({
    code: "Rs" ,
    name: "Indian Rupees" ,
    symbol: "Rs " ,
    accuracy: 0
});

simpleCart.bind( 'beforeCheckout',function( data ){
data.first_name = document.getElementById("first_name").value;
data.email = document.getElementById("email").value;
data.phone = document.getElementById("phone").value;
data.address = document.getElementById("address").value;
});

$( "#tags" ).click(function() {
$("#inputtext").val(this.val());
$("#inputbutton").click();   
 });

});



