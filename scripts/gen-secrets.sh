#! /usr/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH
cd ../helm/vu-sc

if [ -d secrets ]; then
    echo -n "Override existing files (y/n)? "
    read answer
    if [ "$answer" == "${answer#[Yy]}" ] ;then
        exit
    fi
fi
rm -rf secrets
mkdir secrets
cd secrets

function gen_secret {
    openssl rand -base64 $1 | tr -d '\n' | head -c $1
}
 
gen_secret 300 > jwtSecret.secret
