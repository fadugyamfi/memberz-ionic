ionic build --prod
Compress-Archive -Path ./www/* -DestinationPath ./www/www.zip

Write-Host -fore Cyan "`r`nRemove deployed files on remote /home/runcloud/webapps/memberz-ionic"
. ssh -i C:\Users\icewa\.ssh\TG-Personal.pem "runcloud@m.memberz.org" "cd ~/webapps/memberz-ionic; rm -rf ./*.*; exit;"

Write-Host -fore Cyan "`r`nCopying archive from ./www/ to /home/runcloud/webapps/memberz-ionic"
. pscp -i C:\Users\icewa\.ssh\TG-Personal.ppk "./www/www.zip" "runcloud@memberz.org:/home/runcloud/webapps/memberz-ionic"

Write-Host -fore Cyan "`r`nExtracting uploaded files on remote /home/runcloud/webapps/memberz-ionic"
. ssh -i C:\Users\icewa\.ssh\TG-Personal.pem "runcloud@m.memberz.org" "cd ~/webapps/memberz-ionic; unzip www.zip; exit;"
