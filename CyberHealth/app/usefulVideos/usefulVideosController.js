var commonApp = angular.module('commonApp', ['ngRoute','oc.lazyLoad','requestModule','flash','ngAnimate']);

commonApp.controller('UsefulVideosController',function($scope,requestHandler,Flash) {

    $scope.doGetVideo=function(id,autoplay){
        $scope.videoLink = $scope.videoList[id];
        $scope.code = $scope.videoLink.code;
        $scope.autoplay=autoplay;
        $("html, body").animate({ scrollTop: 0 }, "slow");
    };

    $scope.videoList=[
        {
            "title":"Tips for Starting a Healthy Lifestyle!",
            "code":"0aNNYEUARAk",
            "image":"https://i.ytimg.com/vi/0aNNYEUARAk/mqdefault.jpg",
            "description":"Eating well and exercising is something we do for a few days or a couple of weeks before reverting back to old, and generally, poor health habits. Taking a different look at your own nutrition, weight and physical activity habits is the ultimate secret to getting healthy and keeping your weight under control for good. To kick-start this positive-health mind shift, try viewing healthy eating and moving your body as non-negotiable daily habits."+"<br/><br/><strong>"+"Pick a reasonable eating plan"+"</strong><br/><br/>"+"All you need is a guide, something you can easily follow without checking on a list of forbidden food and special instructions each time you want to have a meal. Calorie counting will only stress you out and make you feel miserable every time you bite into anything edible. What you want is something you can maintain your whole life, not just for a month or two. Eating reasonably and mindfully will very soon become the norm if the terms are minimal. Think of it this way, high value foods have to be earned - candy, baked goods, sodas. Just because you want to lead a healthy lifestyle it doesn"+"&#39;"+"t mean you can never touch any of it ever again, it only means that they can no longer be on your daily menu, better things should. Real food is usually the way to go, cooked food with the fewest ingredients possible. Homemade and fresh is what you want."
        },
        {
            "title":"How To Use Green Tea For Weight Loss",
            "code":"wyVOHavaT7U",
            "image":"https://i.ytimg.com/vi_webp/wyVOHavaT7U/mqdefault.webp",
            "description":"Green tea is the healthiest beverage on the planet. It is loaded with antioxidants and various substances that are beneficial for health. Many studies have shown that green tea can increase fat burning and help you lose weight. Green tea is more than just hot, flavored water. The bioactive substances in the tea leaves dissolve in the water and make it into the final drink. When you drink a cup of quality tea, you are actually getting a large amount of beneficial substances with potent biological effects. The best known of these is caffeine. A cup of green tea contains caffeine (24-40 mg) than a cup of coffee (100-200 mg), but still enough to have a mild effect. The most important of these is EGCG a substance that can boost metabolism. Keep in mind that these benefits can be derived both from drinking green tea as a beverage, as well as taking green tea extract as a supplement."
        },
        {
            "title":"Escape - The benefits of jogging",
            "code":"264yywf8mSc",
            "image":"https://i.ytimg.com/vi_webp/QY8RJBxbLnA/mqdefault.webp",
            "description":"Jogging is a form of moderate-intensity aerobic exercise that provides you with many physical, mental and even social benefits. Some of the benefits of jogging won"+"&#39;"+"t show up for weeks, while other benefits can be enjoyed more quickly. Before you start a new jogging program, speak to your doctor to make sure you proceed in a way that's best for you. Jogging or running is a popular form of physical activity. About one in five Australians try running (or jogging) at some stage in their life. Running is an appealing exercise because it doesn"+"&#39;"+"t cost a lot to take part and you can run at any time that suits you. The difference between running and jogging is intensity. Running is faster, uses more kilojoules and demands more effort from the heart, lungs and muscles than jogging. Running requires a higher level of overall fitness than jogging. Both running and jogging are forms of aerobic exercise. Aerobic means with oxygen - the term aerobic exercise means any physical activity that produces energy by combining oxygen with blood glucose or body fat."
        },
        {
            "title":"Yoga for Complete Beginners - Yoga Class 20 Minutes",
            "code":"0o0kNeOyH98",
            "image":"https://i.ytimg.com/vi_webp/0o0kNeOyH98/mqdefault.webp",
            "description":"Yoga was brought to the West by the Indian gurus in the late 19th and early 20th century, where it was eagerly embraced for its health, emotional and spiritual benefits. There are many different styles of yoga, some more physical than others. The most well known types include Hatha, Ashtanga, Kundalini, Raja and Tantric yoga. People usually choose one depending on their needs, physical abilities and preferences. Yoga is often associated with a set of postures, but there is much more to it, including the specific theory about the human physiology, which involves the study of energy channels and energy centers or chakras. We have two types of autonomic nervous system: the sympathetic nervous system (SNS) and the parasympathetic nervous system (PNS). The first is responsible for the fight or flight reaction, while the latter deals with the rest and digest setting of the body. In other words, the SNS concerns stress, while the PNS is all about relaxation. In these busy, competitive, demanding and alienating times, the SNS is the one working overtime, while the PNS doesn"+"&#39;"+"t get activated as often as it should, if we are to have a balanced body and mind. When you do yoga, the PNS gets woken up, which results in the blissful feelings of relaxation. Physiologically speaking, the PNS lowers blood pressure, slows the heart rate and redirects blood toward the digestive system. Basically, it takes care of those parts of the body which are neglected when the SNS is in charge."
        },
        {
            "title":"Total Body Stretch - Flexibility Exercises for the Entire Body",
            "code":"KJaWIBg15n0",
            "image":"https://i.ytimg.com/vi_webp/KJaWIBg15n0/mqdefault.webp",
            "description":"<div>"+"Stretching is an important part on any exercise plan. Stretching is good for both aerobic fitness enthusiasts and weightlifters. It improves your range of motion, decreases your risk for injury, and improves the workout as a whole. Why is stretching important? If you do not have the proper range of motion required for a repetitive sport, such as running, sooner or later you will likely end up with an overuse injury. And, if you don"+"&#39;"+"t have the proper range of motion for a particular weightlifting exercise, you will over-compensate, lose form, and set yourself up for injury. Here are 5 guidelines for stretching."+"</div><br/><div><ul><li>"+"<strong>"+"Step 1 : "+"</strong>"+" Warm-up before you perform any stretching exercises. Do not stretch cold muscles."+"</li><li>"+"<strong>"+"Step 2 : "+"</strong>"+"Focus on the target muscle involved in the stretch. Relax the target muscle, and minimize the movement of the rest of your body. Do not tense up or contract the muscle being stretched."+"</li><li>"+"<strong>"+"Step 3 : "+"</strong>"+"Hold stretching exercises for 10 to 60 seconds. Do not bounce into or out of the stretch."+"</li><li>"+"<strong>"+"Step 4 : "+"</strong>"+"Stretch to the limit of movement. Do not stretch to the point of pain."+"</li><li>"+"<strong>"+"Step 5 : "+"</strong>"+" Breathe slowly and rhythmically throughout the stretch. Do not hold your breath at any point during the stretch."+"</li></ul></div>"
        },
        {
            "title":"The Benefits and Advantages of Eating Healthy Food",
            "code":"bcaxvt1HFf0",
            "image":"https://i.ytimg.com/vi/bcaxvt1HFf0/mqdefault.jpg",
            "description":"One should never underestimate the importance of eating healthy food. There are so many benefits but why are there so many people still not eating right? Why has obesity and heart diseases become such a huge factor? Although the statistics are clear, people still refuse to change their life styles. Eating healthy food may become a struggle, especially when there are so many fast food restaurants everywhere we turn. Often people make excuses like they don"+"&#39;"+"t have time to get healthy food, it"+"&#39;"+"s not that accessible, or that they don"+"&#39;"+"t know how to prepare it. However there are just as many supermarkets that stock fresh produce as there are fast foods outlets, so accessibility is a poor excuse. The benefits of eating a healthy diet include living a longer life, feeling happier, gaining vitality, weight loss, and a healthy appearance. Processed food decrease the quality of our lives, so eating healthy food means we can better fight diseases and live longer. When it comes to happiness, studies have shown that eating healthy foods is an excellent natural anti-depressant. When you eat healthy your energy levels tend to rise. You will not only feel healthier but will look healthier sometimes it is not enough just to eat an apple a day. To really gain the benefits of eating healthy foods you need to plan an entire healthy diet and stick to it. Drinking a smoothie in the morning is a good healthy option. Don not over eat just eat enough to sustain your energy. At last drink loads of water."
        },
        {
            "title":"Benefits of Being Healthy",
            "code":"91jxK5CsMT4",
            "image":"https://i.ytimg.com/vi/91jxK5CsMT4/mqdefault.jpg",
            "description":"Benefits of being healthy are both physiological and psychological. Some of the benefits of being healthy include boosting your metabolism to help burn fat, it can assist in decreasing your risk of heart disease and certain cancers, it helps to stop bone density loss, it can help with overcoming depression, increase your confidence levels, boost self esteem, allows more rest on less sleep. Overall being healthy can improve your quality of life in every aspect, physically, mentally and socially. Nutritious foods improve health and promote weight loss, but the benefits don"+"&#39;"+"t stop there. Here are few hidden perks of healthy eating that don"+"&#39;"+"t always get the attention they deserve."+"<br/><br/><strong>"+"Less stress"+"</strong><br/><br/>"+"Omega-3 fatty acids protect against spikes in stress hormones, such as cortisol. Vitamin C has been shown to reduce these hormones while protecting the immune system. Magnesium, found in nuts and spinach, helps to keep stress at manageable levels. Black tea has been shown to reduce cortisol after stressful events making it easier for you to recover."+"<br/><br/><strong>"+"Flatter belly"+"</strong><br/><br/>"+"Sodium, carbonation, constipation, and excess air (due to eating too fast) can all lead to a bloated belly. A healthy diet that limits sodium and high-sugar carbonated drinks promotes a flatter stomach. High-fiber foods (such as fruits, vegetables, and whole grains) reduce constipation. Slower eating not only makes you more mindful of what you are putting into your mouth, but it also reduces the excess air you swallow that leads to bloating."+"<br/><br/><strong>"+"Better employee"+"</strong><br/><br/>"+"Healthy foods boost your brain power, and this means increased productivity at the office. Leafy greens contain antioxidants to protect brain cells from the damage causing cognitive decline. Omega-3 fatty acids are associated with improved concentration and mental alertness. The better your focus and attitude, the more effective you will be at work."
        },
        {
            "title":"One Simple Tip to Increase the SPEED of Your Punches",
            "code":"ahB_iaQTqEI",
            "image":"https://i.ytimg.com/vi_webp/ahB_iaQTqEI/mqdefault.webp",
            "description":"A good fighter is one who can hit his opponent quicker, harder, without much perceptible effort, and yet avoid being hit. He doesn"+"&#39;"+"t only possess a pair of fast hands and feet and quick body movement, but he has other qualities such as non-telegraphic moves, good coordination, perfect balance and keen awareness. Although some people are endowed with a few of these qualities, most of these attributes are developed through hard training. All the strength or power you have developed from your training is wasted if you are slow and can"+"&#39;"+"t make contact. Power and speed go hand-in-hand. A fighter needs both to be successful. One immediate way to increase your speed at impact is to "+"&#34;"+"snap"+"&#34;"+" or "+"&#34;"+"whip"+"&#34;"+" your hand just before contact. It is the same principle as the overhand throw. For example, if you throw a baseball with a full swing and snap your wrist at the last moment or the tail end of your swing, the ball will have more velocity than without the snap. Naturally, the longer swing with a snap will have more acceleration at the end than a shorter swing with a snap. To have speed and snap in your punching, your muscles and tendons need to be loose and explosive, one quick way to achieve this applying Tendon Warming Liniment on your wrists, elbows, shoulders and triceps prior to stretching and working out, this creates a explosive snap in your punching."
        },
        {
            "title":"How To Gain Weight And Build Muscle Mass Fast And Naturally",
            "code":"fObDpfJBl0k",
            "image":"https://i.ytimg.com/vi_webp/fObDpfJBl0k/mqdefault.webp",
            "description":"Do you need to put on a few pounds to make a sports team, better your health, or simply to bulk up? Most people are out to lose weight, but you can reverse some basic dieting principles to gain some girth. However, many people do not realize how difficult it can be to gain weight quickly. Luckily, gaining weight is fairly intuitive and need not be strenuous or expensive; some basic calculations and lifestyle changes can garner impressive results. When you want to gain both weight and muscle mass, you will need to make dietary and exercise changes to help you reach your long-term goals. Choosing healthier foods and performing the right types of exercises can help you gain weight safely and build more lean muscle mass. You do not want to gain an unhealthy amount of weight or use unhealthy foods to help support your weight gain. Having the right combination of calories and exercise will help you gain weight safely and build muscle mass. Before you begin a new workout regimen or try a drastically different diet, you need to meet with a doctor to discuss your health. Talk to her about why you want to gain weight and muscle mass, and tell her about the kinds of things you"+"&#39;"+"re going to change in your lifestyle. Ask your physician what a safe amount of weight gain is for your age and gender. Gaining too much weight could put your body weight into an overweight category."
        },
        {
            "title":"How To Grow Your Height In Just 1 Week",
            "code":"cx4BxU9n9dc",
            "image":"https://i.ytimg.com/vi_webp/cx4BxU9n9dc/mqdefault.webp",
            "description":"Many short people tend to be disappointed with their heights because a tall stature can be a desirable trait for many reasons. Even if you don"+"&#39;"+"t have a specific reason for increasing your height, being tall provides many advantages. It can boost your confidence, save you from wearing uncomfortable high heels, or simply make it easier to reach that top shelf without having to climb onto a wobbly stool. A person"+"&#39;"+"s height is determined to a great extent by genetics, but it is not necessarily the only determinant. There is a hormone in the body known as "+"<strong>"+"Human Growth Hormone (HGH)"+"</strong>"+" that regulates height. HGH is produced by the pituitary gland and is highly essential for the growth of long bones and cartilage. Several other factors play a key role in determining height, such as smoking during pregnancy, poor post-natal care, low birth weight and poor health during childhood. Exercise and sports stimulate the release of growth hormone that contributes to your height. To enjoy good height, you must exercise regularly and take part in sports activities. One good exercise to increase height is skipping where you need to jump a lot. Do skipping for at least 30 minutes each day in an open area. Holding on to a horizontal bar and hanging with your spine stretched out is another effective exercise to facilitate height gain. Stay in the position for 10 seconds and repeat at least six times daily. Plus, play games like tennis and basketball that require you to jump a lot. This will help increase your height and also help in maintaining ideal body weight. Also indulge in outdoor activities, like cycling and swimming, on a regular basis to enjoy good height and a toned body."
        },
        {
            "title":"How to Tighten Excess Skin After Weight Loss",
            "code":"MTr299XffoI",
            "image":"https://i.ytimg.com/vi/MTr299XffoI/mqdefault.jpg",
            "description":"In addition to being one of your visible organs, the skin is also the largest. So it should come as no surprise that most individuals want to keep your skin looking its best. Unfortunately, skin can occasionally become loose and sag, often as a result of sudden weight loss. While some individuals may turn to surgery when it comes to getting rid of loose skin, this doesn"+"&#39;"+"t necessarily have to be the case. In fact, making changes to your diet and exercise routines can help you treat this condition without going under the knife. According to the American College of Sports Medicine, weight lifting can be effective when it comes to increasing muscle size, "+"&#34;"+"filling out"+"&#34;"+" loose skin, and reversing the appearance of sagging. Be sure to choose exercises that target muscle groups in problem areas. Those who want to get rid of loose skin on their chest should perform pushups, chest flyes or dumbbell chest presses. Perform two or three sets of 10 to 15 repetitions of these exercises for optimal results when it comes to getting rid of loose skin. Be sure to talk with your healthcare provider before starting an exercise program to ensure you are healthy enough for physical activity."
        }
    ];

    // Display User Instruction details On Page Load
    $scope.doGetVideo(0,0);

});

// html filter (render text as html)
commonApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

// url filter
commonApp.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

commonApp.directive('myYoutube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'=',
                 autoplay:'='
        },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function (scope) {
            scope.$watch('code',function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/v/" + newVal+"?autoplay="+scope.autoplay);
                }
            });
        }
    };
});