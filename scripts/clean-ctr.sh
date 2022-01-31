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

IMGS=$($CTR images ls name~='localhost:32000' | tail -n +2  | awk {'print $1'})
for IMG in $IMGS; do
    $CTR images rm $IMG
done

echo -e "\nRemoved all images!"
