/**
 * 控制层（处理逻辑）
 * 后台商品处理
 */
const productDAO = require("../model/productDAO");
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const mement = require('moment')

module.exports = {
    //得到分类
    getType: async(ctx, next) =>{
        try{
            let type = await productDAO.getType();
            let typeList = [];
            for(let i=0; i<type.length; i++){
                typeList.push(type[i].typeName)
            }

            ctx.body = {"code":200,"message":"查询分类成功",data:{type:type,typeList:typeList}}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //查询某个管理员发布的商品
    getGoodsByManagerId: async(ctx,next)=>{
        try{
            let {managerId} = ctx.request.body
            let myPublish = await productDAO.getGoodsByMangerId(managerId);
            ctx.body = {"code":200,"message":"我的发布商品查询成功",data:myPublish}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //查询所有商品，未分类,包含发布者信息
    getGoodsList: async(ctx,next) =>{
        try{
            let goodsList = await productDAO.getAllGoodsManger();
            ctx.body = {"code":200,"message":"商品查询成功",data:goodsList}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //得到商品，通过类型
    getGoodsByType: async(ctx, next) =>{
        try{
            let {type} = ctx.request.body;
            let goodsList = await productDAO.getGoodsByType(type)
            ctx.body = {"code":200,"message":"分类商品查询成功",data:goodsList}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //增加类目
    addType: async(ctx, next) =>{
        try{
            let {typeName} = ctx.request.body;
            let isExist = await productDAO.getTypeExist(typeName);
            console.log(isExist[0].sum);
            if(isExist[0].sum == 0){
                await productDAO.addType(typeName);
                ctx.body = {"code":200,"message":"商品类目添加成功",data:[]}
            }else{
                ctx.body = {"code":900,"message":"改商品类目已存在，请勿重复添加",data:[]}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
            
    },

    //得到商品信息，详情,通过商品ID
    getProductDetails: async(ctx, next) =>{
        try{
            let {productId} = ctx.request.body
            let productDetails = await productDAO.getGoodsInfoByID(productId)
            ctx.body = {"code":200,"message":"获取商品详情成功",data:productDetails}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //增加库存
    addSpec: async(ctx, next) =>{
        try{
            let {productId,addNum} = ctx.request.body
            await productDAO.addSomeStock(addNum,productId)
            ctx.body = {"code":200,"message":"库存添加成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //减少库存
    deleteSpec: async(ctx, next) =>{
        try{
            let {productId,subNum} = ctx.request.body
            await productDAO.addSomeStock(subNum,productId)
            ctx.body = {"code":200,"message":"库存减少成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //增加商品
    addGoods: async(ctx, next) =>{
        // let form = new formidable.IncomingForm();
        // form.uploadDir = '../public/images';
        // form.multiples = true; // 设置多文件上传
        // let filename = "",src = "",fileDes = "";
        // form.parse(ctx.req,async(err,fields,files)=>{
        //     console.log(files);
        //     //根据files.filename.name 获取上传文件名，执行后续写入数据库的操作
        //     filename = files.filename.name;
        //     src =path.join(__dirname,files.filename.path);
        //     fileDes = path.basename(filename, path.extname(filename)) + moment(new Date()).format("YYYYMMDDHHMMSS") + path.extname(filename);
        //     fs.rename(src,path.join(path.parse(src).dir,fileDes));
        //     let str = `/productImage/${fileDes}`;
        //     console.log(str);
        //     console.log(fields);
        //     console.log("mydata:"+ fields);
        //     try{
        //         let {type,goodName,describe,picture,price,managerId,stock} = ctx.request.body
        //         await productDAO.addGoods(type,goodName,describe,str,price,managerId,stock)
        //         ctx.body = {"code":200,"message":"商品添加成功",data:[]}
        //     }catch(e){
        //         ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        //     }
        // })
        try{
            let {type,goodName,describe,picture,price,managerId,stock} = ctx.request.body
            await productDAO.addGoods(type,goodName,describe,picture,price,managerId,stock)
            ctx.body = {"code":200,"message":"商品添加成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //更新商品信息
    updateGoods: async(ctx, next) =>{
        try{
            let {productName,productDescribe,productPicture,unitCost,productStock,productId} = ctx.request.body
            await productDAO.updateGoodsInfo(productName,productDescribe,productPicture,unitCost,productStock,productId);
            ctx.body = {"code":200,"message":"商品修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //删除商品
    deleteGoods: async(ctx, next) =>{
        try{
            let {productId} = ctx.request.body
            await productDAO.setForeginKeyUnCheck();
            await productDAO.deleteGoodsById(productId)
            await productDAO.setForeginKeyCheck();
            ctx.body = {"code":200,"message":"商品修改成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    
}