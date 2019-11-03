import React, { useState } from 'react';
import {
  Box, Button, FormField, Heading, TextInput,
} from 'grommet';
import { set, useOnGet } from 'onget';

export default function Login({ history }) {
  const [error, seterror] = useState({});
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const session = useOnGet('fast://session');

  if (session) {
    history.replace('/');
  }

  function onSubmit(event) {
    event.preventDefault();
    if (email) {
      history.replace('/');
      set('fast://session', { email });
    } else {
      seterror({ email: 'required' });
    }
  }
  return (
    <form
      onSubmit={onSubmit}
    >
      <Box>
        <Heading>
          Login
        </Heading>
        <FormField
          label="Email"
          error={error.email}
        >
          <TextInput
            autoFocus
            value={email}
            onChange={event => setemail(event.target.value) + seterror({})}
          />
        </FormField>
        <FormField label="Password">
          <TextInput
            type="password"
            value={password}
            onChange={event => setpassword(event.target.value)}
          />
        </FormField>
        <Box
          margin={{ vertical: 'large' }}
          alignSelf="start"
        >
          <Button
            type="submit"
            label="Login"
            primary
            onClick={() => {}}
          />
        </Box>
      </Box>
    </form>
  );
}
