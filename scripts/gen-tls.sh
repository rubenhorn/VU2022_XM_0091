#! /usr/bin/bash
APP_HOSTNAME="${APP_HOSTNAME:="127-0-0-1.nip.io"}"

ROOT_CA_KEY="rootCA.key"
ROOT_CA_CRT="rootCA.crt"

APP_NAME="vu-sc"
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH
cd ../helm/$APP_NAME

if [[ $1 != "-y" ]]; then
    if [ -d tls ]; then
        echo -n "Override existing files (y/n)? "
        read answer
        if [ "$answer" == "${answer#[Yy]}" ] ;then
            exit
        fi
    fi
fi
rm -rf tls
mkdir tls
cd tls

ROOT_CA_PASS=""

while [ ${#ROOT_CA_PASS} -lt 4 ]
do
  read -s -p "Root CA password: " ROOT_CA_PASS
  if [ ${#ROOT_CA_PASS} -lt 4 ]
  then
    echo # Start new line
    echo Too short - 4 characters min
  fi
done

# Root CA
openssl genrsa -des3 --passout pass:$ROOT_CA_PASS -out $(pwd)/$ROOT_CA_KEY 4096 || exit 1
openssl req -x509 -new -nodes -key $(pwd)/$ROOT_CA_KEY -sha256 -days 1024 -out $(pwd)/$ROOT_CA_CRT \
    -subj "/O=VU2022_XM_0091" \
    --passin pass:$ROOT_CA_PASS || exit 1

# Certificate key
openssl genrsa -out $(pwd)/$APP_NAME.key 2048 || exit 1

# Signing certificate request
openssl req -new -sha256 -key $(pwd)/$APP_NAME.key -out $(pwd)/$APP_NAME.csr \
    -subj "/O=vu-sc-g2/CN=$APP_HOSTNAME" || exit 1

# Create certificate
openssl x509 -req -in $(pwd)/$APP_NAME.csr -CA $ROOT_CA_CRT -CAkey $ROOT_CA_KEY -CAcreateserial -out $(pwd)/$APP_NAME.crt -days 500 -sha256 \
    --passin pass:$ROOT_CA_PASS || exit 1

# Print certificate contents for verification
{ echo -e "==================\nPress \`q' to exit\n==================\n" & openssl x509 -in $(pwd)/$APP_NAME.crt -text -noout; } | less
