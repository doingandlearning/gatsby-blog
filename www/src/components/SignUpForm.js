import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Dialog, DialogContent, DialogOverlay } from '@reach/dialog'
import '@reach/dialog/styles.css'

const SignUp = () => {
  const [successful, setSuccessful] = React.useState(false)
  const [message, setMessage] = React.useState()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [showDialog, setShowDialog] = React.useState(false)
  const [error, setError] = React.useState(false)
  const close = () => setShowDialog(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    const listFields = {
      FNAME: name,
      PATH: window.location.pathname,
    }
    const result = await addToMailchimp(email, listFields)
    if (result.result === 'success') {
      setMessage(
        "Thanks for signing up. I've sent you a confirmation email to give you a chance to change your mind. :)"
      )
      setSuccessful(true)
      setShowDialog(true)
    }

    if (result.result === 'error') {
      setMessage(result.msg)
      setError(true)
    }
  }

  return (
    <div>
      <div className="text-center w-1/3">
        <Dialog isOpen={showDialog} onDismiss={close}>
          <DialogOverlay
            style={{ background: 'hsla(0, 100%, 100%, 0.9)' }}
            isOpen={showDialog}
            onDismiss={close}
          >
            <DialogContent
              style={{
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                width: '30vw',
              }}
            >
              <p>{message}</p>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </div>
      {!successful && (
        <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-1 text-center text-xl leading-9 font-extrabold text-gray-900">
              Sign up for my newsletter
            </h2>
            <p className="font-light text-center">
              I'll not overload your inbox!
            </p>
          </div>

          <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <div class="mt-1 rounded-md shadow-sm">
                    <label
                      for="name"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div class="mt-1 rounded-md shadow-sm">
                    <label
                      for="email"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

      {error && <div className="text-red-800 text-center">{message}</div>}
    </div>
  )
}

export default SignUp
