#!/bin/bash
#Compile Script RiotMode

temp=`mktemp -d -t rm`
echo $temp
for dir in tags/*/
do
    dir=${dir%*/}
    riot $dir/src $dir/dist
    cp $dir/src/*.tag $temp
done
    
echo "\n"
echo "Compiling main dist..."    
echo "\n"
riot $temp dist/RiotMode.js
rm -rf $temp

for i in `find mixins -name '*.js'` ; 
do 
    cat $i dist/RiotMode.js > tmp && mv tmp dist/RiotMode.js
done

ver=`git describe --abbrev=0 --tags`

while true; do
    read -p "You are on $ver, should we make a new one? (y/n): " yn
    case $yn in
        [Yy]* ) inc=true; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

if [ "$inc" = true ] ; then
    read -p "Type version in the format v0.0.0: " ver
    reg="v[0-9]+\.[0-9]+\.[0-9]+"
    if [[ $ver =~ $reg ]]; then
      git tag $ver
      git push origin $ver
    fi
fi
