#!/usr/bin/env node
const API_KEY = process.env.API_KEY;
const { Command } = require("commander");
const dotenv = require("dotenv");
const { prompt } = require('inquirer');
const http = require('http');
const chalk = require('chalk');
const ora = require('ora');
require("dotenv").config();

const program = new Command();
program.version("0.0.1");

const {renderPerson} = require('./utils/renderPerson');

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
  // .requiredOption("-i,  --id <personID>", "The id of the person")
    .action(async () => {
      const answer = await prompt([
        {
          type: 'input',
          message: 'The id of the person you want to consult',
          name: 'id',
        },
      ]);
      const dataApi = {
        hostname: 'api.themoviedb.org',
        path: `/3/person/${answer.id}?api_key=bdea66020dff22b40d6c1da37fb42f84`,
        method: 'GET',
      }
      console.log("DATAPIIIIIIIII "+JSON.stringify(dataApi))
      try {
        const req = http.request(dataApi, (res) => {
          console.log(`RESPONSEEEEEEEEEE` +res)
        const spinner = ora('Fetching the person data...').start();
        console.log("DATAPIIIIIIIII2 "+JSON.stringify(dataApi));
        let responseBody = '';
        console.log(`STATUuuuuuuuuuuuuuuuuS: ${res.statusCode}`);
        // res.setEncoding('utf8');
        res.on('data', (yii) => {
          // responseBody = responseBody + yii.toString();
          spinner.succeed();
          console.log(1, yii.toString());
          renderPerson.renderPersonDetails(yii);
        });
      });
      req.on('error', error => {
        spinner.error(chalk.red(error));
      })
      req.end();
    } catch(error) {
      if (spinner) {spinner.error(chalk.orange(error))}
      else { console.log(chalk.orange(error))}
    }
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
