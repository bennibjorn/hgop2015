#!/bin/bash
export ACCEPTANCE_URL=http://hgop.bennibjorn.me:9000
npm install grunt
rc=$?
if [[ $rc != 0 ]] ; then
    echo "npm failed, exit code: " $rc
    exit $rc
fi

grunt mochaTest:load
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Capacity test failed - exit code: " $rc
    exit $rc
fi
