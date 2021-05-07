#!/bin/sh
# See https://github.com/thaapasa/wait-for-url
# Usage:
# wait-for-url.sh URL [retries] -- [cmd to run]

set -e
  
HOST="$1"
shift

RETRIES=15

if [ $# -gt 0 ] && [ "$1" != "--" ]
then
  RETRIES=$1
  shift
fi

if [ $# -gt 0 ]
then
  # Skip --
  shift
fi

# Rest is the command
CMD="$@"

is_available() {
  CODE=`curl -s -o /dev/null -w "%{http_code}" $HOST`
  RET=$?
  if [ $RET -ne 0 ]
  then
    echo "$HOST is not responding, waiting ($RETRIES retries)..."
    return 1
  fi
  if [ $CODE -ne 200 ]
  then
    echo "$HOST does not reply with status 200, waiting ($RETRIES retries)..."
    return 1
  fi
  return 0
}

echo "Checking connection to $HOST"

until is_available ; do
  RETRIES=$(($RETRIES - 1))
  if [ $RETRIES -lt 0 ]
  then
    echo "$HOST could not be reached - stopping"
    exit 255
  fi
  >&2 sleep 1
done
  
if [ -n "$CMD" ]
then
  >&2 echo "$HOST is up - executing command"
  exec $CMD
else
  >&2 echo "$HOST is up"
fi
