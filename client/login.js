window.fbAsyncInit = function() {
    FB.init({
        appId      : 1681133808648427,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.0'
    });
    
};
  
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response){
    if(response.status === "connected"){
        // console.log(response.authResponse.accessToken);
        let accessToken = response.authResponse.accessToken
        axios.post('http://localhost:3000/user/fbSignIn', {
            fbToken : accessToken
        })
        .then(result => {
            console.log(result.data)
            localStorage.setItem("item", result.data);
            location.replace("homepage.html")
        })
        .catch(err => {
            console.log(err)
        })
    
    }
}


function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}


let app = new Vue({
    el: "#app",
    data: {
        username: '',
        password: '',
        bdasds : "dasdsa",
        wrong: false
    },
    methods:{
        login: function(username,password){
            axios.post("http://localhost:3000/user/signin", {
                username : this.username,
                password: password
            })
            .then(result => {
                let token = result.data
                console.log(token)
                localStorage.setItem("item", token);
                window.location = "homepage.html"
            })
            .catch(err => {
                console.log(err)
                this.wrong = true;
            })

        }
    }
})
