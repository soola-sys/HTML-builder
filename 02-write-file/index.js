const fs = require("fs");
const path = require("path");
const Emitter = require("events");
const readline = require("readline");
const emitter = new Emitter();
const { stdin, stdout } = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const stream = fs.createWriteStream(path.join(__dirname, "text2.txt"));
stdout.write("Hello what text do you want to append ?...\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    handler();
    console.log("hello");
  }
  stream.write(data);
});
process.on("exit", handler);
function handler() {
  stdout.write("GoodBye!");
  process.exit();
}