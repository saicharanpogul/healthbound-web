#!/bin/bash

# Download the Poppins font from Google Fonts
wget https://fonts.google.com/download?family=Poppins -O Poppins.zip

# Unzip the downloaded file
unzip Poppins.zip -d Poppins

# Move the extracted .ttf files to the /usr/share/fonts directory
sudo mv Poppins/*.ttf /usr/share/fonts/

# Update the font cache
sudo fc-cache -f -v

# Print a success message
echo "Poppins font was successfully installed."
