# init docker file for weidy-compententer
FROM ubuntu:20.04

WORKDIR /home/regov-test/weidy-compententer

RUN apt update \
    && apt-get install -y curl build-essential 

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \ 
    && apt-get install -y nodejs

RUN npm install --global yarn

RUN apt install -y libsodium-dev \
    && apt install -y libzmq3-dev

RUN apt install -y pkg-config

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

RUN apt install -y git

RUN git clone https://github.com/hyperledger/indy-sdk


WORKDIR /home/regov-test/weidy-compententer/indy-sdk/libindy 

COPY Cargo.toml .

RUN /root/.cargo/bin/cargo build --release

RUN mv target/release/libindy.so /usr/lib/libindy.so

RUN npm install

COPY . .

CMD ["npm", "run start-dev"]

EXPOSE 1111 2222