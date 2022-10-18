import "./App.css";
// Importe gql qui va nous servir à créer notre requête et le hook `useQuery qui va nous servir à l’exécuter:
import { useQuery, gql } from "@apollo/client";

// Crée maintenant la requête avec gql:
const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;
function App() {
  // le hook useQuery dans ton composant App pour exécuter la requête au montage du composant:
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      {data.launches.map((launch) => (
        <li>{launch.launch_date_utc}</li>
      ))}
    </div>
  );
}

export default App;
