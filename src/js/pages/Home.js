import React from "react";
import { useQuery, gql } from "@apollo/client";

const LIST_CONTINENTS = gql`
    {
        continents {
            name
            code
            countries {
                name
                code
            }
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(LIST_CONTINENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log({ data });
    return (
        <>
            <h1>Home</h1>
            <ul>
                {data.continents.map(continent => (
                    <li key={continent.code}>
                        <h3>{continent.name}</h3>
                        <ul>
                            {continent.countries.map(({ name, code }) => (
                                <li key={code}>
                                    {name} ({code})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
