let TokenHelper = function(subject){
    this.issuer  = 'Office koi'
    this.subject = subject
    this.audience = 'http://officekoi.com'
}

 TokenHelper.prototype.verifyOptions = function(){
     return {
        issuer:  this.issuer,
        subject:  this.subject,
        audience:  this.audience,
        expiresIn:  "10m",
        algorithm:  ["RS256"]
     }
 }


 TokenHelper.prototype.signOptions = function(){
    return {
       issuer:  this.issuer,
       subject:  this.subject,
       audience:  this.audience,
       expiresIn:  "10m",
       algorithm:  "RS256"
    }
}

TokenHelper.prototype.refreshTokensignOptions = function(){
    return {
       issuer:  this.issuer,
       subject:  this.subject,
       audience:  this.audience,
       expiresIn:  "30d",
       algorithm:  "RS256"
    }
}

TokenHelper.prototype.refreshTokenverifyOptions = function(){
    return {
       issuer:  this.issuer,
       subject:  this.subject,
       audience:  this.audience,
       expiresIn:  "30d",
       algorithm:  ["RS256"]
    }
}

module.exports = TokenHelper