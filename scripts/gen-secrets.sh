#! /usr/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH
cd ../helm/vu-sc

if [[ $1 != "-y" ]]; then
    if [ -d secrets ]; then
        echo -n "Override existing files (y/n)? "
        read answer
        if [ "$answer" == "${answer#[Yy]}" ] ;then
            exit
        fi
    fi
fi
rm -rf secrets
mkdir secrets
cd secrets

function gen_secret {
    < /dev/urandom  tr -dc A-Za-z0-9 | head -c $1
}
 
gen_secret 300 > jwtSecret.secret
gen_secret 32 > mongodbPass.secret
gen_secret 32 > mongodbRootPass.secret
