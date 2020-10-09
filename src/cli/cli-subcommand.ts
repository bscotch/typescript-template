#!/usr/bin/env node
import cli from "commander";

// Kick it off
cli.description('CLI Name: Subcommand')
  .requiredOption("-r --required <info>", "Some required info")
  .option("-o --optional <data>","Optional info",'default value')
  .option("--flag","A boolean flag.")
  .parse();

// Sample user options available via:
cli.optional;
cli.required;
cli.flag; // false if not provided by the user, else true