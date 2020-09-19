#!/bin/bash

for para  in `echo ${PARAS} | sed 's/||/ /g'`
do 
	echo $para 
    ar=(${para//@/ })
	echo ${ar[0]}
	echo ${ar[1]}
    jspath=`ls /app/dist/static/js/app.*.js`
	sed -i "s?${ar[0]}?${ar[1]}?g" ${jspath}
done

# replace base url
if [ "${BASE_URL}" = "" ];
then
	:
else
	indexpath=/app/dist/index.html
	sed -i "s?/js/?${BASE_URL}/js/?g" ${indexpath}
	sed -i "s?/css/?${BASE_URL}/css/?g" ${indexpath}
fi
