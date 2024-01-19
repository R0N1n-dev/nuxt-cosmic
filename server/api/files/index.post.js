import cosmic from "~~/lib/cosmic.mjs";
import formidable from "formidable";
import fs from "node:fs";

async function uploadtoCosmic(filename, bufferData) {
  try {
    const data = await cosmic.media.insertOne({
      media: {
        originalname: filename,
        buffer: bufferData,
      },
      //folder: "nuxt-test",
    });
    console.log({ Success: true, data });
  } catch (error) {
    console.log(error.message);
  }
}
export default defineEventHandler(async (event) => {
  if ((event.node.req.method = "POST")) {
    const form = formidable({});
    await form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      //console.table(files?.file[0]);
      console.log(fields);
      //console.log(files?.file[0]?.filepath);
      //let bufferData;
      fs.readFile(files?.file[0]?.filepath, (readErr, data) => {
        if (readErr) {
          console.error("Error reading file:", readErr);
          return;
          //res.writeHead(500, { 'Content-Type': 'text/plain' });
          //res.end('Internal Server Error');
        } else {
          //console.log(data);
          //return data;
          uploadtoCosmic(files?.file[0].originalFilename, data);
        }
      });
      /*const media = /*files?.file[0]{
        originalname: files?.file[0].originalFilename,
        buffer: data,
      };
      console.log(media);
      return { media };*/
    });

    /*console.log(media);
    try {
      const data = await cosmic.media.insertOne({
        media: media,
        folder: "nuxt-test",
      });
      return { Success: true, data };
    } catch (error) {
      console.log(error.message);
    }*/
    return {
      Success: true,
    };
  }
});
