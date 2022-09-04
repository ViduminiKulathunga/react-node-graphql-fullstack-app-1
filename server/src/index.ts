import express from "express";
const app = express();
const port = 8000;

const one: number = 8;
const two: number = 12;
const three:any = undefined;

app.get("/", (req, res) => res.send(`one + two = ${one + two}`));

app.listen(port);

console.log(`[app]: http://localhost:${port}`);