FROM catthehacker/ubuntu:act-latest
COPY ./bin ./bin
RUN ./bin/setup-chrome.sh 'ubuntu-act-latest'
RUN ./bin/setup-lsof.sh 'ubuntu-act-latest'
# RUN ./bin/setup-chromedriver.sh 'ubuntu-act-latest'
# RUN ./bin/setup-env.sh 'ubuntu-act-latest'
