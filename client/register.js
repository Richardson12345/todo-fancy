new Vue({
    el: "#app",
    data: {
        username: "",
        password: "",
        email: "",
        wrong: false,
        success: false
    },
    methods: {
        register: function(){
           axios.post("http://localhost:3000/user/signup", {
               username : this.username,
               password: this.password,
               email: this.email
           })
           .then((result => {
               console.log(result.data)
               alert("succesfully registered, you will be redirected to the login page");
               window.location = "login.html"

           }))
           .catch((err => {
               console.log(err);
               this.wrong = true
           }))

        }
    }
})