#!/usr/bin/env node
import cli from 'commander';

// Kick it off
cli
  .description('CLI Name: Subcommand')
  .requiredOption('-r --required <info>', 'Some required info')
  .option('-o --optional <data>', 'Optional info', 'default value')
  .option('--flag', 'A boolean flag.')
  .parse();

// Sample user options available via:
const options = cli.opts();
options.optional;
options.required;
options.flag; // false if not provided by the user, else true
