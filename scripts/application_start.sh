#!/bin/bash

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

cd /home/ec2-user/checkbox

#install node modules
yarn install --frozen-lockfile || true
npm run build
npm start -- -p 5454 > app.out.log 2> app.err.log < /dev/null & 
