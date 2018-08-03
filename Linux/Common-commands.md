

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
	- > ***grep pattern file*** 