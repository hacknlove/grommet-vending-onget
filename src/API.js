import {
  beforeSet,
  get,
  set,
  beforeRefresh,
} from 'onget';


beforeSet('/api/services/new', (context) => {
  context.preventSet = true;
  context.preventHooks = true;

  const services = get('/api/services');

  const now = (new Date()).toISOString();

  set('/api/services', [
    ...services,
    {
      ...context.value,
      id: `service-${now}`,
      created: now,
      status: 'ok',
    },
  ].sort((s1, s2) => (s1.name > s2.name ? 1 : -1)));
});

beforeSet('/api/services/:id', (context) => {
  const services = get('/api/services');
  if (context.value === undefined) {
    set('/api/services', services.filter(s => s.id !== context.params.id));
    return;
  }

  context.value.updated = (new Date()).toISOString();

  set('/api/services', services.map(s => (
    s.id === context.params.id
      ? context.value
      : s
  )));
});


beforeRefresh('/api/services/:id', (context) => {
  const services = get('/api/services');
  context.value = services.find(s => s.id === context.params.id) || { name: 'not found', template: {} };
});

beforeRefresh('/api/services/search/:q', (context) => {
  const services = get('/api/services');
  try {
    const exp = new RegExp(context.params.q, 'i');
    context.value = services.filter(s => exp.test(s.name));
  } catch (e) {
    context.value = [];
  }
});


function mocked() {
  // The initial state is logged
  set('fast://session', {
    email: 'me',
  });

  const services = [];
  const now = (new Date()).toISOString();
  const templates = [];

  for (let i = 1; i <= 47; i += 1) {
    services.push({
      created: now,
      status: (i % 7 ? 'ok' : 'critical'),
      id: `service-${i}`,
      name: `service ${i}`,
      template: {
        id: `template-${i}`,
        name: `template ${i}`,
      },
    });
    templates.push({ id: `template-${i}`, name: `template ${i}` });
  }

  // This example has no backend. We set values to mock the REST API responses
  set('/api/services', services);
  set('/api/templates', templates);
  // With this we prevent the calls to /api/... to perform a fetch
  beforeRefresh('/api/:any+', (context) => {
    context.preventRefresh = true;
  });
}
mocked();
