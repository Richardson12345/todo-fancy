Vue.component("modal",{
    props: ["name"],
    template: ` <div class="modal fade" id="myModal" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close justiify-content-center" 
                        data-dismiss="modal">update your todo</button>
                      </div>
                      <div class="modal-body">
                        <p>{{joke}}.</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>`,
    data: function(){
        return{
            joke : ""

        }
    },
    mounted(){
        this.getjoke()
    } ,
    methods: {
    getjoke : function(){
            axios.get('https://api.chucknorris.io/jokes/random')
            .then(result => {
                this.joke = result.data.value
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})


Vue.component('update', {
    props: ["beras"],
    template : `<span>
                <button 
                  v-on:click="wooof" class="btn btn-warning"> 
                  toggle
                </button>
                <button 
                v-on:click="update" 
                class="btn btn-default">
                  update
                </button>
                </span>`,
    methods : {
        wooof(){
            console.log(this.beras)
            axios.put("http://localhost:3000/todo",{
                todo: this.beras
            },{headers: {
                token: localStorage.getItem("item")
            }})
            .then(result => {
                console.log(result);
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        },
        update(){
            $("#myModal").modal()
        }
    }
})


Vue.component('delete', {
    props: ["beras"],
    template : `<button v-on:click="action" class="btn btn-danger"> delete </button>`,
    methods : {
        action(){
            axios.delete(`http://localhost:3000/todo/${this.beras}`,{
                headers: {
                token: localStorage.getItem("item")
                 }  
            })
            .then(result => {
                console.log(result);
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
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
    data:   function(){
            return{ nasi : "goreng"}
            }
    ,
    template: `<div><h3><strong>todo: </strong>{{todo}} <strong>description:</strong> {{description}}  <strong> 
    dueDate:</strong> {{due}} <strong>completed:</strong> {{completed}} </h3> 
     <update v-bind:beras="todo"></update>  <delete v-bind:beras=todo></delete> </div>`
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