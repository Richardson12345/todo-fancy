
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
