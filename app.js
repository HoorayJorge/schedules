const axios = require("axios");
const tables2json = require("tables2json");
const dJSON = require('dirty-json');
const moment = require("moment");

async function foo(){
    return await axios.get('https://www.mattsarzsports.com/Schedule/WeeklyText/football2022/5');
}

foo().then(result => {

    //get the html
    html = result.data;

    //parse and clean the html into json
    const tables = tables2json.one(html);
    const dirty_string = JSON.stringify(tables)
    const clean_json = JSON.parse(dirty_string.replace(/\\n/g, ''));

    //TODO: Un-hard code the headers
    //var headers = []
    //clean_json['headers'].forEach(function (value, i){
    //    headers.push(clean_json['headers'][i]);
    //});

    //declare the objects for building json
    let data = []
    let game = {}

    //restructure json into game objects
    clean_json['rows'].forEach(function (value){
        game = {
            'matchup' : value[1],
            'network' : value[2],
            'time' : moment(value[4]).unix()
        };
        data.push(game);
    });

    //trace print
    console.log(data);
});
