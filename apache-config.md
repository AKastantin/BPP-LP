# Apache Configuration for PropertySearch Application

## Overview
Your Node.js application runs on port 5000 by default. To serve it on port 80 through Apache, you need to configure Apache as a reverse proxy.

## Step 1: Enable Required Apache Modules

On your VM (34.123.149.136), run these commands:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

## Step 2: Create Virtual Host Configuration

Create a new virtual host configuration file:

```bash
sudo nano /etc/apache2/sites-available/property-search.conf
```

Add the following configuration:

```apache
<VirtualHost *:80>
    ServerName 34.123.149.136
    ServerAlias your-domain.com  # Replace with your actual domain if you have one
    
    # Proxy all requests to your Node.js application
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
    
    # Handle WebSocket connections (if your app uses them)
    ProxyPass /ws/ ws://127.0.0.1:5000/ws/
    ProxyPassReverse /ws/ ws://127.0.0.1:5000/ws/
    
    # Set headers for proper proxying
    ProxyPassReverse / http://127.0.0.1:5000/
    ProxyPreserveHost On
    ProxyAddHeaders On
    
    # Optional: Set custom headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    
    # Logging
    ErrorLog ${APACHE_LOG_DIR}/property-search_error.log
    CustomLog ${APACHE_LOG_DIR}/property-search_access.log combined
</VirtualHost>
```

## Step 3: Enable the Site and Restart Apache

```bash
# Enable the new site
sudo a2ensite property-search.conf

# Disable the default site (optional, but recommended)
sudo a2dissite 000-default.conf

# Test the configuration
sudo apache2ctl configtest

# If the test passes, restart Apache
sudo systemctl restart apache2
```

## Step 4: Configure Firewall (if needed)

If you have a firewall enabled, make sure port 80 is open:

```bash
# For UFW
sudo ufw allow 80/tcp

# For iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

## Step 5: Verify the Setup

1. Make sure your Node.js application is running:
   ```bash
   ps aux | grep "node.*dist/index.js"
   ```

2. Test the application locally on the VM:
   ```bash
   curl http://127.0.0.1:5000
   ```

3. Test through Apache:
   ```bash
   curl http://127.0.0.1
   ```

4. Access from your browser: `http://34.123.149.136`

## Troubleshooting

### Check Apache Error Logs
```bash
sudo tail -f /var/log/apache2/property-search_error.log
```

### Check Application Logs
```bash
tail -f /home/ubuntu/property-search/app.log
```

### Verify Node.js Application is Running
```bash
netstat -tlnp | grep :5000
```

### Test Proxy Configuration
```bash
curl -I http://34.123.149.136
```

## Optional: SSL/HTTPS Configuration

If you want to add SSL support later, you can use Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d your-domain.com
```

## Notes

- Your Node.js application serves both the API and the static files
- The application runs on port 5000 by default
- Apache proxies all requests from port 80 to port 5000
- Make sure your Node.js application is running before testing Apache
- The deployment script will handle starting your Node.js application automatically
