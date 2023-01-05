---
id: 3
title: Common security settings of system
#date: 2018-01-01T17:34:32+00:00
author: Luhao
summary: 'Since I have been hacked by someone, I started to  pay more attention on the security settings of system.'
layout: post
#guid: http://45.33.40.211/?p=3
#permalink: /misc/3/
categories:
  - General
tags:
  - english
---
Since I have been hacked by someone, I started to pay more attention on the security settings of system.
  
**First of All**, I change a silly six character password into long randomized complicated password for root. And I add some anthor common settings like these below:

### Add another user (deploy is just a example)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">useradd deploy  
mkdir /home/deploy  
mkdir /home/deploy/.ssh  
chmod 700 /home/deploy/.ssh  
</code></pre>

To assign the shell type
  
`usermod -s /bin/bash deploy`

To assign password to the new user
  
`passwd deploy`

### Login related

  * SSH config 
    `vi /etc/ssh/sshd_config`
    
    change default port to a custom port, like 36792 or anything else
    
    **diabled root login**
    
    <pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">PermitRootLogin no 
#=&gt;
PermitRootLogin off
</code></pre>
    
    Then restart ssh

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">service sshd restart
#centOS 7
systemctl restart sshd.service

</code></pre>

  * limit the times of trying to login:
    
    `/etc/pam.d/login`
    
    add to end of file:
    
    `auth required pam_tally2.so deny=6 unlock_time=180 even_deny_root  root_unlock_time=180`

  * only allow group wheel to use **_su_**

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null"># usermod -G wheel sysmgr

# vi /etc/pam.d/su
# Uncomment the following line to require a user to be in the "wheel" group.
auth            required        pam_wheel.so use_uid   
</code></pre>

Even if he input the correct password, system would deny him for

> su: incorrect password 

  * kick out if 5 mins without action
  
    `/etc/profile`</p> 
    export TMOUT=300
  
    readonly TMOUT

### close unused users and groups

make backup before edit

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">cp /etc/passwd{,.bak} 
vi /etc/passwd 
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">#adm:x:3:4:adm:/var/adm:/sbin/nologin  
#lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin  
#sync:x:5:0:sync:/sbin:/bin/sync  
#shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown  
#halt:x:7:0:halt:/sbin:/sbin/halt  
#uucp:x:10:14:uucp:/var/spool/uucp:/sbin/nologin  
#operator:x:11:0:operator:/root:/sbin/nologin  
#games:x:12:100:games:/usr/games:/sbin/nologin  
#gopher:x:13:30:gopher:/var/gopher:/sbin/nologin   
#ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">cp /etc/group{,.bak} 
vi /etc/group 
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">#adm:x:4:adm,daemn  
#lp:x:7:daemon  
#uucp:x:14:  
#games:x:20:  
#gopher:x:30:  
#video:x:39:  
#dip:x:40:  
#ftp:x:50:  
#audio:x:63:  
#floppy:x:19:  
#postfix:x:89: 
</code></pre>

### disable IPV6

In order to do this, we need to change some setting relating to modprobe, create a file /etc/modprobe.d/ipv6off.conf

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">alias net-pf-10 off
options ipv6 disable=1
</code></pre>

disable network for system configuration:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null"># vi /etc/sysconfig/network
NETWORKING_IPV6=no
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null"># vi /etc/sysconfig/network-scripts/ifcfg-eth0
IPV6INIT=no
IPV6_AUTOCONF=no
</code></pre>

close ip6tables:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null"> chkconfig ip6tables off
</code></pre>

restart system, test and verify:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">lsmod | grep ipv6
# ifconfig | grep -i inet6
</code></pre>

if nothing comes out, means that ipv6 has been disabled.

### lock some key files to prevent modifying

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">chattr +i /etc/passwd
chattr +i /etc/shadow
chattr +i /etc/group
chattr +i /etc/gshadow
chattr +i /etc/services 
</code></pre>

protect /etc/rc.d/init.d/* from other users to edit

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">chmod -R 700 /etc/rc.d/init.d/*
chmod -R 777 /etc/rc.d/init.d/* #恢复默认设置
</code></pre>