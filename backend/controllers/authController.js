const {User} = require('../model/model');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken')
const authController = {
    addUser: async (req,res)=>{
        try{
           const {name, email, password} = req.body;
           if(!name){
             return res.json({
                error: 'name is require'
            })
           }
           if(!password || password.length < 6){
            return res.json({
               error: 'password is require and should be at least 6 character long'
           })
          }
          const exist = await User.findOne({email});
          if(exist){
            return res.json({
               error: 'Email is taken already'
           })
          }
          const hash = await hashPassword(password);
        //   
        const user = await User.create({
            name,
            email,
            password:hash
        })
        const saveUser = await user.save();
          res.status(200).json(saveUser)
        }catch(error){

        }
    },
    getUser: async (req,res)=>{
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
              if(!user){
                return res.json({
                   error: 'No user found'
               })
            }
            const match = await comparePassword(password, user.password);
            if(match){
                jwt.sign({email: user.email, id: user._id, user: user.name}, process.env.JWT,{},(err, token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(user)
                })
            }
            if(!match){
                 res.json({
                    error: 'password do not match'
                })
            }
        }catch(error){
          console.log(error)
        }
    },
    getProfile: async (req, res) => {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, process.env.JWT, {}, (err, user) => {
                if (err) {
                    // Xử lý lỗi xác minh token
                    return res.status(401).json({ error: 'Unauthorized' });
                } else {
                    // Trả về thông tin user nếu token hợp lệ
                    res.json(user);
                }
            });
        } else {
            res.json(null);
        }
    }    
}
module.exports = authController;