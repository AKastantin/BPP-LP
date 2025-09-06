#!/bin/bash

# Deployment script for LandingPage application
# Usage: ./deploy.sh [username@hostname]

# Configuration
VM_IP="34.123.149.136"
VM_USER="property_market_stories"
APP_NAME="landingpage"
REMOTE_DIR="/home/$VM_USER/$APP_NAME"
LOCAL_DIST="./dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to $VM_USER@$VM_IP${NC}"

# Check if dist folder exists
if [ ! -d "$LOCAL_DIST" ]; then
    echo -e "${RED}❌ Error: dist folder not found. Please run 'npm run build' first.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Creating remote directory...${NC}"
ssh $VM_USER@$VM_IP "mkdir -p $REMOTE_DIR"

echo -e "${YELLOW}📤 Transferring dist folder...${NC}"
# Remove existing files on remote server first
ssh $VM_USER@$VM_IP "rm -rf $REMOTE_DIR/*"
# Transfer all files from dist folder
scp -r $LOCAL_DIST/* $VM_USER@$VM_IP:$REMOTE_DIR/

echo -e "${YELLOW}📤 Transferring package.json...${NC}"
scp package.json $VM_USER@$VM_IP:$REMOTE_DIR/

echo -e "${YELLOW}📤 Transferring package-lock.json (if exists)...${NC}"
if [ -f "package-lock.json" ]; then
    scp package-lock.json $VM_USER@$VM_IP:$REMOTE_DIR/
fi

echo -e "${YELLOW}🔧 Installing dependencies on remote server...${NC}"
ssh $VM_USER@$VM_IP "cd $REMOTE_DIR && npm install --production"

echo -e "${YELLOW}🛑 Stopping existing application (if running)...${NC}"
ssh $VM_USER@$VM_IP "pkill -f 'node.*index.js' || true"

echo -e "${YELLOW}🚀 Starting application...${NC}"
ssh $VM_USER@$VM_IP "cd $REMOTE_DIR && export NODE_ENV=production && nohup node index.js > app.log 2>&1 &"

# Wait a moment for the app to start
sleep 3

echo -e "${YELLOW}🔍 Checking if application is running...${NC}"
ssh $VM_USER@$VM_IP "ps aux | grep 'node.*index.js' | grep -v grep"

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}📝 Application logs: ssh $VM_USER@$VM_IP 'tail -f $REMOTE_DIR/app.log'${NC}"
echo -e "${GREEN}🌐 Your application should be accessible at: http://$VM_IP${NC}"
echo -e "${YELLOW}💡 Don't forget to configure Apache as a reverse proxy!${NC}"
