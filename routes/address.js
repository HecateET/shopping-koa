const router = require('koa-router')()
const addressController = require('../controllers/address')

router.prefix('/address')

//
router.post("/",async(ctx,next)=>{
    // await productController.login(ctx,next)
})


module.exports = router
