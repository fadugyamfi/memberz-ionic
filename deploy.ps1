ionic build --prod
Compress-Archive -Path ./www/* -DestinationPath ./www/www.zip

Write-Host -fore Cyan "`r`nCopying archive from ./www/ to /home/runcloud/webapps/memberz-ionic"
. pscp -i C:\Users\icewa\.ssh\TG-Personal.ppk "./www/www.zip" "runcloud@memberz.org:/home/runcloud"

Write-Host -fore Cyan "`r`nDeploying files on remote /home/runcloud/webapps/memberz-ionic"
. ssh -i C:\Users\icewa\.ssh\TG-Personal.pem "runcloud@m.memberz.org" "cd ~/webapps/memberz-ionic; cp ~/www.zip ~/webapps/memberz-ionic/www.zip; unzip -o www.zip; exit;"

# Write-Host -fore Cyan "`r`nExtracting uploaded files on remote /home/runcloud/webapps/memberz-ionic"
# . ssh -i C:\Users\icewa\.ssh\TG-Personal.pem "runcloud@m.memberz.org" "cd ~/webapps/memberz-ionic; unzip -o www.zip; exit;"


## Todo update ng-qrcode to Angular16 https://github.com/mnahkies/ng-qrcode/releases
