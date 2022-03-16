#!/usr/bin/env node
const API_KEY = process.env.API_KEY;
// console.log(API_KEY)
const { Command } = require("commander");
const dotenv = require("dotenv");

require("dotenv").config();
// console.log(process.env.API_KEY);

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction(programOptions) {
    let requestPath = 'person/';
    if (programOptions.popular){
      requestPath += 'popular'
    }
    console.log(programOptions.page);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
