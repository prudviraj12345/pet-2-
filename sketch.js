//Create variables here
var dog;
var dogimg,happyDog;
var database;
var foods,foodstock;
var lastFed;
var foodobject;

function preload()
{
  //load images here
  dogimg = loadImage("dogimg.png")
  happyDog = loadImage("dogimg1.png")
}

function setup() {
  createCanvas(1000, 800);
  database = firebase.database();

  dog = createSprite(400,400,20,20);

 var foodstock = database.ref("food");
 foodstock.on("value",readstock)

  
 var  feed = createButton("feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog)


 var addFood = createButton("add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);


 foodobject = new Food()







  
}


function draw() {  

  //add styles here
  background("black");
  foodobject.display()


 fedTime = database.ref('feedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 });




 fill(255)
 if(lastFed>=12){
     text("lastFed:"+lastFed%12 +"PM ", 350,30);
 }
   else if(lastFed==0){
       text("last Feed:12 AM",350,30);
   }
     else{
         text("last Feed:"+lastFed+"AM",350,30);
     }






  



 dog.addImage(dogimg)

 dog.scale = 0.2;

 
  //if(keyWentDown(UP_ARROW)){

   // writeStock(foods);
   // dog.addImage(doghappy);
  
  
  
  
 //}




  drawSprites();

}

function readstock(data){

  foods = data.val();
}

function writeStock(x){
 if(x<=0){
   x = 0
 }
 else{
 x = x-1

 }
 database.ref('/').update({
   food:x
 })

 }




 function feedDog(){

  dog.addImage(happyDog);
 
 
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
  database.ref('/').update({
 
     food:foodobject.getFoodStock(),
     FeedTime:hour()
 
  })
 
    }
  function addFoods(){
      
   foods++
   database.ref('/').update({
 
    food:foods
 
   })
  
 
 
  }
 
 

