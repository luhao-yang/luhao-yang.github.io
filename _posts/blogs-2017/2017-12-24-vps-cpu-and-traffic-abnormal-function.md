---
id: 96
title: CPU and traffic abnormal behavior on VPS!
#date: 2017-12-24T18:11:38+00:00
author: Luhao
summary: Dealing with some unknown process in my VPS, which almost ate up all the resource of operating system, like cpu, traffic, IO, maybe memory
layout: post
#guid: http://flywithfan.net/?p=96
#permalink: /misc/96/
categories:
  - Security
---
Recently I found my VPS worked extremely unusual theses days &#8217;cause I continuously received serval alert emails from LINODE TEAM. They are like these:

![CPU](/assets/img/uploads/2017/linode4628232.png)

![traffic](/assets/img/uploads/2017/linode4628232-2.png)
  
it ran out of more than 600G traffic with in 20 days! Can you believe that?

![IO](/assets/img/uploads/2017/linode4628232-4.png)

I&#8217;ve tried different kinds of Linux network monitoring tools, like iptraf, nethogs, nethogs&#8230;

Now I am working on it, I hope I can find the chief culprit!
  
To be continued&#8230;
  
(2017/12/24)

* * *

2017/12/29
  
have been busy these days, today I got a time to tackle this finally&#8230;
  
Luckily, I found the nasty thing running on the VPS and how to thoroughly remove this!

I use **_top_** to check the status of processes on my server, find the **_wipefs_** take up too much cpu usage all the time.

First of all , **KILL** it!

Then I search it online, it seems that many people have encountered this problem and have no idea what it is. In fact, wipefs is a built-in tool to wipe files, which path should be **_/usr/bin/wipefs_**. But the wipefs on my server is pointed at **_/bin/wipefs_** (use: ps aux)
  
Even if you kill it , it would start some other time automactically.

It is said that it&#8217;s a mining program intentionally injected into yours system by someone. In other words, they are take advantage of you to make their own money! It&#8217;s really pissing and intolerable！

#### WHAT THE THING DOES:

  1. do mining, take up massive cpu
  2. copy itself to **_/bin/wipefs_**, create service **_/etc/init.d/wipefs_**, create links in **_/etc/rc(x).d_** and **_/etc/rc.d/rc(x).d_** to start up with system.
  3. release subprocess to **_/bin/ddus-uidgen_**, create service **_/etc/init.d/acpidtd_** and its links in \*\\*\* /etc/rc(x).d \*\*\*\* and \*\*\*/etc/rc.d/rc(x).d \***
  4. modify \*\\*\*/etc/resolv.conf \*\**, maybe resolve ip for mining server
  5. modify **_/etc/crontab_**, create timed task for it&#8217;s job

#### WHAT WE SHOULD DO：

  1. delete timed task in /etc/crontab 
  2. delete these files below:
  
    /bin/wipefs
  
    /etc/init.d/wipefs
  
    /bin/ddus-uidgen
  
    /etc/init.d/acpidtd
  
    /etc/rc&#42;/S01wipefs
  
    /etc/rc&#42;/acpidtd
  3. overhaul the system, check upon vulnerabilities, pay attention to ssh privileges, firewall etc&#8230;

#### SCREENSHOTS FROM MY TERMINAL:

except wipfs, there is a httpsd, I don&#8217;t know what it is, just remove!
  
![crontab](http://45.33.40.211/wp-content/uploads/2017/12/crontab.png)

* * *

you can find out all the relating files use find command then delete
  
![](http://45.33.40.211/wp-content/uploads/2017/12/rc.png)

* * *

you might see this werid thing when you try to delete this file:
  
![](http://45.33.40.211/wp-content/uploads/2017/12/ddus.png)

you may get confused because, like I, loggin as root but still can&#8217;t do that, why?

here it is! The program use **_chatter_** to protect it from deleting, how smart!
  
In order to do that, you should follow these steps:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">root@localhost:/bin# lsattr ddus-uidgen
----i--------e-- ddus-uidgen
root@localhost:/bin# chattr -i ddus-uidgen
root@localhost:/bin# lsattr ddus-uidgen
-------------e-- ddus-uidgen
root@localhost:/bin# rm -f ddus-uidgen
root@localhost:/bin#
</code></pre>

Congratulations!
  
All done!

* * *

##### about SSH:

some said using credentials rather than password to loggin ssh is better. Because first of all, it leaves out password which is fairly convenient, and also you can close the way of connect with password to reinforce the security of your system, protecting it from someone using brute force. Follow these:

  1. ssh-keygen -t rsa
  2. copy your id_rsa.pub to server, in the .ssh directory of the specific loggin user. Rename it to authorized&#95;keys.
  3. chmod 700 ~/.ssh
  
    chmod 644 ~/.ssh/authorized_keys

PS: If the privileges of ~/.ssh and authorized_keys is not the exactly same above, it may not work properly.