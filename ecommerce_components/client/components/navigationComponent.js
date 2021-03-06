Vue.component("nav-component", {
	template: `
    <nav div class="navbar navbar-expand-sm navbar-dark bg-primary">
      <a class="navbar-brand" href="#">
        <strong>Paluguada</strong>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Hot Deals
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown03" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">Categories</a>
            <div class="dropdown-menu" aria-labelledby="dropdown12">
              <a class="dropdown-item" href="#">Today's Deals</a>
              <a class="dropdown-item" href="#">Health</a>
              <a class="dropdown-item" href="#">Beauty & Personal Care</a>
              <a class="dropdown-item" href="#">Clothing, Shoes & Jewelry</a>
              <a class="dropdown-item" href="#">Toys, Kids & Baby</a>
              <a class="dropdown-item" href="#">Food & Grocery</a>
              <a class="dropdown-item" href="#">Sports & Outdoors</a>
              <a class="dropdown-item" href="#">Automotive & Industrial</a>
              <a class="dropdown-item" href="#">Electronics, Computers & Office</a>
              <a class="dropdown-item" href="#">Home, Garden, Pets & Tools</a>
              <a class="dropdown-item" href="#">Books</a>
              <a class="dropdown-item" href="#">Movies, Music & Games</a>
            </div>
          </li>
        </ul>

        <div class="col-lg-9-24 col-sm-8">
          <form action="#" class="py-1">
            <div class="input-group w-100">
              <select class="custom-select" name="category_name">
                <option value="">All</option>
                <option value="">Special</option>
                <option value="">Only best</option>
                <option value="">Latest</option>
              </select>
              <input v-model="searchedItem" type="text" class="form-control" style="width:50%;" placeholder="Search" >
              <div class="input-group-append">
                <button @click="search" class="btn btn-warning" type="submit">
                  <i class="fa fa-search"></i> Search
                </button>
              </div>
            </div>
          </form>
          <!-- search-wrap .end// -->
        </div>
        <!-- col.// -->

        <div v-show="!auth" class="col-auto">
          <div class="widget-header dropdown">
            <a href="#" data-toggle="dropdown" data-offset="20,10">
              <div class="icontext">
                <div class="icon-wrap">
                  <i class="text-warning icon-sm fa fa-user"></i>
                </div>
                <div class="text-wrap text-dark">
                  Sign in
                  <i class="fa fa-caret-down"></i>
                </div>
              </div>
            </a>
            <div class="dropdown-menu">
              <form class="px-4 py-3">
                <div class="form-group">
                  <label>Email address</label>
                  <input v-model="email" type="email" class="form-control" placeholder="email@example.com">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input v-model="password" type="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" @click="login" class="btn btn-primary">Sign in</button>
              </form>
              
            </div>
            <!--  dropdown-menu .// -->
          </div>
          <!-- widget-header .// -->
        </div>
        <!-- col.// -->

        <div v-show="auth" class="text-wrap text-dark">
        <a href="#" style="color:black; text-decoration: none;" @click="isLogout"> Logout </a>
       
        </div>
        <div v-show="!auth" class="col-auto">
          <div class="widget-header dropdown">
            <a href="#" data-toggle="dropdown" data-offset="20,10">
              <div class="icontext">
                <div class="icon-wrap">
                  <i class="text-warning icon-sm fa fa-user"></i>
                </div>
                <div class="text-wrap text-dark">
                  Sign up
                  <i class="fa fa-caret-down"></i>
                </div>
              </div>
            </a>
            <div class="dropdown-menu">
              <form class="px-4 py-3">
              <div class="form-group">
              <label>Name</label>
              <input v-model="name" type="text" class="form-control" placeholder="maria">
            </div>
                <div class="form-group">
                  <label>Email address</label>
                  <input v-model="email" type="email" class="form-control" placeholder="email@example.com">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input v-model="password" type="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" @click="signup" class="btn btn-primary">Sign up</button>
              </form>
              
            </div>
            <!--  dropdown-menu .// -->
          </div>
          <!-- widget-header .// -->
        </div>

        <div class="col-auto">
          <a href="#" class="widget-header">
            <div class="icontext">
              <div class="icon-wrap">
                <i class="text-warning icon-sm  fa fa-heart"></i>
              </div>
              <div class="text-wrap text-dark">
                <span class="small round badge badge-secondary">0</span>
                <div>Favorites</div>
              </div>
            </div>
          </a>
        </div>
        <!-- col.// -->

        <div class="col-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#cart_view">
                <i class="text-warning fas fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
    `,

	data() {
		return {
      name:"",
			email: "",
			password: "",
      auth: true,
      searchedItem:"",
      foundItems:[]
		};
	},
	methods: {
    isLogout(){
      localStorage.removeItem('token')
      this.auth = false
    }
      ,
    signup(){
      axios({
        method: "POST",
        url: "http://localhost:3000/api/users/signup",
        data:{
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(res => {
        console.log(res)
            this.auth = true;
            this.token = res.data.token;
            let token = this.token;
            localStorage.setItem("token", token);
      })
      .catch(err => {
        console.log(err);
      });
    },
		login() {
			axios({
				method: "POST",
				url: "http://localhost:3000/api/users/signin",
				data: {
					email: this.email,
					password: this.password
				}
			})
				.then(res => {
					this.auth = true;
					let token = res.data.token;
					localStorage.setItem("token", token);
				
				})
				.catch(err => {
          console.log("ini dari errror", err)
				
				});
    },
    search(){
     axios({
        method: "GET",
        url: "http://localhost:3000/api/items",
        params:{
          by: 'name',
          value : this.searchedItem
        },
        headers:{
          token : localStorage.getItem('token')
        }
     })
     .then(res=>{
       this.foundItems.push(res.data.items) //an array
       console.log(this.foundItems)

     })
     .catch(err=>{
       console.log(err)
     })
    }
  },
  watch : {
    auth(){
      console.log(this.auth)
    }
  }
});
