import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import datasource from "./utils";

const typeDefs = gql`
	type Wilder {
		id: ID
		name: String
		#upvotes
	}

	type Query {
		wilders: [Wilder]
	}
`;

const resolvers = {
	Query: {
		wilders: () => [],
	},
};

// server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: "bounded",
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({ embed: true }),
	],
});

// The `listen` method launches a web server.
server.listen(5000).then(
	async () => {
		console.log(`🚀  Server sarted `);

		try {
			await datasource.initialize();
			console.log("I'm connected!");
		} catch (err) {
			console.log("Dommage");
			console.error(err);
		}
	},
	(err) => console.error(err)
);
