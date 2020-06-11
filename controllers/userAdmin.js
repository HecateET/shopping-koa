/**
 * 控制层（处理逻辑）
 * 后台用户数据处理
 */
const managerDAO = require("../model/managerDAO")
const userDAO = require("../model/userDAO");

module.exports = {
    //管理员登录
    login: async (ctx, next) =>{
        try{
            /**
             * manager登录验证返回数据
             * 接口返回 data值
             * 1： 用户不存在
             * 2： 登录成功
             * 3： 密码错误
             */
            let data = {
                userUnExsit: false,
                loginSuccess: false,
                passwordError: false,
            }
            let {managerName,password} = ctx.request.body;
            let isExist = await managerDAO.judgeExistByManagerName(managerName);
            if(isExist[0].sum != 1){
                data.userUnExsit = true;
                ctx.body = {"code": 200, "message": "账号不存在请联系管理员申请管理账号", data:{isSuccess:1,managerInfo:[]}}
            }else{
                let pwd = await managerDAO.getPwdByManagerName(managerName);
                if(await pwd[0].managerPwd == password){
                    data.loginSuccess = true;
                    let managerInfo = await managerDAO.getManagerInfoByName(managerName) 
                    console.log(managerInfo[0]);
                    ctx.body = {"code": 200, "message": "登录成功", data: {isSuccess:2,mangerInfo:managerInfo}}
                }else{
                    ctx.body = {"code": 200, "message": "密码错误", data: {isSuccess:3,managerInfo:[]}}
                }
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //查询管理员信息
    getMangerInfo: async (ctx,next) =>{
        try{
            let {managerId} = ctx.request.body
            let managerInfo = await managerDAO.getManagerInfoById(managerId)
            if(managerInfo){
                ctx.body = {"code":200,"message":"管理员讯息查询成功",data:managerInfo}
            }else{
                ctx.body = {"code":900,"message":"管理员查询信息失败",data:[]}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //管理员修改密码
    changePwd: async (ctx, next) =>{
        try{
            let {managerId,newPassword} = ctx.request.body;
            await managerDAO.setManagerPwd(newPassword,managerId)
            ctx.body = {"code":200,"message":"密码修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //查询所有用户
    getAllUser: async (ctx, next) =>{
        try{
            let userList = await userDAO.getAllUserList();
            ctx.body = {"code":200,"message":"用户列表查询成功",data:userList}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //删除用户
    deleteUser: async (ctx, next) =>{
        try{
            let {userId} = ctx.request.body
            await userDAO.deleteUser(userId)
            ctx.body = {"code":200,"message":"用户删除成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //查询指定用户
    searchUser: async (ctx,next) =>{
        try{
            let {key} = ctx.request.body
            let userInfo = await userDAO.searchUserByKey(key)
            console.log(key);
            ctx.body = {"code":200,"message":"用户讯息查询成功",data:userInfo}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    
    //注销用户
    deleteUser:async(ctx, next) =>{
        try{
            ctx.body = {"code":200,"message":"用户列表查询成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    }

}