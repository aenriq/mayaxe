const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const queryNotionDB = async () => {
  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    let imgArr = [];
    for (let item of res.results) {
      let temp = new Array();
      for (let obj of item.properties.File.files) {
        // console.log(obj);
        temp.push(obj.file.url);
      }
      imgArr.push(temp);
    }
    return imgArr;
  } catch (err) {
    console.error(err);
    return err;
  }
};
