

import { signinWithGooglePoppUp,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = ()=>{

    const logGoogleUser = async ()=>{
        const {user} = await signinWithGooglePoppUp(); //user was destructured from the google auth details
      const userDocRef = await  createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1> This is the signIn page</h1>
            <button onClick={logGoogleUser} >SignIn with Google PoppUp</button>

        </div>
    )
}

export default SignIn