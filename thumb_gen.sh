#!/bin/bash

# Converts all images in the directory given by first parameter

find $1 -maxdepth 1 -type f > imglist
THDIR=$(echo $1"thumbs/")
if [ ! -d $THDIR ]; then
	mkdir $THDIR
fi

echo "Converting images contained in $1"
echo "Converted images will be inside $THDIR"

for FILE in $(cat imglist);
do
	if [[ ! $FILE =~ .goutputstream* ]]; then
	FILE=$(basename $FILE)	
	EXT=$(echo $FILE | cut -d '.' -f2-)
	FILE=$(basename $FILE "."$EXT)
	
	echo "Performing conversion of $FILE"

	convert -size 400x400 $1"$FILE.$EXT" -resize 400x400 +profile '*' $THDIR$FILE"."$EXT >/dev/null 2>/dev/null
	fi
done

rm imglist

echo "Done."
