const router = require('koa-router')()
const userController = require('../controllers/user')
const userDAO = require('../model/userDAO')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

router.prefix('/users')


//登录接口
router.post("/doLogin",async(ctx,next)=>{
  await userController.login(ctx,next)
})

//根据登录的手机号查询用户Id
router.post("/getUserIdByUserTel",async(ctx,next)=>{
  await userController.getUserIdByUserTel(ctx,next)
})
//根据userID 查询用户信息
router.post("/getUserInfo",async(ctx,next)=>{
  await userController.getUserData(ctx,next)
})

//查看手机号是否被注册过
router.post("/getTel",async(ctx,next)=>{
  await userController.getTel(ctx,next)
})

//注册接口
router.post("/signup",async(ctx,next)=>{
  await userController.signup(ctx,next)
})

//设置用户信息
router.post("/updataUser",async(ctx,next)=>{
  await userController.updateUserData(ctx,next)
})

//修改密码
router.post("/setPwd",async(ctx,next)=>{
  await userController.updatePwd(ctx,next)
})

//设置用户头像
router.post("/setHeadPic",async(ctx,next)=>{
  await userController.updateHeadPic(ctx,next)
})

//查询我的订单
router.post("/getMyOrders",async(ctx,next)=>{
  await userController.getMyOrders(ctx,next)
})

//查询我的购物车
router.post("/getMyShopCarts",async(ctx,next)=>{
  await userController.getShopCarts(ctx,next)
})

//购物车单个商品+1
router.post("/addShopItemNums",async(ctx,next)=>{
  await userController.addShopItemNums(ctx,next)
})

//购物车单个商品-1
router.post("/subShopItemNums",async(ctx,next)=>{
  await userController.subShopItemNums(ctx,next)
})
//购物车中商品选中状态变更
router.post("/updateGoodsCheck",async(ctx,next)=>{
  await userController.updateGoodsCheck(ctx,next)
})

//删除购物车
router.post("/deleteShopItem",async(ctx,next)=>{
  await userController.deleteShopItem(ctx,next)
})

//查询某一用户的收获地址列表
router.post("/getAddressList",async(ctx,next)=>{
  await userController.getAllAddress(ctx,next)
})

//新增收获地址
router.post("/addUserAddress",async(ctx,next)=>{
  await userController.addUserAddress(ctx,next)
})

//修改某一收获地址
router.post("/updateAddress",async(ctx,next)=>{
  await userController.updateAddress(ctx,next)
})

//删除某一收获地址
router.post("/deleteAddress",async(ctx,next)=>{
  await userController.deleteAddress(ctx,next)
})

//上传文件
router.post("/uploadFile",async(ctx,next)=>{
  let {userId} = ctx.request.body
  let form = new formidable.IncomingForm();
  form.uploadDir = '../public/images'; //设置文件存放路径
  // form.multiples = true; //设置多文件上传；
  let filename = "";
  let src = "";
  let fileDes = "";
  form.parse(ctx.req,async(err,fields,files)=>{
    //根据files.filename.name 获取上传文件名，执行后续写入数据的操作
    filename = files.filename.name;
    src = path.join(__dirname,files.filename.path);
    fileDes = path.basename(filename,path.extname(filename)) + moment(new Date()).format("YYYYMMDDHHMMSS") + path.extname(filename);
    fs.rename(src,path.join(path.parse(src).dir,fileDes));
    console.log(fileDes);
    let str = `/headpics/${fileDes}`;
    console.log(str);
    console.log(fields);
    console.log("mydata:"+fields.mydata);
    try{
      setTimeout(()=>{},20)
      await userDAO.setUserHeadPic(str,userId)
      ctx.body = {"code":200,"message":"ok",data:[]};
    }catch(err){
      ctx.body = {"code":500,"message":"error"+err.message,data:[]}
    }
  })
})

module.exports = router
