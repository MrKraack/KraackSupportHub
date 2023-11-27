

module.exports = async (req,res) => {

    //check if JWT joken is present
    let token = localStorage.getItem("token");

    if (token) {
        next()
        
    } else {
        //User is not authenticated
        next("/login")
        
    }

}