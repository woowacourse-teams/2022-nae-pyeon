## local에서 간편하게 mysql 이중화 설정하기

### 도커 실행하기

```shell
# docker-compose.yml있는 디렉토리로 이동 후
docker-compose up -d
```

### source mysql 접속해서 복제 계정 생성
```shell
docker ps
docker exec -it {SOURCE_CONTAINER_ID} bash
mysql -uroot -p
#비밀번호는 password

# 복제 계정 준비
CREATE USER 'repl_user'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* To 'repl_user'@'%';
flush privileges;
```

### source 서버 host 알기
```shell
docker network ls
docker inspect {CONTAINER ID}
# docker_net-mysql
```

### replica mysql 접속하기
```shell
docker ps
docker exec -it {REPLICA_CONTAINER_ID} bash
mysql -uroot -p
#비밀번호는 password
```

### replica 도커 접속해서 복제 설정 입력하기
```shell
stop replica;

CHANGE REPLICATION SOURCE TO
SOURCE_HOST='소스서버 host주소',
SOURCE_PORT=3306,
SOURCE_USER='repl_user',
SOURCE_PASSWORD='password',
SOURCE_AUTO_POSITION=1,
GET_SOURCE_PUBLIC_KEY=1;

start replica;
```

### replica mysql 상태 확인하기
```
show replica status\G;
```

```shell
 Replica_IO_Running: No 상태이고 
 Last_IO_Error: Last_IO_Error: Fatal error: The slave I/O thread stops because master and slave have equal MySQL server ids; 
 these ids must be different for replication to work 이런 에러상태이면
 
 해당 레플리카 서버의 server_id가 소스서버와 같은 상태
 stop replica;
 
 SET GLOBAL server_id=2
 
 start replica;
```

### 이중화가 정상적으로 이루어 지는지 확인하는 법
```shell
#mysql 접속
#log상태 확인
show variables like 'general%';

#log 활성화
set global general_log = ON;

show variables like 'general%';

#해당 위치에 있는 로그 파일을 확인하면서 CUD, R로 잘 분기되는지 확인해볼 수 있음
```
