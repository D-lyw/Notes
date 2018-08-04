

# **Common commands for Linux**
<br>

1. >  ## File Commands
	+ >    ***ls*** 				    -list catalog
	+ >    ***ls -al***				 -a all file(include hidden file) -l format detailed information
    + >    ***cd dir***				 -change directory to dir 
    + >    ***pwd*** 				   -show current dir
	+ >    ***mkdir dir***			  -create new dir
	+ >    ***rm file***				-delete file
	+ >    ***rm -r dir***			  -delete directory
	+ >    ***rm -rf dir***			 -force to delete directory
	+ >    ***cp file1 file2*** 		-copy file1 to file2
	+ >    ***cp -r dir1 dir2*** 	   -copy dir1 to dir2,if not exist,create it
	+ >    ***mv file1 file2*** 		 move || rename file1 to file2,if exist,move file1 to file2
	+ >    ***ln -s file link***         -create symbol link to file
	+ >    ***touch file***			   -create new file
	+ >    ***cat > file*** 					-add standard input to file
	+ >    ***more file***				-view content in file
	+ >    ***head file***				-look at the first 10 lines of file
	+ >    ***tail file***				-look at the last 10 lines of file

<br>

2. > ## Process Management
	- > **ps**            --show current activity process
	+ > **top**  --show all running processes
	- > **kill pid**  --kill process *id pid*
	- > **killall proc** --kill all processess named "proc \*"
	- > **bg**      --list the jobs that have stopped or backstage work
	- > **fg**  --bring the latest work to the front
	- > **fg n** --bring work N to front


<br>

3. > ## File Permission
	- > ***chmod octal file***     -change file permission
		+ 4 -read(r)
		+ 2 -write(w)
		+ 1 -execute(x)
	> eg:
	> **chmod 777** - add read, write, execute permission for all user
	> **chmod 755** - add rwx permission for owner,add rx permission for group and other users.

<br>

3. > ## SSH
	- > ***ssh user@host***   -connect to host with user identify
	- > ***ssh -p port user@host*** -connect to host with user at port
	- > ***ssh-copy-id user@host *** -add secret key to host login without password

<br>

4. >## Search
	- > ***grep pattern file***  --search for content of pattern in file
	- > *** grep -r pattern dir  --recursive search for content of pattern in dir
	- > command | grep pattern  -- search for content of pattern in output pattern


5. > ##System Information
	- > ***date***   --show current date and time
	- > ***cal***   --show current calendar
	- > ***uptime***  --show when the system is running from start to run 
	- > ***w***		-- show login user
	- > ***whoami*** --show current user name
	- > ***finger user*** --show user relevant information
	- > ***uname -a***  --show kernel information
	- >***cat /proc/cpuinfo***   -- show cpu information
	- > ***cat /proc/meminfo*** --show memory informtion
	- > *** man command***  --show command instruction manual
	- > ***df*** --show disk occupancy
	- > ***du*** --show directory space occupancy
	- > *** free*** --show memory and swap area occupancy

6. > ## Compress
	- > ***tar cf file.tar files*** -- create tar file ' *file.tar*' including '*files*'
	- > ***tar xf file.tar** --extracting files from file.tar
	- > ***tar czf file.tar.gz files --create compress tar file by Gzip
	- > ***tar xzf file.tar.gz --extracting tar file frome file.tar.gz
	- > ***tar cjf file.tar.bz2** --create compress tar file by Bzip2
	- > ***tar xjf file.tar.bz2**  --extracting tar file 
	- > ***gzip file *** --compress file && named file.gz
	- > *** gzip -d file*** --extracting file


7. > ## Network
	- > ***ping host*** --ping host && show result
	- > **whois domain*** -- get domwain's whois information
	- > ***dig domain*** -get domain's DNS infromation
	- > ***dig -x host** --reverse query host
	- > ***wget file*** -- download file
	- > ***wget -c file*** -- broken point and continue download

8. >##Install
   - > ***./configure***
   - > ***make***
   - > ***make install***
   - >***dpkg -i pkg.deb***  --installation package(Debian)
   - > ***rpm -Uvh pag.rpm*** --installation package(RPM)

9. > ## Shortcut key
	- > ***Ctrl + C*** --stop current command
	- > ***Ctrl + Z*** --stop current command and use *fg* recover
	- > ***Ctrl + D*** -- log off current reply ,similar to exit
	- > ***Ctrl + W*** --delete words in current line
	- > ***Ctrl + U*** --delete the whole line
	- > ***!!*** --repeat last command
	- > ***exit*** --log off this reply
