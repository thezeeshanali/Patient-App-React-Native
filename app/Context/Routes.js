import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./ContextProvider";
import * as SecureStore from "expo-secure-store";

import AuthNavigator from "../Auth/AuthNavigator";
import MainNavigator from "../Main/MainNavigator";
import { Text } from "react-native";

function Routes(props) {
	const { user, setUser } = useGlobalContext();
	const [loading, setLoading] = useState(true);
	const [initializing, setInitializing] = useState(true);

	async function retrieveUserSession() {
		try {
			const session = await SecureStore.getItemAsync("user_session");
			console.log("retreived session : ", session);
			if (session !== undefined || session !== null) {
				setUser(JSON.parse(session));
			}
		} catch (error) {
			// There was an error on the native side
		} finally {
			// Move setLoading and setInitializing outside the if statement
			setLoading(false);
			setInitializing(false);
		}
	}

	useEffect(() => {
		// check if the user is logged in or not
		retrieveUserSession();
	}, []);

	if (initializing) {
		return <Text>Loading...</Text>;
	}

	return <>{user ? <MainNavigator /> : <AuthNavigator />}</>;
	return <AuthNavigator />;
}

export default Routes;
