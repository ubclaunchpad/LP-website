# How To Dual Boot Linux on Your Windows laptop

This document overviews the dual boot installation of Xubuntu on your Windows
laptop.  There are several variations of Ubuntu and Desktop Environments you can
also install, but we will go over installing ubuntu using the XFCE desktop
environment.

You'll need to download the Xubuntu 18.04 from [here](https://xubuntu.org/download).
Preferrably you should download the torrent from the Xubuntu website and use a
torrent program like BitTorrent from [here](https://www.bittorrent.com/downloads/win).
BitTorrent is a program that allows you to download large files from the internet
given a torrent file, which in our case would be the one obtained from the xubuntu
website.  Here's a guide on [how to use BitTorrent](https://www.dailydot.com/debug/how-to-use-bittorrent/).
Don't install the anti-virus because you wont need it if you're torrenting from
a safe website like xubuntu.  You also should stop seeding after a day once you're
done the download (seeding helps other people using BitTorrent to download the
same files by giving them some of your internet connection/bandwidth).

Once you download the Xubuntu iso file using BitTorrent, you'll need a USB stick
and Rufus (get it from [here](https://rufus.ie/en_IE.html) to create a bootable
Ubuntu USB stick. [Instructions](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#0).

Then you'll need to configure your computer to boot/start up running on your usb
stick instead of your SSD.  Usually you'll have to do this by restarting your
computer, pressing F9 or F2 or F10... it's dependent on your computer so I don't
know which one you'll need to press. You will end up in your computer's BIOS,
which will allow you to configure whether you want to boot from your usb stick
or your SSD (check out step 2 from
[here](https://www.forbes.com/sites/jasonevangelho/2018/08/29/beginners-guide-how-to-install-ubuntu-linux/)).
Once you've chosen for your computer to boot from usb, restart and you'll end up
running from your USB with a GUI that will guide you through installing ubuntu on
your SSD.  A few notes for this process is that you'll have to partition your SSD
so that some of it is allocated to the ubuntu OS. Follow the steps in forbes.com
guide after that and your done!

*This guide was originally written by [Matthew](https://github.com/ginsstaahh)
and was been adapted from his guide
[here](https://docs.google.com/document/d/1QtvBIruTP2Puw5sPeV5qvlwdJ848kXeTc2Iq3ZcqfXA/).*
