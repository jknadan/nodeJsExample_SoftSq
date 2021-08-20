const express = require('express')
const app = express();
const database = require('./database.js')
const mysql = require('mysql')
const server = app.listen(3000,function(){
    console.log("Express server start port 3000!")
})

app.get('/test/:id', function(req,res){
    // res.send('Hello Word');
    // console.log('Hello World');
    // 한 페이지에 res.send는 두 개 이상 못보냄

    const id = req.params.id;
    /*
    /test/:id에서 id에 입력한 값을 요청의 params에 넣음 ex) /test/1 => id = 1 /test/jknadan => id = jknadan
    */
    console.log(id)

    const connection = mysql.createConnection(
        {
            host:'3.37.158.157',
            port:3306,
            user:'jknadan',
            password:'wnsrl159@',
            database:'jknadandb'
        }
    )

    connection.connect();
    if(connection){
        console.log("database connected!")
    }

    //2. userId 테이블 정보 가져오기 

    const getUserQuery = `SELECT name,id,PW,age,sex FROM User WHERE userId = '${id}';`
    // 위 id라는 params값을 저장한 변수값을 where절에 넣습니다.
    const getUserResult = connection.query(getUserQuery,function(err,rows,fields){
        if(err){
            res.send("회원정보를 조회할수 없습니다");
            console.log(err)
            /*
            [데이터 베이스까지 접속했는데 오류뜨면] : err 내용은 ER_NOT_SUPPORTED_AUTH_MODE
            사용권한 문제인데 
            use mysql -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '(비밀번호입력)';
            로 해결
            */

        }else{
            console.log(rows[0]);
            res.send(rows[0]);
        }

    });

    //connection.end();
    //회원 가입
    

})

app.post('/signup',function(req,res){
    /*
    get과 post는 다름. get은 조회의 의미가 강하고 post는 정보를 만드는 의미가 강함.
    회원가입과 같이 DB에 새로운 정보를 추가하는것은 post를 사요함.

    */

    const connection = mysql.createConnection(
        {
            host:'3.37.158.157',
            port:3306,
            user:'jknadan',
            password:'wnsrl159@',
            database:'jknadandb'
        }
    )

    connection.connect();

    const postUserQuery = `INSERT INTO User (name,id,pw,age,sex) VALUES ('주진모','jooj','1212','42','M');`
    const postUserResult = connection.query(postUserQuery,function(err,rows,fields){
        if(err){
            res.send("넌 회원가입 안돼 꺼져");
            console.log(err)
            /*
            [데이터 베이스까지 접속했는데 오류뜨면] : err 내용은 ER_NOT_SUPPORTED_AUTH_MODE
            사용권한 문제인데 
            use mysql -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '(비밀번호입력)';
            로 해결
            */
           /*
           [MYSQL에서 ER_BAD_FIELD_ERROR 오류뜨면] : 너가 쿼리를 잘못짜서 mysql에서 쿼리에 들어갈 데이터를 인식 못한거
           지금같은 상황은 주진모 와 같이 문자열 데이터에 ''를 안넣어서 인식을 못함.
           */

        }else{
            console.log(rows);
        }
})

/*
GET과 POST는 다른 메소드. 어느 한쪽에 속해있지 않도록 칼럼 잘 확인
*/

})