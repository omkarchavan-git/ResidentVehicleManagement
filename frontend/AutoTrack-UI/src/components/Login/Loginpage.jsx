import "./Loginpage.css"

function Loginpage () {

    return(
        <>
        <div>
            <h3>Login page</h3>
            <div className="card">
                <h1>Login</h1>

                
                <div class="login-form-group">
                  <label for="password">User Name : </label>
                  <input type="text" class="form-control" name="username" id="" aria-describedby="helpId" placeholder="username" />
                 
                  <label for="password">Password : </label>
                  <input type="text" class="form-control" name="password" id="" aria-describedby="helpId" placeholder="password" />
                 
                 <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"> Submit </button>
                 <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"> Reset </button>
                </div>
            </div>
        </div>
        </>
    );
}
export default Loginpage
