#!/bin/sh

CURR_DIR=$(pwd)
ps -ef | grep "$CURR_DIR\|dist" | grep -v "grep\|subl3" | awk '{print $2}' | xargs kill

SCR="npm run debug"
$SCR
