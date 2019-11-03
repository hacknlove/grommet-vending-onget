import React, { useState } from 'react';
import {
  Box, Button, DropButton, FormField, Heading, Text, TextArea, TextInput,
} from 'grommet';
import { useOnGet, set } from 'onget';

export default function Edit({ history, match: { params: { id } } }) {
  const service = useOnGet(`/api/services/${id}`, {
    first: {
      name: 'Loading',
    },
  });
  const [name, setname] = useState('');
  const [notes, setnotes] = useState('');

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          set(`/api/services/${id}`, {
            ...service,
            name: name || service.name,
            notes: notes || service.notes,
          });
          history.replace(`/service/${id}`);
        }}
      >
        <Box>
          <Heading>
            {`Edit ${service.name}`}
          </Heading>
          <FormField label="Name">
            <TextInput
              autoFocus
              value={name || service.name}
              onChange={event => setname(event.target.value)}
            />
          </FormField>
          <FormField label="Notes" help="Markdown syntax">
            <TextArea
              value={notes || service.notes}
              onChange={event => setnotes(event.target.value)}
            />
          </FormField>
          <Box
            margin={{ vertical: 'large' }}
            direction="row-responsive"
            justify="between"
            align="center"
            gap="medium"
          >
            <Button
              type="submit"
              label="Update"
              primary
            />
            <Button
              label="Cancel"
              onClick={() => history.replace(`/service/${id}`)}
            />
          </Box>
        </Box>
      </form>
      <Box margin={{ vertical: 'medium' }} align="center">
        <DropButton
          label="Delete"
          color="status-critical"
          dropAlign={{ bottom: 'top', left: 'left' }}
          dropContent={(
            <Box pad="medium" gap="medium">
              <Text>
                Are you sure?
              </Text>
              <Button
                label="Yes, delete"
                onClick={() => {
                  set(`/api/services/${id}`);
                  history.replace('/');
                }}
              />
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}
