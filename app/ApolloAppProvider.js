import React from "react";
import { AppRegistry } from "react-native";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AppLoader from "./components/AppLoader";
import Routes from "./Context/Routes";
import { useGlobalContext } from "./Context/ContextProvider";

// Function to create Apollo Client with authentication header
const createApolloClient = (token) => {
	const httpLink = createHttpLink({
		uri: "https://61ee-142-154-41-212.ngrok-free.app/query",
	});
	console.log(token);

	const authLink = setContext((_, { headers }) => ({
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	}));

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
};

// Higher-order component to provide token as a prop
const withApolloProvider = (Component) => {
	return (props) => {
		// const { token } = useGlobalContext();
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI1MDM2N2QzNi0wOTVmLTQwYmItOWMyYS05NGIwOGM4NGMwZGMiLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIlByaW1Nb2JpbGUiOiIyMy1tYXJjaC0xOTkwIiwiRmlyc3ROYW1lIjoiTXIiLCJMYXN0TmFtZSI6IkFkbWluIiwiUm9sZU5hbWUiOiJhZG1pbiIsImV4cCI6MTcwNTU0NDc2MSwiaWF0IjoxNzAxOTQ0NzYxfQ.zM5PeB9jvC5w-NQzSVk1tLZfsq9avbu_2ImbKqEQU5Q";

		const client = createApolloClient(token);

		return (
			<ApolloProvider client={client}>
				<Component {...props} />
			</ApolloProvider>
		);
	};
};

// Wrapped ApolloAppProvider with the higher-order component
const ApolloAppProvider = withApolloProvider((props) => {
	return (
		<>
			<AppLoader />
			<Routes />
		</>
	);
});

export default ApolloAppProvider;
