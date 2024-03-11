import { gql } from "@apollo/client";

const GET_MED_RECORDS = gql`
	query getMedRecords($input: ListMedRecordsInput!) {
		getMedRecords(input: $input) {
			status
			message
			data {
				id
				appointmentId
				patientId
				isForDependent
				dependentId
				patientData {
					id
					firstName
					lastName
					primMobile
					documentNo
					gender
				}
				mrn
				providerName
				department
				guardianName
				isEmergency
				emergencyLevel
				maritalStatus
				vitalSigns {
					bp
					pulse
					temp
					weight
					height
					respRate
				}
				diagnose {
					duration
					chiefComplaints {
						code
						text
					}
					signs
					others
					diagnoseDetail
					principalCode1
					principalCode2
					principalCode3
					principalCode4
					diagnoseType
					lmp
				}
				medications {
					code
					genericName
					type
					quantity
				}
				procedures {
					code
					description
					type
					quantity
					cost
				}
				insurance {
					insCompanyName
					tpaName
					patientName
					documentNo
					sex
					policyHolder
					policyName
					expiryDate
					class
					approvalStatus
					approvalNumber
					approvalValidity
					comments
				}
				encounters {
					status
					lineOfManagement
					days
					addmissionDate
				}
				requireFollowUp
				followUpDates
				isReferred
				referData {
					providerId
					recommendations
				}
				attachments {
					name
					url
				}
				careTeamId
				careTeamData {
					firstName
					lastName
				}
				createdAt
			}
		}
	}
`;

export default {
	GET_MED_RECORDS,
};
