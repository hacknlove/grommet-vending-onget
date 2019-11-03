import React, { useState } from 'react';
import {
  Box, Button, FormField, Heading, Select, TextInput,
} from 'grommet';
import { useOnGet, set } from 'onget';

export default function Add({ history }) {
  const templates = useOnGet('/api/templates');

  const [name, setname] = useState('');
  const [template, settemplate] = useState('');
  const [search, setsearch] = useState('');
  const fileteredTemplates = search
    ? templates.filter(t => search.test(t.name))
    : templates;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        set('/api/services/new', { name, template });
        history.replace('/');
      }}
    >
      <Box>
        <Heading>
          New Service
        </Heading>
        <FormField label="Name">
          <TextInput
            autoFocus
            value={name}
            onChange={event => setname(event.target.value)}
          />
        </FormField>
        <FormField label="Template">
          <Select
            options={fileteredTemplates}
            value={template.name || ''}
            onSearch={(s) => {
              try {
                const exp = new RegExp(s, 'i');
                setsearch(exp);
              } catch (e) {
                setsearch(false);
              }
            }}
            onChange={event => settemplate(event.option)}
          >
            {option => (
              <Box pad="small">
                {option.name}
              </Box>
            )}
          </Select>
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
            label="Deploy"
            primary
            onClick={() => {}}
          />
          <Button
            label="Cancel"
            onClick={() => history.replace('/')}
          />
        </Box>
      </Box>
    </form>
  );
}
