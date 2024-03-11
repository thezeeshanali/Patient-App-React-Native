import { gql } from "@apollo/client";

const GET_DOCTORS = gql`
	query getUsers($input: UserFiltersInput!) {
		getUsers(input: $input) {
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
				roleName
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
			pages
		}
	}
`;

const GET_ROSTER = gql`
	query getRosters($input: ListRostersInput!) {
		getRosters(input: $input) {
			status
			message
			data {
				id
				careTeamId
				careTeamData {
					firstName
				}
				date
				shiftId
				shiftData {
					name
				}
				hasEmptySlot
				createdAt
				updatedAt
			}
		}
	}
`;

const GET_ROSTER_BY_ID = gql`
	query GetRosterByID($id: String!) {
		getRoster(id: $id) {
			status
			message
			data {
				roster {
					id
					careTeamId
					careTeamData {
						firstName
					}
					date
					shiftId
					shiftData {
						name
					}
					createdAt
					updatedAt
				}
				slots {
					startTime
					endTime
				}
			}
		}
	}
`;

export default {
	GET_DOCTORS,
	GET_ROSTER,
	GET_ROSTER_BY_ID,
};
