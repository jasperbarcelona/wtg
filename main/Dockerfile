FROM python:2.7

ENV TZ 'Asia/Manila'
RUN echo $TZ > /etc/timezone && \
apt-get update && apt-get install -y tzdata && \
rm /etc/localtime && \
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
dpkg-reconfigure -f noninteractive tzdata && \
wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
tar vxf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
cp wkhtmltox/bin/wk* /usr/local/bin/ && \
apt-get clean

COPY . /usr/src/app/
WORKDIR /usr/src/app/
RUN pip install -r requirements.txt