/**
 * 用户信息操作
 */
const DAO = require("../model/DAO")

class DB {
    //查询手机号中是否被注册过
    getTelExist(phoneNum){
        return DAO('SELECT COUNT(1) sum FROM userinfo WHERE userTel = ? ',[phoneNum])
    }
    //新增用户
    insertUser(userTel,loginPwd){
        return DAO('INSERT INTO userinfo(userTel,loginPwd,registerTime) VALUES(?,?,NOW())',[userTel,loginPwd]);
    }

    //查询用户信息 by userid
    getUserInfoByUserId(userId){
        return DAO('SELECT userId,loginName,loginPwd,userNickName,userHeadPic,userTel,userSex,registerTime FROM userinfo WHERE userId = ?',[userId])
    }

    //根据手机号查询用户信息
    getUserInfoByTel(userTel){
        return DAO('SELECT userId,loginName,loginPwd,userNickName,userHeadPic,userTel,userSex,registerTime FROM userinfo WHERE userTel = ?',[userTel])
    }

    //根据手机号查询用户密码
    getPwdByUserTel(userTel){
        return DAO('SELECT loginPwd FROM userinfo WHERE userTel = ?',[userTel])
    }
    
    //根据用户id查询用户密码
    getPwdByUserId(userId){
        return DAO('SELECT loginPwd FROM userinfo WHERE userId = ?',[userId])
    }

    //根据手机号查询用户Id
    getUserIdByUserTel(userTel){
        return DAO('SELECT userId FROM userinfo WHERE userTel = ?',[userTel])
    }
    
    //修改用户登录密码
    updatePwd(loginPwd,userId){
        return DAO('UPDATE userinfo SET loginPwd = ? WHERE userId = ?',[loginPwd,userId])
    }

    //设置用户信息
    setUserInfoByUserId(loginName,userNickName,userSex,userId){
        return DAO('UPDATE userinfo SET loginName =?, userNickName = ?,userSex = ? WHERE userId = ?',[loginName,userNickName,userSex,userId])
    }

    //设置用户头像
    setUserHeadPic(headPic,userId){
        return DAO('UPDATE userinfo SET userHeadPic = ? WHERE userId =?',[headPic,userId])
    }

    //获取用户头像
    getUserHeadPic(userId){
        return DAO('SELECT userHeadPic FROM userinfo WHERE userId = ?',[userId])
    }

    //查询所有用户信息
    getAllUserList(){
        return DAO("SELECT userId, userNickName,userHeadPic,userTel, userSex,registerTime FROM userinfo")
    }

    //删除用户
    deleteUser(userId){
        return DAO("DELETE FROM userinfo WHERE userId = ?",[userId])
    }

    //根据用户名称或 手机号查询用户信息
    searchUserByKey(key){
        return DAO('SELECT userId,userHeadPic,userNickName,userTel,userSex,registerTime FROM userinfo WHERE userNickName=? OR userTel=?',[key,key])
    }
}

module.exports = new DB();