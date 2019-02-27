const TelegramBot = require('node-telegram-bot-api');
var request = require("request");
var requrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
      //eboty
//const token = '616200557:AAFZQGmBwSDWkVWGYfMwt1ZZ_oLvsumYFbw';
//xrbot
const token = '696340092:AAE78wI2zTBZZ9ruTdvYZWwQm-uGjfnxpyA'

const bot = new TelegramBot(token ,{polling: true});
const http = require('http');
const meteoId = 'fafb99a0ac531b9d9e2e48dce7aed4c8';
const videoToken = 'AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc';

//let apiKey = 'fafb99a0ac531b9d9e2e48dce7aed4c8';


bot.onText(/\/echo (.+)/, (msg, match) => {
  

  const chatId = msg.chat.id;
  const resp = match[1]; 

 
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/image/, (msg) => {
  const chatId = msg.chat.id;
  //const resp = match[1]; 
  const url = 'https://telegram.org/img/t_logo.png';
  bot.sendPhoto(msg.chat.id,"https://telegram.org/img/t_logo.png")
  //console.log(msg);

});

bot.on('message', (msg) => {
    
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) 
  {

    bot.sendMessage(msg.from.id, "Hello  " + msg.from.first_name, msg.from.last_name);
  } 
      
});
bot.onText(/\/meteo (.+)/, (msg, match)=>{
  const chatId = msg.chat.id;
  const city = match[1]?match[1]:"";
  bot.sendMessage(chatId,"city :"+ city);
  
  http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&lang=it&APPID=' + meteoId, (res) =>{
  let rawDat = '';
  res.on('data', (chunck) => {rawDat += chunck; 
  });
  res.on('end', () =>{
      try{
        const parsedData = JSON.parse(rawDat)
        var messages = [];
        parsedData.weather.forEach(function(value){
          messages.push("Meteo: "+ value.description);
        })
        messages.push(""+parsedData.main);
        //messages.push(""+parsedData.description);
        messages.push("Temperatura: "+parsedData.main.temp + "°C")
        messages.push("Vento: "+parsedData.wind.speed+ "m/s");
        messages.push("Location "+parsedData.sys.country);
        messages.push("Humidity "+parsedData.main.humidity);
        messages.push("lon :"+parsedData.coord.lon);
        messages.push("lat :"+parsedData.coord.lat);
       //bot.sendPhoto(chatId, parsedData.icon);
        
        bot.sendMessage(chatId, messages.join("\n"));
      }catch (e){
          bot.sendMessage(chatId, "errore:"+e.messages);
      }
  });
  }).on('error', (e) =>{
    bot.sendMessage(chatId, "errore:"+e.messages);

  });

});
bot.onText(/\/vidtest (.+)/, (msg, match)=>{
  const chatId = msg.chat.id;
  const city = match[1]?match[1]:"";
  bot.sendMessage(chatId,"city :"+ city);
  
  http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+city+'&maxResults=25&key=' + videoToken, (res) =>{
  let rawDat = '';
  res.on('data', (chunck) => {rawDat += chunck; 
  });
  res.on('end', () =>{
      try{
        const parsedData = JSON.parse(rawDat)
        var messages = [];
        parsedData.weather.forEach(function(value){
          messages.push("abcdefg: "+ value.kind);
        })
        //messages.push(""+parsedData.main);
        //messages.push(""+parsedData.description);
        //messages.push("Temperatura: "+parsedData.main.temp + "°C")
        //messages.push("Vento: "+parsedData.wind.speed+ "m/s");
        //messages.push("Location "+parsedData.sys.country);
        //messages.push("Humidity "+parsedData.main.humidity);
        //messages.push("lon :"+parsedData.coord.lon);
        //messages.push("lat :"+parsedData.coord.lat);
       //bot.sendPhoto(chatId, parsedData.icon);
        
        bot.sendMessage(chatId, messages.join("\n"));
      }catch (e){
          bot.sendMessage(chatId, "errore:"+e.messages);
      }
  });
  }).on('error', (e) =>{
    bot.sendMessage(chatId, "errore:"+e.messages);

  });

});
bot.onText(/\/ab (.+)/, (msg, match)=>{

  const chatId = msg.chat.id;
  const resp = match[1]; 

 
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/image/, (msg) => {
  const chatId = msg.chat.id;
  //const resp = match[1]; 
  const url = 'https://telegram.org/img/t_logo.png';
  bot.sendPhoto(msg.chat.id,"https://telegram.org/img/t_logo.png")
  //console.log(msg);

});

bot.on('message', (msg) => {
    
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) 
  {

    bot.sendMessage(msg.from.id, "Hello  " + msg.from.first_name, msg.from.last_name);
  } 
      
});

var videoSrc = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
var yttoken = "&maxResults=5&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";

bot.onText(/\/video (.+)/, (msg, match)=>{
  const chatId = msg.chat.id;
  var watchURL= "https://www.youtube.com/watch?v=";
var channelURL = "https://www.youtube.com/channel/"
  //const video = match[1]?match[1]:"";
  const video = match[1];
  var finalURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+video+yttoken;
  bot.sendMessage(chatId,"search :"+ video);
  request(finalURL, function(error,response,body){

    var jsonitem = JSON.parse(body);
    var length = jsonitem.items.length;
    

    bot.sendMessage(chatId,"Your Nation :"+jsonitem.regionCode);
    bot.sendMessage(chatId,"Total Results :"+jsonitem.pageInfo.totalResults);

    for(var i=0;i<length;i++)
    {
      bot.sendMessage(chatId,"Result "+i);
      bot.sendMessage(chatId,"Title :"+jsonitem.items[i].snippet.title)
      bot.sendMessage(chatId,"Channel :"+jsonitem.items[i].snippet.channelTitle)
      //bot.sendMessage(chatId,jsonitem.items[i].snippet.thumbnails.high.url)
    //console.log(json.items[0].id.channelId)
    //console.log(json.items[0].id.videoId)
    if(jsonitem.items[i].id.kind == "youtube#video")
    {
      bot.sendMessage(chatId,watchURL+jsonitem.items[i].id.videoId);
    }
   if(jsonitem.items[i].id.kind == "youtube#channel")
    {
      bot.sendMessage(chatId,channelURL+jsonitem.items[i].id.channelId)
    }
    
    }
  });
  
  /*http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+video+'&maxResults=25&key=' + videoToken, (res) =>{
    let rawDat = '';
  const parsedData = JSON.parse(rawDat)
  bot.sendMessage(""+parsedData.pageInfo.totalResults)

  res.on('data', (chunck) => {rawDat += chunck; 
  });
  res.on('end', () =>{
      try{
        const parsedData = JSON.parse(rawDat)
        var messages = [];
        parsedData.items.forEach(function(value){
          messages.push("results: "+ value.description);
        })
        messages.push("Results :"+parsedData.pageInfo.totalResults);
        messages.push("Results :"+parsedData.kind);
        //messages.push(""+parsedData.main);
        //messages.push(""+parsedData.description);
        //messages.push("Temperatura: "+parsedData.main.temp + "°C")
        //messages.push("Vento: "+parsedData.wind.speed+ "m/s");
        //messages.push("Location "+parsedData.sys.country);
        //messages.push("Humidity "+parsedData.main.humidity);
        //messages.push("lon :"+parsedData.coord.lon);
        //messages.push("lat :"+parsedData.coord.lat);
       //bot.sendPhoto(chatId, parsedData.icon);
        
        bot.sendMessage(chatId, messages.join("\n"));
      }catch (e){
          bot.sendMessage(chatId, "errore:"+e.messages);
      }
      */
 
  //const parsedData = JSON.parse(rawDat)
 
 /* bot.sendMessage("total results :"+parsedData.pageInfo.totalResults);

  }).on('error', (e) =>{
    bot.sendMessage(chatId, "errore:"+e.messages);

  });*/

});
bot.onText(/\/pewdiepieVS/, (msg) =>{
  var pewURL = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=pewdiepie&fields=items/statistics/subscriberCount&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";
  var tseriesURL ="https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=tseries&fields=items/statistics/subscriberCount&key=AIzaSyC3hobIG7uMMPwGv2qIlNYlwfhJVoDGXJc";
  const chatId = msg.chat.id;
  request(pewURL, function(error,response,body){
    var json = JSON.parse(body);
    request(tseriesURL, function(error,response,body){

    var jsonT = JSON.parse(body)
   
    var tseries = jsonT.items[0].statistics.subscriberCount;
    var pewdiepie = json.items[0].statistics.subscriberCount;

    var difference = pewdiepie - tseries;
      console.log(error);
    bot.sendMessage(chatId,"T-Series "+jsonT.items[0].statistics.subscriberCount);   
    bot.sendMessage(chatId,"pewdiepie "+json.items[0].statistics.subscriberCount)
    bot.sendMessage(chatId,"difference "+difference);
    if(pewdiepie > tseries)
    {
      bot.sendMessage(chatId,"pewdiepie is winning! ");
    }else
    {
      bot.sendMessage(chatId,"T-Series is winning! ");
    }
});

bot.onText(/\/Location/, (msg) =>{

  
     bot.sendLocation(msg.chat.id, msg.location.latitude, msg.location.longitude, {live_period: 86400,});
  //bot.sendMessage(msg.chat.id, "this " + [msg.location.longitude,msg.location.latitude].join(";"))
  
  //const lat = msg.location.latitude;
 // const long = msg.location.longitude;
  //bot.sendLocation(msg.chat.id,long,lat);
 // bot.sendMessage(msg.chat.id, "you are here!");

});


bot.onText(/\/Keyb/, (msg) => {
    
bot.sendMessage(msg.chat.id, "Hey!", {
"reply_markup": {
    "keyboard": [["/Location", "Hi"],   ["/image"], ["/Hi "+msg.from.first_name+msg.from.last_name]]
    }
});
    
});














//bot.on('message', (msg) => {
 // const chatId = msg.chat.id;

  //bot.sendMessage(chatId,'aa')
  //bot.on("polling_error", (err) => console.log(err));
  //if (msg.text && msg.text.toString().toLowerCase().includes("abc")) {
    // ...
  //  }
//console.log(msg);
 
//  bot.sendMessage(chatId, 'HeyHeyHeey');
//});
  });
});