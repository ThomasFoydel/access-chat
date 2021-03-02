const stateSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://example.com/example.json',
  type: 'object',
  title: 'The root schema',
  description: 'The root schema comprises the entire JSON document.',
  default: {},
  examples: [
    {
      auth: {
        loggedIn: true,
        token: '1hih29uh198yh98h298uj98uj190',
      },
      _persist: {},
    },
  ],
  required: ['auth', '_persist'],
  properties: {
    auth: {
      $id: '#/properties/auth',
      type: 'object',
      title: 'The auth schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [
        {
          loggedIn: true,
          token: '1hih29uh198yh98h298uj98uj190',
        },
      ],
      required: ['loggedIn', 'token'],
      properties: {
        loggedIn: {
          $id: '#/properties/auth/properties/loggedIn',
          type: 'boolean',
          title: 'The loggedIn schema',
          description: 'An explanation about the purpose of this instance.',
          default: false,
          examples: [true],
        },
        token: {
          $id: '#/properties/auth/properties/token',
          type: 'string',
          title: 'The token schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['1hih29uh198yh98h298uj98uj190'],
        },
      },
      additionalProperties: true,
    },
    _persist: {
      $id: '#/properties/_persist',
      type: 'object',
      title: 'The _persist schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [{}],
      required: [],
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};

export default stateSchema;
