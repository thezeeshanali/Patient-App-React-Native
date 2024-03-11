import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext({});

function ContextProvider({ children }) {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [appLoader, setAppLoader] = useState(false);
	const [apptId, setApptId] = useState(null);
	const [appointmentData, setAppointmentData] = useState({
		purpose: "follow-up visit",
		apptType: "in-person",
		note: "urgent",
		patientId: "f38f6a21-8c21-4fb4-9e39-bdbe63ce0100",
		startTime: null,
		endTime: null,
		rosterId: null,
	});

	// Function to set user ID
	const setUserId = (userId) => {
		setUser({ ...user, id: userId });
	};

	return (
		<AppContext.Provider
			value={{
				appLoader,
				setAppLoader,
				user,
				setUser,
				token,
				setToken,
				appointmentData,
				setAppointmentData,
				apptId,
				setApptId,
				setUserId,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default ContextProvider;

//hook defined to import
const useGlobalContext = () => {
	return useContext(AppContext);
};

export { useGlobalContext };
