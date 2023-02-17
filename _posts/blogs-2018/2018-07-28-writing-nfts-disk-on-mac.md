---
id: 331
title: Writing NFTS disk on MAC
#date: 2018-07-28T21:26:34+00:00
author: Luhao
summary: Normally, you can only process reading instead of writing on the pluggable disk of NTFS format when you insert it into your mac.
layout: post
#guid: http://flywithfan.net/?p=331
#permalink: /misc/331/
categories:
  - Misc
tags:
  - mac
---

Normally, you can only process reading instead of writing on the pluggable disk of NTFS format when you insert it into your mac. To write on the disk, you should have third-party software installed, such as Paragon NTFS or Tuxera NTFS. But both of them are not free, I found a method which is amazing, because it&#8217;s hidden on your mac!

1. Open your terminal.
2. **_diskutil list_**, find out what the device name is

   ![](/assets/img/uploads/2018/a.png)

3. update **/etc/fstab**, typing **_sudo nano /etc/fstab_**
4. put a line into it, **_LABEL=XXXX none ntfs rw,auto,nobrowse_**

   ![](/assets/img/uploads/2018/b.png)

XXX is your disk&#8217;s name. If there is a blank space in the name, it should be replaced by **\040**的, e.g: BOOT/040CAMP

**Ntfs rw** means this ntfs volumn is readable and writeabel, and **nobrowse** is very important because it represents that it won&#8217;t show up in the Finder, since Finder will block the writing functionality。

press Ctrl + X to exit, and Y for saving.

5. create a link, by **_sudo ln -s /Volumes/XXXX ~/Desktop/XXXX_**

6. reboot, find the link on your desktop, done!

You are welcome!
