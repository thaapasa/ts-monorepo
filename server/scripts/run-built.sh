#!/usr/bin/env bash

# Script for running built JavaScript files

# The configuration is needed because absolute import paths are used
# and the tsc compiler does not rewrite them. Node needs the
# tsconfig-paths script to understand absolute import paths.

# We use exec so that signals are forwarded to the running node server.
# Thus, this script will not execute past the executed command.
# If this is a problem:
# - do not exec but start as a child process and wait for it
# - trap SIGTERM in the script
# - forward SIGTERM to the started child process

TS_NODE_PROJECT=tsconfig-run.json exec node -r tsconfig-paths/register "$@"
