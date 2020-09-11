let extractComputingID = (username)=>{
    if(username === null){
        return "";
    }
    let idRegex = /([A-z]{1,3}[0-9]([A-z]){1,3})/g;
    let id = username.match(idRegex)
    if(id !== null){
        return id[0]
    }
    return '';
}

let testStr = `null
Ahmed Abaza
Harry Li (jl9dbb)
Sabrina Baldassarre (sjb4sy)
null
Josh Gong (jmg2akg)
Kyle Hsu (kah3wq)
null
Adam Wojciak (ajw6byu)
Srikar Chittari (ssc7dvy)
Edward Lue (eyl4qaq)
null
null
Khoi Nguyen (hkn5zmd)
Nathan Hartung (nrh9bef)
Christopher Ricigliano (cmr4jw)
Justin Chen (jyc9fyf)`

// console.log(testStr)
// console.log(extractComputingID(testStr))

module.exports = {extractComputingID}