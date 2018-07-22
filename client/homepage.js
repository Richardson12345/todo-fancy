Vue.component('update', {
    template : `<button v-on:click="wooof" class="btn btn-warning"> completed</button>`,
    methods : {
        wooof(){
            alert("you did it")
        }
    }
})


Vue.component('delete', {
    props: ["beras"],
    template : `<button v-on:click="action" class="btn btn-danger"> delete </button>`,
    methods : {
        action(){
            console.log(event)
        }
    }
})

Vue.component('create', {
    template : `
    <form >
    <label for="todo-input"> <h3>Todo : </h3> </label>
    <input id="todo-input"  type="text" v-model="todo" class="form-control form-control-lg shadow-lg p-3 mb-5 bg-white rounded" placeholder= "todo">
    <br>
    <label for="description-input"><h3>Description : </h3></label> 
    <input type="text" id="description-input" v-model="description" class="form-control form-control-lg shadow-lg p-3 mb-5 bg-white rounded" placeholder= "description">
    <br>
    <label for="due-input"><h3>Due Date : </h3></label>
    <input type="date" id="due-input" class="form-control form-control-lg shadow-lg p-3 mb-5 bg-white rounded" v-model="dueDate" >
    <br>
    <button v-on:click.prevent="addTodo"  class="btn btn-success">Add new todo</button>
    </form>
    `
    ,
    data: function(){
        return{
            todo: "",
            description: "",
            dueDate: ""
        }
    },
    methods : {
        addTodo(){
            console.log(this.todo, this.description, this.dueDate)
            let dueDate = new Date(...this.dueDate.split("-"));
            axios.post("http://localhost:3000/todo",{
                todo: this.todo,
                dueDate: dueDate,
                description: this.description
            },{headers: { token : localStorage.getItem("item")}})
            .then((response => {
                console.log(response.data)
                location.reload()
            }))
            .catch((err => {
                console.log(err)
            }))
        }
    }
})


Vue.component('todos', {
    props: ['completed', "todo" , "due", "description"],
    data: {
        function(){
            return{ nasi : "goreng"}
        }
    },
    template: '<div><h3><strong>todo: </strong>{{todo}} <strong>description:</strong> {{description}}  <strong>dueDate:</strong> {{due}} <strong>completed:</strong> {{completed}} </h3>  <update v-on:click="mcjibber"></update>  <delete v-bind:beras="this.nasi" ></delete> </div>'
  })

new Vue ({
    el: "#app",
    data: {
        title: "wellcome to hontoni subarashi todo",
        logout: "log-out",
        posts : []
    },
    methods: {
        showTodo(){
            axios.get("http://localhost:3000/todo", { headers: { token : localStorage.getItem("item")}})
            .then((response => {
                console.log(response);
                let arr = response.data
                for( let  z = 0; z < arr.length; z++){
                    this.posts.push(arr[z])
                }
            }))
            .catch((err => {
                console.log(err)
            }))
        },
        mcjibber(){
            localStorage.clear();
            window.location = "login.html";
        }
    },
    mounted(){
        this.showTodo()
    }

})