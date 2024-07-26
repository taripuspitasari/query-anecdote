import React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAnecdote, deleteAnecdote} from "../requests";

const Anecdote = ({anecdote, handleVote, handleDelete}) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
        <button onClick={() => handleDelete(anecdote)}>delete</button>
      </div>
    </div>
  );
};

const AnecdoteList = ({anecdotes}) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["anecdotes"]});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["anecdotes"]});
    },
  });

  const handleVote = anecdote => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1});
  };

  const handleDelete = anecdote => {
    deleteMutation.mutate(anecdote);
  };

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
