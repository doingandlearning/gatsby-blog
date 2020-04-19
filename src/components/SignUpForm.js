import React from 'react'

const FORM_ID = '1330887'
const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      title={`Great, one last thing...`}
      body=
      {`I just sent you an email with the confirmation link. 
          **Please check your inbox!**`}
    </div>
  )
}

const SignUp = props => {
  const [submitted, setSubmitted] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [response, setResponse] = React.useState({})
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const values = {
      first_name: name,
      email_address: email,
    }
    setSubmitted(true)
    try {
      const response = await fetch(
        `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`,
        {
          method: 'post',
          body: JSON.stringify(values, null, 2),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      const responseJson = await response.json()
      setResponse(responseJson)
      setErrorMessage(null)
    } catch (error) {
      setSubmitted(false)
      setErrorMessage(error)
    }
  }

  const successful = response && response.status === 'success'

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      Current1
      {!successful && (
        <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-xl leading-9 font-extrabold text-gray-900">
              Sign up for my newsletter
            </h2>
          </div>

          <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <label
                    for="name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    First name
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      id="name"
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email address
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      type="email"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <span class="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign up
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* {submitted && !isSubmitting && (
        <PostSubmissionMessage response={response} />
      )} */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default SignUp
