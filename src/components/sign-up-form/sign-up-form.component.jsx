import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import "../../components/form-input/form-input.styles.scss";
import "../../components/sign-up-form/sign-up-form.styles.scss";

import Button from "../button/button.component";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const SignUp = () => {
	const defaultFormField = {
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [formFields, setFormFields] = useState(defaultFormField);
	const { displayName, email, password, confirmPassword } = formFields;
	console.log(formFields);
	const resetFormFields = () => {
		setFormFields(defaultFormField);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Password do not match");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("can not create user, email already in use");
			}
			console.log("user ceeation encounter an error", error);
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with email and password</span>

			<form onSubmit={handleSubmit}>
				{/* Passing an object into the input is more intuitive than just passing the */}
				<FormInput
					label='Display Name'
					required
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
				/>

				<FormInput
					label='Email'
					required
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
				/>

				<FormInput
					label='Password'
					required
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
				/>

				<FormInput
					label='Confirm Password'
					required
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUp;

// The following works as the above but with the object approach
/**
 * 
 * <FormInput
				label="Display Name"
				inputOptions =	{{
					required :true,
					type:'text',
					name:'displayName',
					value:displayName,
					onChange:handleChange


					}}
				/>
				
				
				<FormInput
				label="Email"
				inputOptions={{
					required:true,
					type:'email',
					name:'email',
					value:email,
					onChange:handleChange
					}}
				/>
			
				
				<FormInput
				label="Password"
			inputOptions=	{{	
				required:true,
					type:'password',
					name:'password',
					value:password,
					onChange:handleChange
					}}
				/>
				
				
				<FormInput
				label="Confirm Password"
				inputOptions={{
					required :true,
					type:'password',
					name:'confirmPassword',
					value:confirmPassword,
					onChange:handleChange}}
				/>
 */
