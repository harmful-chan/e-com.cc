#!/bin/bash

SECRET_FILE_CODE=$APP/../env/.env.secret.ssl
DATE=`date +'%d/%m/%Y %H:%m:%S'`


function set_secret_pass(){

  if [[ -z "$SECRET_PASS" && -f "$SECRET_PASS_FILE" ]]; then
    SECRET_PASS=`cat $SECRET_PASS_FILE` 
  fi

  if [[ -z "$SECRET_PASS" ]]; then echo "SECRET_PASS is empty." && exit 1; fi
}

function decode_secret(){

  set_secret_pass
  if [[ -f "$SECRET_FILE_CODE" ]]; then
    
    openssl enc -d -aes256 -in $SECRET_FILE_CODE -out $SECRET_FILE -k $SECRET_PASS
  fi

}

function encode_secret(){

  set_secret_pass
  openssl enc -e -aes256 -in $SECRET_FILE -out $SECRET_FILE_CODE -k $SECRET_PASS
}