# 🗂️ Windows

This page documents helpful resources for working with
[Windows](https://www.microsoft.com/en-us/windows), Microsoft's operating system.

## Windows Linux Subsystem <Badge type="tip" text="new"/>

WSL provides Windows users the ability to run Linux tools without needing to dual boot or run their own virtual machines. With WSL, you can run all your developer tools from a Bash terminal without needing to install Windows versions of developer tools. Microsoft provides two versions of WSL. This guide will focus on WSL 2, which has better performance for common developer tasks. Detailed instructions and common troubleshooting steps can be found [here](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install). The following steps will help you quickly setup WSL:

1. Open PowerShell and run the following commands to enable WSL and Virtual Machine Platform:
    ```
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    ```
    Restart your computer to finish installation.
2. Open PowerShell (as administrator) and run the following command to set WSL 2 as default version:
    ```
    wsl --set-default-version 2
    ```
3. Open the Microsoft Store and install Ubuntu.
4. After Ubuntu installation is complete, launch the app and setup your Linux username and password.
5. To set Ubuntu to use WSL 2, run:
    ```
    wsl --set-version Ubuntu 2
    ```
6. Update Ubuntu packages by running:
    ```
    sudo apt update && sudo apt upgrade
    ```

If you're using VS Code, checkout this [guide](https://code.visualstudio.com/blogs/2019/09/03/wsl2) on how to work with WSL with your editor.

## Dual Boot Linux

> This guide was originally written by [Matthew](https://github.com/ginsstaahh)
> (`@ginsstaahh`, `matthewgin10@gmail.com`).

### Overview

This document overviews the dual boot installation of Linux on your Windows device.
Having a dual boot system means that you can have both your Linux and Windows OS
on your SSD or HDD such that when you start up your laptop, you can choose which
operating system to run.  We will go over installing Xubuntu which is a lightweight
Linux distribution (or distro for short), however there are many other distros
and desktop environments you can install to tailor to your needs. Here are just
a list of distros and desktop environments you can check out if you're interested:

#### Distros

* Debian
* Fedora
* OpenSUSE
* Arch Linux

#### Desktop Environments

* Gnome 3
* KDE
* XFCE
* LXDE
* Unity

### Installation

Before going into the installation, remember that we're installing an OS that
requires a significant amount of memory on your SSD/HDD.  You can choose to
allocate a certain amount of memory on your drive during installation (I recommend
40GB if you're using it solely for LaunchPad work.  However if you'd like to use
it as your main OS and you're planning on using several docker containers, a
higher amount is advised).  If your laptop does not have that amount of space
available, try uninstalling unnecessary programs on your Windows OS, move your
personal pictures over to an external hard drive or USB stick, or anything else
that can free up space.

Also if you're afraid of wiping your Windows OS by accident, it'd be a good idea
to back it up before installation using a program like CloneZilla from
[here](https://clonezilla.org/).  However that has not happened to me and
performing a dual boot installation is relatively safe unless you deviate from
following the steps provided in the guides linked in this document.

You'll need to download the Xubuntu 18.04 from [here](https://xubuntu.org/download).
Preferably you should download the torrent from the Xubuntu website and use a
torrent program like BitTorrent from [here](https://www.bittorrent.com/downloads/win).
BitTorrent is a program that allows you to download large files from the internet
given a torrent file, which in our case would be the one obtained from the Xubuntu
website. Here's a guide on [how to use BitTorrent](https://www.dailydot.com/debug/how-to-use-bittorrent/).
Don't install the anti-virus because you wont need it if you're torrenting from
a safe website like Xubuntu.  You also should stop seeding after a day once you're
done the download (seeding helps other people using BitTorrent to download the
same files by giving them some of your internet connection/bandwidth).

Once you download the Xubuntu ISO file using BitTorrent, you'll need a USB stick
and Rufus (get it from [here](https://rufus.ie/en_IE.html)) to burn the ISO file
onto the USB stick in order to make it a bootable Ubuntu USB stick. The USB stick
will allow you to try out Xubuntu, as well as install it onto your SSD/HDD. [Instructions](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#0).

Then, you'll need to configure your computer such that it boots/starts up on your
USB stick instead of your SSD. This can be done by entering your computers BIOS
system. The BIOS is the program that your computer's microprocessor uses to get
the computer system started after you turn it on. It also manages data flow
between the computer's operating system and attached devices such as the hard
disk, video adapter, keyboard, mouse and printer.  To enter your BIOS, you'll
have to restart your computer and press either F9 or F2 or F10... it's dependent
on your computer so you might need to google how to enter into your BIOS for your
specific laptop. Once you end up in your computer's BIOS, use your arrow keys to
navigate towards the boot menu section and then configure it such that you will
boot from your USB stick (check out step 2 from
[here](https://www.forbes.com/sites/jasonevangelho/2018/08/29/beginners-guide-how-to-install-ubuntu-linux/).
Once you've chosen for your computer to boot from USB, restart and you'll end up
running from your USB with a GUI that will guide you through installing ubuntu
on your SSD. Follow the steps in forbes.com guide after that and your done
installing Xubuntu!
