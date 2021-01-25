#!/usr/bin/env node
'use strict';
const meow = require('meow');
const lagou = require('./');

const cli = meow(`
Usage
  $ lagou [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ lagou
  unicorns
  $ lagou rainbows
  unicorns & rainbows
`);
