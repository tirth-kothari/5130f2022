const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    console.log("test 1")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("test 2")
    await page.goto(url, {waitUntil: 'networkidle0'});
    console.log("test 3")

    var container = await page.evaluate(() => { 
        
      //    page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
        var titleNodeList = document.querySelectorAll(`.product-link`);
        var priceNodeList = document.querySelectorAll(`.price`);
        var promoNodeList = document.querySelectorAll(`.stars`);
        var imgNodeList = document.querySelectorAll(`.img-link`);
        var hrefNodeList = document.querySelectorAll(`.red-btn height-each-btn`);
        var titleLinkArray = [];
        var id = 0;
        if (promoNodeList.length == titleNodeList.length) {
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "BJs",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        promo: promoNodeList[i].innerHTML.trim(),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://bjs.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        }
        else{
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "BJs",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://bjs.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        } console.log(titleLinkArray)
        return titleLinkArray;
    });
    await browser.close();
    return container;
}

var BJs = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'%20');
    new_url = 'https://www.bjs.com/search/'+details+'/q?template=clp';
    //console.log(new_url);
    //https://www.bjs.com/search/tv/q?template=clp
    var result = await scrapeProduct(new_url);
    return result;
}

module.exports ={
    BJs
}

