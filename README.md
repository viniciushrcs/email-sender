# Email Sender 

This project consists of a web application that simulates an email sending service. 

The client can connect to the website, set a subject and a message and the service sends the email.

# Purpose

The purpose was to create a set of microservices that can work together, using Docker and Docker-Compose. 

In total, 5 microservices were created: 
- frontend with nginx
- backend with node
- db with postgres
- workers with python
- queue with redis

# Running locally

1. Clone the repo
2. Run 'docker-compose up'
3. Connect to localhost:80
4. Fill the form with subject and message
5. Finally, see the worker sending the e-mail.


If you want to create multiple workers, to scale this microsservice, run:
'docker-compose up --scale worker=<number of containers>'
