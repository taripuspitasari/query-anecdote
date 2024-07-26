import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {useQuery} from "@tanstack/react-query";
import {getAnecodtes} from "./requests";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecodtes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
