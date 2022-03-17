const chalk = require('chalk');

const renderPerson = {
  renderPersonDetails:  function (person) {
    console.log(2, person.toString());
    person = JSON.parse(person.toString());
  console.log(chalk.white("\n----------------------------"));
  console.log(chalk.white("Person: \n"));
  console.log(chalk.white("numberId: " + person.id + "\n"));
  console.log(chalk.bold.blue("Name: " + person.name + "\n"));
  console.log(
    chalk.white("Birthday: " + person.birthday) + 
    chalk.gray(` | `) + 
    chalk.white("Place Birth: " + person.place_of_birth + "\n")
  );
  if(person.known_for_department === "Acting") {
    console.log(chalk.magenta("Department: " + person.known_for_department + "\n"));
  }
  console.log(chalk.bold.blue("Biography: " + person.biography + "\n"));
  if(person.also_known_as) {
    console.log(chalk.white("Also known as: " + `\n`));
    person.also_known_as.forEach(element => {
      console.log(chalk.white(element + "\n"));
    });
  }else {
    console.log(chalk.yellow("Person name: " + person.name + " doesn´t have any alternate names\n"));

  }

}

}

module.exports = {renderPerson};