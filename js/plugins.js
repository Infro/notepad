(()=>{
    var libs={
        "encryption": "libraries/crypto.js",
        "filesystem": "libraries/filesystem.js",
        "git": "libraries/git.js",
        "speechReco": "libraries/speechReco.js",
        "chatgpt": "libraries/chatgpt.js",
        "context": "libraries/context.js",
    }
    //load plugins depending upon strategy
    function defaultLoadStrategy(context) {
        //Ignores Context
    }
})