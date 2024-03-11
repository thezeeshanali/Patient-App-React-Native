import { gql } from "@apollo/client";

const ADD_APPOINTMENT = gql`
	mutation createAppointment($input: ApptInput!) {
		createAppointment(input: $input) {
			message
			status
			data {
				id
				purpose
				apptType
				startTime
				endTime
				note
				rosterId
				patientId
				patientData {
					firstName
					lastName
					primMobile
					documentNo
				}
				status
				careTeamId
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_ALL_APPOINTMENTS = gql`
	query getAppts($input: ListApptsInput!) {
		getAppts(input: $input) {
			status
			message
			data {
				id
				purpose
				apptType
				startTime
				endTime
				note
				rosterId
				patientId
				isForDependent
				dependentId
				patientData {
					id
					firstName
					lastName
					primMobile
					documentNo
				}
				status
				careTeamId
				careTeamData {
					firstName
					lastName
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export default {
	ADD_APPOINTMENT,
	GET_ALL_APPOINTMENTS,
};
