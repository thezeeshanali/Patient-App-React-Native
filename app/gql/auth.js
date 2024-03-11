import { gql } from "@apollo/client";

const USER_LOGIN_MUTATION = gql`
	mutation login($input: LoginInput!) {
		login(input: $input) {
			message
			status
			data {
				firstName
				lastName
				email
				roleName
				primMobile
				bearerToken
			}
		}
	}
`;

const USER_REGISTER_MUTATION = gql`
	mutation signup($input: CreateUserInput!) {
		signup(input: $input) {
			message
			status
			data {
				id
				email
				firstName
				lastName
				primMobile
				secMobile
				documentType
				documentNo
				gender
				dob
				roleId
				status
				profilePicUrl
				longitude
				latitude
				address
				chronicDiseases
				allergies
				isPregnant
				mrn
				createdAt
			}
		}
	}
`;

const CONFIRM_OTP = gql`
	mutation confirmOtp($input: ConfirmOtpInput!) {
		confirmOtp(input: $input) {
			message
			status
		}
	}
`;

const UPDATE_USER_INFO = gql`
	mutation updateUser($input: UpdateUserInput!, $id: String!) {
		updateUser(input: $input, id: $id) {
			message
			status
			data {
				id
				email
				firstName
				lastName
				primMobile
				secMobile
				documentType
				documentNo
				gender
				dob
				roleId
				status
				profilePicUrl
				longitude
				latitude
				address
				chronicDiseases
				allergies
				isPregnant
				createdAt
				updatedAt
				category
				patientDuration
			}
		}
	}
`;

const GET_USER_INFO_BY_ID = gql`
	query GetUserById($id: String!) {
		getUser(id: $id) {
			status
			message
			data {
				id
				email
				firstName
				lastName
				primMobile
				secMobile
				documentType
				documentNo
				gender
				dob
				roleId
				status
				profilePicUrl
				longitude
				latitude
				address
				chronicDiseases
				allergies
				isPregnant
				mrn
				createdAt
				updatedAt
				category
				patientDuration
			}
		}
	}
`;

export default {
	USER_LOGIN_MUTATION,
	USER_REGISTER_MUTATION,
	CONFIRM_OTP,
	UPDATE_USER_INFO,
	GET_USER_INFO_BY_ID,
};
