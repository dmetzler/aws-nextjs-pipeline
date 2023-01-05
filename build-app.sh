#!/bin/bash

pushd app
npm ci
npm run build
popd