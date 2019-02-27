var request = require("request");
var requrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=pewdiepie&maxResults=10&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";

var watchURL= "https://www.youtube.com/watch?v=";
var channelURL = "https://www.youtube.com/channel/"
var res = "totalResults:"
request(requrl, function(error,response,body){
//var json = JSON.parse(body);
//var videoId = json.items[0].id.videoId;
  /*  console.log("your nation "+json.regionCode);
    console.log("total results "+json.pageInfo.totalResults);
    console.log("Title "+json.items[0].snippet.title)
    console.log("Channel "+json.items[0].snippet.channelTitle)
    console.log(json.items[0].snippet.thumbnails.high.url)
    //console.log(json.items[0].id.channelId)
    //console.log(json.items[0].id.videoId)
    if(json.items[0].id.kind == "youtube#video")
    {
        console.log(watchURL+videoId);
    }
    else if(json.items[0].id.kind == "youtube#channel")
    {
        console.log(channelURL+json.items[0].id.channelId)
    }*/
    
   var jsonitem = JSON.parse(body);
   var length = jsonitem.items.length;
   console.log(length);
   console.log("your nation "+jsonitem.regionCode);
    console.log("total results "+jsonitem.pageInfo.totalResults);
    //console.log(json.items[1].snippet.title)
    //console.log(json.items[1].snippet.title)
    //console.log(json.items[2].snippet.title)
    //console.log(json.items[3].snippet.title)
    //console.log(error)
    //var jsonItems = JSON.parse(body.items);
    for(var i=0;i<length;i++){
        var videoId = jsonitem.items[0].id.videoId;
    //console.log(jsonitem.items[i].snippet.title);
    console.log("Result "+i);
    console.log("Title :"+jsonitem.items[i].snippet.title)
    console.log("Channel :"+jsonitem.items[i].snippet.channelTitle)
    console.log(jsonitem.items[i].snippet.thumbnails.high.url)
    //console.log(json.items[0].id.channelId)
    //console.log(json.items[0].id.videoId)
    if(jsonitem.items[i].id.kind == "youtube#video")
    {
        console.log(watchURL+jsonitem.items[i].id.videoId);
    }
   if(jsonitem.items[i].id.kind == "youtube#channel")
    {
        console.log(channelURL+jsonitem.items[i].id.channelId)
    }
    }
    
    //items.lenght
    for (var i=0;i < jsonitem.items[i].lenght;i++) 
    {
        //var playlistItem = jsonitem.items[i];

        console.log(jsonitem.items[i].snippet.title); 
        //console.log(jsonItems[i].kind)
        //alert(parsedJSON[i].Id);
     }
     //json.body.items.forEach(function(item,i){
       // for()
    // });
    //console.log(response)

   

});

var pewURL = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=pewdiepie&fields=items/statistics/subscriberCount&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";
var tseriesURL ="https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=tseries&fields=items/statistics/subscriberCount&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";
request(pewURL, function(error,response,body){
    var json = JSON.parse(body);
    request(tseriesURL, function(error,response,body){

    var jsonT = JSON.parse(body)
   
    var tseries = jsonT.items[0].statistics.subscriberCount;
    var pewdiepie = json.items[0].statistics.subscriberCount;

    var difference = pewdiepie - tseries;

    console.log("T-Series "+jsonT.items[0].statistics.subscriberCount);   
    console.log("pewdiepie "+json.items[0].statistics.subscriberCount)
    console.log("difference "+difference);
    if(pewdiepie > tseries)
    {
        console.log("pewdiepie is winning! ");
    }else
    {
        console.log("T-Series is winning! ");
    }
    });
});