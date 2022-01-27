#! /usr/bin/bash

ROOT_CA_KEY="rootCA.key"
ROOT_CA_CRT="rootCA.crt"
DOMAIN="localhost" # TODO change this when deploying to a different host

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH
cd ..
if [ -d tls ]; then
    echo -n "Override existing files (y/n)? "
    read answer
    if [ "$answer" == "${answer#[Yy]}" ] ;then
        exit
    fi
fi
rm -rf tls # TODO prompt before deleting old files
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
openssl genrsa -out $(pwd)/$DOMAIN.key 2048 || exit 1

# Signing certificate request
openssl req -new -sha256 -key $(pwd)/$DOMAIN.key -out $(pwd)/$DOMAIN.csr \
    -subj "/O=vu-sc-g2/CN=$DOMAIN" || exit 1

# Create certificate
openssl x509 -req -in $(pwd)/$DOMAIN.csr -CA $ROOT_CA_CRT -CAkey $ROOT_CA_KEY -CAcreateserial -out $(pwd)/$DOMAIN.crt -days 500 -sha256 \
    --passin pass:$ROOT_CA_PASS || exit 1

# Base64 encode for k8s secret
base64 $(pwd)/$DOMAIN.crt > $(pwd)/$DOMAIN.crt.base64
base64 $(pwd)/$DOMAIN.key > $(pwd)/$DOMAIN.key.base64

# Print certificate contents for verification
openssl x509 -in $(pwd)/$DOMAIN.crt -text -noout | less
