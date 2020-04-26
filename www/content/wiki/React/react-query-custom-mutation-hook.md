I'm trying to work out how to create a [react-query](https://github.com/tannerlinsley/react-query) custom hook for mutations. I've moved all my getting logic, I just need to get my setting logic. The problem I'm having is that most of the examples are in a single file or are just using `useQuery` (maybe this isn't possible?). Here was what I was hoping to do. In my hooks file, I have:

```js
function useSetUserData() {
  const [mutateUserData] = useMutation(
    ({ rowid, fields }) => setAirtableFields({ rowid, fields }),
    {
      onMutate: fields => {
        const previousValue = queryCache.getQueryData([Auth0])

        queryCache.setQueryData([Auth0], old => ({
          ...old,
          items: [...old.items, ...fields],
        }))

        return previousValue
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        queryCache.setQueryData([Auth0], previousValue),
      // After success or failure, refetch the user query
      onSettled: () => queryCache.refetchQueries([Auth0]),
    }
  )
  return [mutateUserData]
}

export { useUserData, useSetUserData }
```

Then, where I want to use it I have:

```js
import { useUserData, useSetUserData } from "../../lib/users";
...
  const [changeUser] = useSetUserData();

...
  const updateUser = (fields_to_change) => {
    fields_to_change = { ...fields_to_change, Auth0: user.sub };
    changeUser({ fields: fields_to_change, rowid: user.rowid });
  };

```

This calls the `useMutation` hook but the parameters are not passed to the function. So, the initial problem is triggered at line 3 of my hooks file function. The `onError` is triggered and it complains that `old` is not defined. I've been using the example [here](https://github.com/tannerlinsley/react-query/blob/master/examples/optimistic-updates/pages/index.js) but seem to be a bit stumped.
