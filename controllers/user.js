/**
 * 控制层（处理逻辑）
 * 前台用户数据处理
 */
const userDAO = require("../model/userDAO");
const shoppingCartDAO = require("../model/shoppingCartDAO")
const orderDAO = require("../model/orderDAO")
const addressDAO = require("../model/addressDAO")

module.exports = {
    //获取用户名接口
    getTel: async (ctx, next) =>{
        /**
         * 接口返回data 值：
         * 1：该手机号已被注册
         * 2: 该手机号未注册
         */
        try{
            let {userTel} = ctx.request.body;
            let isExist = await userDAO.getTelExist(userTel);
            console.log(isExist[0].sum);
            if(isExist[0].sum == 0){
                ctx.body = {"code": 200, "message": "该账号未被注册", data: 2}
            }else{
                ctx.body = {"code": 200, "message": "该账号已被注册", data: 1}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //根据手机号获取userId
    getUserIdByUserTel: async(ctx,next) => {
        try{
            let {userTel} = ctx.request.body;
            console.log("userTel:",userTel)
            let isExist = await userDAO.getTelExist(userTel);
            console.log("isExist:",isExist)
            if(isExist[0].sum == 0){
                ctx.body = {"code": 200, "message": "该账号没有被注册", data: []}
            }else{
                let userId = await userDAO.getUserIdByUserTel(userTel);
                console.log("userId:",JSON.stringify(userId));
                ctx.body = {"code": 200, "message": "查询成功", data: userId}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    
    //注册
    /**
     * 接口返回data 数据
     * 
     */
    signup: async (ctx, next) =>{
        /**
         * 注册接口返回data值
         * 1： 注册成功
         */
        try{
            let {userTel,password} = ctx.request.body;
            
            let isExist = await userDAO.getTelExist(userTel);
            if(isExist[0].sum != 0){
                ctx.body = {"code": 200, "message": "改账号已注册，请输入其他账号", data: 2}
            }else{
                console.log(userTel,password);
                await userDAO.insertUser(userTel,password);
                ctx.body = {"code": 200, "message": "注册成功", data: 1}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //登录
    login: async (ctx, next) =>{
        try{
            /**
             * 登录验证返回数据
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
            let {username,password} = ctx.request.body;
            let isExist = await userDAO.getTelExist(username);
            if(isExist[0].sum == 0){
                data.userUnExsit = true;
                ctx.body = {"code": 200, "message": "账号不存在请前往注册", data: 1}
            }else{
                let pwd = await userDAO.getPwdByUserTel(username);
                if(await pwd[0].loginPwd == password){
                    data.loginSuccess = true;
                    let loginUserInfo = await userDAO.getUserInfoByTel(username) 
                    console.log(loginUserInfo[0]);
                    ctx.body = {"code": 200, "message": "登录成功", data: 2}
                }else{
                    ctx.body = {"code": 200, "message": "密码错误", data: 3}
                }
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //获取用户基本信息
    getUserData: async (ctx, next) =>{
        try{
            let {userId} = ctx.request.body;
            let userInfo = await userDAO.getUserInfoByUserId(userId);
            console.log(userInfo);
            ctx.body = {"code":200,"message":"查询成功",data:userInfo[0]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //设置用户信息，修改
    updateUserData: async (ctx, next) =>{
        try{
            let {userId,userNickName,userSex} = ctx.request.body;
            await userDAO.setUserInfoByUserId(userNickName,userNickName,userSex,userId);
            ctx.body = {"code":200,"message":"用户信息设置成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //修改密码
    updatePwd: async (ctx, next) =>{
        try{
            let {userId,newPassword} = ctx.request.body;
            await userDAO.updatePwd(newPassword,userId)
            ctx.body = {"code":200,"message":"密码修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //修改用户头像
    updateHeadPic: async (ctx, next) =>{
        try{
            let {userId,userHeadPic} = ctx.request.body;
            let info =  await userDAO.setUserHeadPic(userHeadPic,userId)
            console.log(info);
            ctx.body = {"code":200,"message":"头像修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //查询我的购物车
    getShopCarts: async(ctx, next) => {
        try{
            let {userId}  = ctx.request.body;
            let myCartsList = await shoppingCartDAO.getUserShopCartInfo(userId);
            ctx.body = {"code":200,"message":"我的购物车列表查询成功：",data:myCartsList}
            console.log("我的购物车：",myCartsList)

        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //查询我的订单
    getMyOrders: async(ctx, next) => {
        try{
            let {userId} = ctx.request.body
            let myOrderList = await orderDAO.getAllOrderInfo(userId);
            ctx.body = {"code":200,"message":"我的订单：",data:myOrderList}
            console.log("我的购物车：",myOrderList)
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //清空某个用户的购物车
    deleteAllCartByUserId: async(ctx,next)=>{
        try{
            let {cartId} = ctx.request.body
            await shoppingCartDAO.deleteAllCartByUserId(cartId)
            ctx.body = {"code":200,"message":"购物车清空成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //删除购物车中的一件商品
    deleteShopItem: async(ctx,next)=>{
        try{
            let {cartId} = ctx.request.body
            await shoppingCartDAO.deleteCartByCartId(cartId)
            ctx.body = {"code":200,"message":"购物车商品删除成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //修改购物车中商品数量
    addShopItemNums:async(ctx,next)=>{
        try{
            let {cartId} = ctx.request.body;
            await shoppingCartDAO.plusCartNum(cartId);
            ctx.body = {"code":200,"message":"商品增加成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //减少购物车商品数量
    subShopItemNums:async(ctx,next)=>{
        try{
            let {cartId} = ctx.request.body;
            await shoppingCartDAO.subCartNum(cartId);
            ctx.body = {"code":200,"message":"商品减少成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //修改购物车中某个商品的选中状态
    updateGoodsCheck:async(ctx,next)=>{
        try{
            let {cartId} = ctx.request.body;
            await shoppingCartDAO.updateCheck(cartId);
            ctx.body = {"code":200,"message":"选中状态修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //查询所有的收货地址
    getAllAddress:async(ctx,next)=>{
        try{
            let {userId} = ctx.request.body
            let addressList = await addressDAO.getAllAddressByUserId(userId);
            ctx.body = {"code":200,"message":"用户新增收获地址成功",data:addressList}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //新增收获地址
    addUserAddress:async(ctx,next)=>{
        try{
            let {userId,userName,userPhone,userAddress,isDefult} = ctx.request.body;
            if(!isDefult){
                isDefult = -1;
            }
            await addressDAO.addAddressByUserId(userId,userName,userPhone,userAddress,isDefult);
            ctx.body = {"code":200,"message":"用户新增收获地址成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //修改某一收获地址
    updateAddress:async(ctx,next)=>{
        try{
            let {addressId,userName,userPhone,userAddress,isDefult} = ctx.request.body;
            if(!isDefult){
                isDefult = -1;
            }
            await addressDAO.updateAddress(userName,userPhone,userAddress,isDefult,addressId);
            ctx.body = {"code":200,"message":"用户修改收获地址成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //删除某一收获地址
    deleteAddress:async(ctx,next)=>{
        try{
            let {addressId} = ctx.request.body;
            await addressDAO.deleteAddressById(addressId);
            ctx.body = {"code":200,"message":"用户删除收获地址成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    }
}