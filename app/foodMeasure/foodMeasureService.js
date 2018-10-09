var commonApp=angular.module('foodMeasureModule',[]);

commonApp.service("FoodMeasureService",[function(){

    var foodMeasures=[
        { name:"Cup", url:"https://cdn.cyberhealths.com/Application/cup.png" },

        { name:"Bowl", url:"https://cdn.cyberhealths.com/Application/bowl.jpg" },

        { name:"Katori", url:"https://cdn.cyberhealths.com/Application/katori.jpg" },

        { name:"Bottle", url:"https://cdn.cyberhealths.com/Application/bottle.jpg"},

        { name:"Glass", url:"https://cdn.cyberhealths.com/Application/glass.jpeg"},

        { name:"Can", url:"https://cdn.cyberhealths.com/Application/can.jpg" },

        { name:"Jar", url:"https://cdn.cyberhealths.com/Application/jar.jpg" },

        { name:"Pan", url:"https://cdn.cyberhealths.com/Application/pan.png" },

        { name:"Quart", url:"https://cdn.cyberhealths.com/Application/quart.jpg" },

        { name:"Scoop", url:"https://cdn.cyberhealths.com/Application/scoop.jpg" },

        { name:"TableSpoon", url:"https://cdn.cyberhealths.com/Application/tablespoon.jpg" },

        { name:"TeaSpoon", url:"https://cdn.cyberhealths.com/Application/teaspoon.jpg"},

        { name:"Tin", url:"https://cdn.cyberhealths.com/Application/tin.jpeg" },

        { name:"Tray", url:"https://cdn.cyberhealths.com/Application/tray.jpg" },

        { name:"Container", url:"https://cdn.cyberhealths.com/Application/container.jpg" },

        { name:"Pint", url:"https://cdn.cyberhealths.com/Application/pint.jpg"}

    ];
    this.doGetMeasures=function(){
        return foodMeasures;
    }
}]);