//const prompt = require('prompt-sync')();
//var details = prompt('');
//const amaz = require('./scrapers_amazon.js');


//calls the amazon scraper js file to fetch and display the result
const amaz = require('./scrapers_amazon.js');

async function retrieve(que) {
    var final_data = [];
    var details = que.toLowerCase();
    // RUNNING IN PARALLEL MODE
    let [amazonResult] = await Promise.all([amaz.amazon(details)]);
    final_data = final_data.concat(amazonResult);

    // The below .replace code is a pipe which was used to remove the span tag issue which was displaying alongwith the price
    for (var i = 0; i < final_data.length; i++) {
        final_data[i]["id"] = eval(i + 1);
        var numeric_price = final_data[i]["price"];
        numeric_price = numeric_price.replace(/\D+/g, '');
        final_data[i]["numeric_price"] = parseInt(numeric_price, 10);
        rateBoolList = [];

        // used to fetch the rating if any
        for (var j = 1; j <= 5; j++) {
            if (j <= final_data[i]["rating"]) {
                rateBoolList.push(true);
            }
            else {
                rateBoolList.push(false);
            }
        }

        final_data[i]["rating_bool"] = rateBoolList;
    }
    //console.log(final_data);
    return final_data;
}

var main = async function (query) {
    // get the data (for the query passed) and store it in a variable
    var data = await retrieve(query);
    return data;
}
module.exports = {
    main
}