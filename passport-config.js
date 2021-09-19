const LocalStrategy = require ('passport-local').Strategy //註冊passport的認證strategy
const bcrypt =require('bcrypt') 

function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async function(email, password, done) {
        	// userID
        const user = getUserByEmail(email) // return email 或者 null
        if (user == null){  // 如果有 就會直接 call 上面的 user 去抓 email 
            return done (null, false, {message : 'No use with email'}) // 沒有的話才會走下面這條 回傳錯誤訊息
        }// if 
           
        try {
            if (await bcrypt.compare(password, user.password)){// 和這個 funciton  上面傳進來的是一樣的東西
                return done(null, user) // 正確 就會把 password, user.password 回傳
            } // if 
            else {
                return done (null, false, {message:'Password incorrect'} )

            }// else 
        
        }// try 
         catch(e){
             return done(e) // 回傳錯誤

        }//catch


    } //authenticateUser
    
    passport.use(new LocalStrategy({usernameField:'email'},
    authenticateUser ))
    // 預設值 是username 不過 這邊弄成 email 所以也就讓它變成 email
    passport.serializeUser((user, done) => done(null, user.id))  // 從user資料中撈ID
    passport.deserializeUser((id, done) => {// 以ID去撈user資料
    return done(null, getUserById(id))
  })
}

module.exports = initialize // 也就是說 它們是一個特別的object，可以將 javascript裡任何型別的宣告，變成一個模組，供其他的應用程式或模組使用。