/**
 * 管理员信息操作
 */
const DAO = require("../model/DAO")

class DB {
    //根据管理员登录名，判断是否存在
    judgeExistByManagerName(name){
        return DAO('SELECT COUNT(1) sum FROM manager WHERE managerName = ?',[name])
    }

    //添加管理员
    addManager(name,pwd,type){
        return DAO('INSERT INTO manager(managerName,managerPwd,managerType) VALUES(?,?,?);',[name,pwd,type])
    }

    //根据管理员名称查询managerId
    getManagerIdByName(name){
        return DAO('SELECT managerId FROM manager WHERE managerName = ?',[name])
    }

    //根据管理员名称查询管理员密码
    getPwdByManagerName(name){
        return DAO('SELECT managerPwd FROM manager WHERE managerName = ?',[name])
    }

    //根据管理员Id查询管理员密码
    getPwdByManagerId(managerId){
        return DAO('SELECT managerPwd FROM manager WHERE managerId = ?',[managerId])
    }

    //修改管理员密码
    setManagerPwd(password,managerId){
        return DAO('UPDATE manager SET managerPwd = ? WHERE managerId = ?',[password,managerId])
    }

    //根据管理员id 查询管理员信息
    getManagerInfoById(managerId){
        return DAO('SELECT managerId, managerName,managerPwd,managerType FROM manager WHERE managerId = ?',managerId)
    }

    //根据管理员id 查询管理员信息
    getManagerInfoByName(name){
        return DAO('SELECT managerId, managerName,managerPwd,managerType FROM manager WHERE managerName = ?',name)
    }


    //管理用户，查询所有用户
    getAllUser(){
        return DAO('SELECT userId, userNickName,userTel,userSex,registerTime FROM userinfo;')
    }

    //删除、注销用户
    deleteUser(userId){
        return DAO('DELETE FROM userinfo WHERE userId = ?',[userId])
    }
}

module.exports = new DB();