#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

APP_NAME="vu-sc"
CTR="microk8s ctr"

echo -en "This will delete all images on your system!\nAre you sure (y/n)? "
read answer
if [ "$answer" == "${answer#[Yy]}" ] ;then
    exit
fi

IMGS=$($CTR images ls name~='localhost:32000' | tail -n +2  | awk {'print $1'})
for IMG in $IMGS; do
    $CTR images rm $IMG
done
docker builder prune -af

echo -e "\nRemoved all images!"
