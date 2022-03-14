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
    let imgTitle = [];
    for (let item of res.results) {
      let temp = new Array();
      // console.log(item);
      for (let obj of item.properties.File.files) {
        // console.log(obj);
        temp.push(obj.file.url);
      }
      imgTitle.push(
        item.properties.Picture.title[0]
          ? item.properties.Picture.title[0].text.content
          : "Untitled"
      );
      imgArr.push(temp);
      // imgArr.push(item);
    }
    return { imgArr, imgTitle };
  } catch (err) {
    console.error(err);
    return err;
  }
};
