/* ------------- Imports -------------- */
import React, { Component } from 'react'

/* ------------- Form  Library Imports -------------- */
import { Form, Text } from '../../src/'

/* ---------------- Other Imports ------------------ */

import Data from './Data'
import Code from './Code'

/* ------------------ Form Stuff --------------------*/

const validate = username => !username || username.trim() === '' ? 'Username is a required field' : null

const asyncValidate = username => new Promise((resolve, reject) =>
  setTimeout(() => {
    // Simulate username check
    if (['joe', 'tanner', 'billy', 'bob'].includes(username)) {
      resolve({ error: 'That username is taken', success: null })
    }
    // Simulate request faulure
    if (username === 'reject') {
      reject('Failure while making call to validate username does not exist')
    }
    // Sumulate username success check
    resolve({
      success: 'Awesome! your username is good to go!'
    })
  }, 2000)
)

const FormContent = ({ formApi }) => (
  <div>
    <form onSubmit={formApi.submitForm} id="form6">
      <label htmlFor="username">Username</label>
      <Text
        field="username" id="username"
        validate={validate} asyncValidate={asyncValidate} />
      <button type="submit" className="mb-4 btn btn-primary">
        Submit
      </button>
    </form>
    <br />
    <Data title="Values" reference="formApi.values" data={formApi.values} />
    <Data title="Touched" reference="formApi.touched" data={formApi.touched} />
    <Data title="SyncErrors" reference="formApi.errors" data={formApi.errors} />
    <Data title="AsyncErrors" reference="formApi.asyncErrors" data={formApi.asyncErrors} />
    <Data title="AsyncSuccess" reference="formApi.asyncSuccesses" data={formApi.asyncSuccesses} />
    <Data
      title="AsyncValidations"
      reference="formApi.asyncValidations"
      data={formApi.asyncValidations}
    />
    <Data title="Validating" reference="formApi.validating" data={formApi.validating} />
    <Data
      title="ValidationFailures"
      reference="formApi.validationFailures"
      data={formApi.validationFailures}
    />
    <Data
      title="ValidationFailed"
      reference="formApi.validationFailed"
      data={formApi.validationFailed}
    />
    <Data title="Submission attempts" reference="formApi.submits" data={formApi.submits} />
    <Data title="Submitted" reference="formApi.submitted" data={formApi.submitted} />
  </div>
)

const AsynchronousValidationCode = () => {
  const code = `
  import { Form, Text } from 'react-form';

  const validate = username => !username || username.trim() === '' ? 'Username is a required field' : null

  const asyncValidate = username => new Promise((resolve, reject) =>
    setTimeout(() => {
      // Simulate username check
      if (['joe', 'tanner', 'billy', 'bob'].includes(username)) {
        resolve({ error: 'That username is taken', success: null })
      }
      // Simulate request faulure
      if (username === 'reject') {
        reject('Failure while making call to validate username does not exist')
      }
      // Sumulate username success check
      resolve({
        success: 'Awesome! your username is good to go!'
      })
    }, 2000)
  )

  <Form >
    {formApi => (
      <form onSubmit={formApi.submitForm} id="form6">
        <label htmlFor="username">Username</label>
        <Text
          field="username" id="username"
          validate={validate} asyncValidate={asyncValidate} />
        <button type="submit" className="mb-4 btn btn-primary">
          Submit
        </button>
      </form>
    )}
  </Form>

  `

  return (
    <div>
      <h5>Source Code:</h5>
      <Code type="html">{code}</Code>
    </div>
  )
}

class AsynchronousValidation extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <h2 className="mb-4" id="async-validation">
          Asynchronous Validation
        </h2>
        <p>Forms also support asynchronous validation!!! wooo!</p>
        <p>Play around with the username field and see how the form values react.</p>
        <p>
          <strong> Hint: </strong> the following usernames will fail validation after a 2 second
          lookup: {'"joe", "tanner", "billy", and "bob"'}. You can also type {'"reject"'} in the
          field to see how the form reacts when the asynchronous validation failed ( as if 500
          status code came back from your server ).
        </p>
        <p>
          Try typing {'"joe"'}, tabbing out of field, waiting two seconds, and seeing the result.
        </p>
        <p>Then type {'"foo"'}, tab out of field, wait two seconds, and seeing the result.</p>
        <p>Then type {'"reject"'}, tab out of field, wait two seconds, and seeing the result.</p>
        <p>Then type {'"foo"'}, tab out of field, wait two seconds, and seeing the result.</p>
        <p>
          Oh and also note that in this case we passed a form level validation function.
          You can just as easily pass async validator at the field level!
        </p>
        <Form component={FormContent} />
        <br />
        <AsynchronousValidationCode />
      </div>
    )
  }
}

export default AsynchronousValidation
