#!/bin/bash

pushd app
npm ci
npm build
popd