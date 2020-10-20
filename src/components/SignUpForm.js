import React from 'react'

<script src="https://f.convertkit.com/ckjs/ck.5.js"></script>

const PostSubmissionMessage = ({ response }) => {
  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <p>Success! Thanks for signing up!</p>
      <p>You can confirm by clicking the link in your email.</p>
    </div>
  )
}

const SignUp = () => {
  const [successful, setSuccessful] = React.useState(false)
  const [message, setMessage] = React.useState()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [response, setResponse] = React.useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()

    const fields = {
      email_address: email,
      first_name: name,
    }
    const resp = await fetch(
      `https://app.convertkit.com/forms/1697448/subscriptions`,
      {
        method: 'post',
        body: JSON.stringify(fields, null, 2),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    const result = await resp.json()
    setResponse(result)
    if (result.status === 'success') {
      setSuccessful(true)
    }

    if (result.status === 'error') {
      setMessage(result.msg)
      setError(true)
    }
  }

  return (
    <div>
      {!successful && (
        <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-1 text-center text-xl leading-9 font-extrabold text-gray-900">
              Sign up for new content and web highlights
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    for="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="name"
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange hover:bg-indigo-500 focus:outline-none focus:border-orange focus:shadow-outline-orange active:bg-orange transition duration-150 ease-in-out"
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
      {successful && <PostSubmissionMessage response={response} />}
      {error && <div className="text-red-800 text-center">{message}</div>}
    </div>
  )
}

export default SignUp
