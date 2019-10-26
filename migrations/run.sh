#!/bin/bash

SCRIPT=$1

mongo sandbox-node-draft $SCRIPT

echo 'done, script: ' $SCRIPT