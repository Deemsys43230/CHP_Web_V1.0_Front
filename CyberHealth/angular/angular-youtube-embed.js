angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(a,b){function c(a,b){return a.indexOf(b)>-1}function d(){b.$apply(function(){e.ready=!0})}var e={},f=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,g=/t=(\d+)[ms]?(\d+)?s?/;return e.getIdFromURL=function(a){var b=a.replace(f,"$1");if(c(b,";")){var d=b.split(";");if(c(d[1],"%")){var e=decodeURIComponent(d[1]);b=("http://youtube.com"+e).replace(f,"$1")}else b=d[0]}else c(b,"#")&&(b=b.split("#")[0]);return b},e.getTimeFromURL=function(a){a=a||"";var b=a.match(g);if(!b)return 0;var d=b[0],e=b[1],f=b[2];return"undefined"!=typeof f?(f=parseInt(f,10),e=parseInt(e,10)):c(d,"m")?(e=parseInt(e,10),f=0):(f=parseInt(e,10),e=0),f+60*e},e.ready=!1,"undefined"==typeof YT?a.onYouTubeIframeAPIReady=d:YT.loaded?e.ready=!0:YT.ready(d),e}]).directive("youtubeVideo",["youtubeEmbedUtils",function(a){var b=1,c={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},d="youtube.player.";return{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(e,f,g){function h(){var a=Array.prototype.slice.call(arguments);e.$apply(function(){e.$emit.apply(e,a)})}function i(a){var b=c[a.data];"undefined"!=typeof b&&h(d+b,e.player,a),e.$apply(function(){e.player.currentState=b})}function j(a){h(d+"ready",e.player,a)}function k(a){h(d+"error",e.player,a)}function l(){var a=angular.copy(e.playerVars);a.start=a.start||e.urlStartTime;var b=new YT.Player(n,{height:e.playerHeight,width:e.playerWidth,videoId:e.videoId,playerVars:a,events:{onReady:j,onStateChange:i,onError:k}});return b.id=n,b}function m(){(e.videoId||e.playerVars.list)&&(e.player&&"function"==typeof e.player.destroy&&e.player.destroy(),e.player=l())}e.utils=a;var n=g.playerId||f[0].id||"unique-youtube-embed-id-"+b++;f[0].id=n,e.playerHeight=e.playerHeight||390,e.playerWidth=e.playerWidth||640,e.playerVars=e.playerVars||{};var o=e.$watch(function(){return e.utils.ready&&("undefined"!=typeof e.videoUrl||"undefined"!=typeof e.videoId||"undefined"!=typeof e.playerVars.list)},function(a){a&&(o(),"undefined"!=typeof e.videoUrl?e.$watch("videoUrl",function(a){e.videoId=e.utils.getIdFromURL(a),e.urlStartTime=e.utils.getTimeFromURL(a),m()}):"undefined"!=typeof e.videoId?e.$watch("videoId",function(){e.urlStartTime=null,m()}):e.$watch("playerVars.list",function(){e.urlStartTime=null,m()}))});e.$watchCollection(["playerHeight","playerWidth"],function(){e.player&&e.player.setSize(e.playerWidth,e.playerHeight)}),e.$on("$destroy",function(){e.player&&e.player.destroy()})}}}]);