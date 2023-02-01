const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitles = async () => {
    try {
        const response = await        axios.get('https://www.imdb.com/search/title/?groups=top_100&sort=user_rating,desc');

        const html = response.data;

        const $ = cheerio.load(html);

        const titles = [];

        $('#main > div > div.lister.list.detail.sub-list > div > div > div.lister-item-content > h3 > a').each((_idx, el) => {
            const title = $(el).text()
            titles.push(`${_idx +1} : ${title}`)
        });

        return titles;
    } catch (error) {
        throw error;
    }
};

fetchTitles().then((titles) => console.log(titles));