#!/usr/bin/env node
"use strict";

const fs = require("fs");
const mustache = require("mustache");
const program = require("commander");

function runApp(args) {
  try {
    program
      .option("-j, --json <json>", "input JSON file")
      .option("-t, --template <template>", "input JTM template file")
      .option("-n, --root-node <rootNode>", "Name of root node")
      .option("-h, --help", " Show the usage/help documentation.")
      .action((action) => {
        program.json = action.json;
        program.template = action.template;
        program.rootNode = action.rootNode
      })
      .parse(args);

    if (!program.json || !program.template) {
      console.error(
        "Error: Required option --json <json> or --template <template> not specified"
      );
      console.error("");
      console.error(
        "Usage: json-to-mustache --json <json> --template <template> [options]"
      );
      console.error("");
      console.error("");
      console.error("Options:");
      console.error("--json <json>  Input JSON file");
      console.error("--template <template>  Input JTM template file");
      console.error("-h, --help     Output usage information");
      console.error("");

      process.exit(1);
    }

    // Read the input JSON file
    const inputJSON = fs.readFileSync(program.json, "utf-8");
    var json = JSON.parse(inputJSON);

    if (program.rootNode) json = json[program.rootNode];

    // Read the input JTM template file
    const inputTemplate = fs.readFileSync(program.template, "utf-8");
    const template = inputTemplate;

    // Use the mustache library to convert the input JSON to Markdown format using the JTM template
    const markdown = mustache.render(template, json);

    // Output the resulting Markdown to the standard output
    console.log(markdown);

  } catch (err) {
    console.error(err);
  }
}

runApp(process.argv);

module.exports = { runApp };
