# Table of Contents

1.  [Github repo: https://github.com/chenkie/orbit](#orga0997be)
2.  [Ryan:](#orgf167081)
3.  [Today:](#org79dd134)
4.  [Notes](#org2fd7cc2)
5.  [JSON Web Tokens](#org8eedb7c)
    1.  [What is the difference between btoa and hmacSHA256?](#orgd659ac6)
    2.  [What are the considerations for a serverless based environment?](#org762d9a1)
    3.  [[?]](#org83c5784)
6.  [Login and Signup](#orge7cd3fb)
    1.  [What happens after login/signup?](#orgffd1219)
    2.  [Can browser extensions read local storage?](#org38282b4)
    3.  [https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/](#org5e020d5)
7.  [Access Control for the UI](#org9e96d01)
8.  [Access Control for Front End Routes](#orgd8e0d8f)
9.  [Accessing Protected Server Resources](#org9aa42f4)
10. [Scoping Data to a User and Role](#orgb726845)
11. [Lazy Loading Protected Routes](#orga008f84)

- **tags:** [React](react.md), [Authentication](authentication.md), Security, Ryan Chenkie

<a id="orga0997be"></a>

# Github repo: <https://github.com/chenkie/orbit>

<a id="orgf167081"></a>

# Ryan:

- Used to work at Auth0
- Now a consultant

<a id="org79dd134"></a>

# Today:

- Learn how to secure a React app from the ground up
- Find out how to make it secure
- JWT and how to think about them

<a id="org2fd7cc2"></a>

# Notes

- ATLAS<sub>URL</sub> and JWT - sharing Ryan&rsquo;s but they are throwaway. Make sure they aren&rsquo;t in source control.
- Compare in Github to see the start and end of lesson diff
-

<a id="org8eedb7c"></a>

# [JSON Web Token](json_web_token.md)s

With JWT, you need to:

- refresh tokens
- you can&rsquo;t revoke tokens
- can be stolen and misused.

**Using a cookie/session authentication would fix this**

- [ ] <http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/>
- React App is a fundamentally insecure environment.
- <header><payload><signature>

<a id="orgd659ac6"></a>

## [?] What is the difference between btoa and hmacSHA256?

<a id="org762d9a1"></a>

## [?] What are the considerations for a serverless based environment?

**With a SSR, there are some things to be considered - it is blurring the lines between backend and frontend, so not always clear what is/is not secure.**

<a id="org83c5784"></a>

## [?]

- Should make the JWT urlsafe, even if it is only being posted through as a header file.

<a id="orge7cd3fb"></a>

# Login and Signup

- Username/Password

  - Not a great way to do authentication &#x2026; most people don&rsquo;t have super strong password.
  - Lots of people don&rsquo;t have a password manager

- Using an OAuth provider means that you don&rsquo;t have to do this
  Still password but not your responsibility

- Passwordless authentication
  Put in your email, you get a new token on that email

- TouchID
  Webautentication

<a id="orgffd1219"></a>

## What happens after login/signup?

- Set-cookie header
- That is then sent on every time.
- Where do you store the JWT?
  - local storage - this is the least secure. You could do a `localStorage.getItem('accessToken')` and then fetch them
  - HttpOnly cookie - this means it can&rsquo;t be read by JS
    - console.log(document.cookie)
    - The ones that are HttpOnly will not be read in this way - they only travel in HTTP requests
    - Are susceptible to cross site authentication issues?
      - A link to go to bank
      - Deposit money in an account
      -
  - Browser state
    - Most secure though hardest to implement
    - Need to be able to refresh
    - [ ] [Hasura GraphQL Engine Blog](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/) - JWT Guide

<a id="org38282b4"></a>

## [?] Can browser extensions read local storage?

- Make sure you hash your passwords
- Good to keep instances of your fetch for public/private calls - don&rsquo;t want to unnecessarily send your token elsewhere

- ReactSecurity.io

<a id="org5e020d5"></a>

## [ ] <https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/>

- On the front end, we have hints/clues that the user is authenticated. They aren&rsquo;t fail-safe but they are helpful.

<a id="org9e96d01"></a>

# Access Control for the UI

We need to show certain parts if the user is currently authenticated.

In a req/res roundtrip app - this is straightforward. As you request new pages, the server is responsible for putting together the HTML and can safely check whether the user is authenticated and has permissions.

With SPA, all that is powered lives in the browser. We don&rsquo;t know what the user is going to do with our code once it has been shipped.

Our front end apps can be hacked - there are things that we can do to make it harder but it is probably not impossible.

The data that powers the app needs to stay on the server - it is the only way it is safe.

We have clues to tell if a user is authenticated:

- token expiry time
- a boolean
- presence of a token

- We can use a Boolean in the AuthContext to communicate authentication and role (isAuth/isAdmin)
- We can use a key on our routes and only show links if the relevant role is present, setting up a &rsquo;role&rsquo; key or otherwise in the definition.

      {navItems.map((navItem, i) => {
              if (navItem.allowedRoles.some("admin")&& !auth.isAdmin()) {
                return "";
              }
              return (
                <NavItemContainer key={i}>
                  <NavItem navItem={navItem} />
                </NavItemContainer>
              );
            })}

<a id="orgd8e0d8f"></a>

# Access Control for Front End Routes

- There are routes that only authenticated users should see.
- We can redirect if the user fails our authentication/authorization checks
- Still not fully secure - the user can&rsquo;t get to the inventory route but the code that powers the route does get to their browser.

<a id="org9aa42f4"></a>

# Accessing Protected Server Resources

- The browser isn&rsquo;t capable of doing this. We need to use server level middleware.
- We send the JSON Web Token in the header or as part of a HttpOnly cookie.
- On the server, we can use middleware to check if this is authenticated.
- There is an express-jwt package that can be used for middleware
- I use the Auth0 helper function,

      export default auth0.requireAuthentication(async function billingInfo(req, res) {
        const { user } = await auth0.getSession(req);
        res.json({
          email: user.email,
          country: 'United States',
          paymentMethod: 'Paypal'
        });
      });

&#x2014;
This workshop ended up going longer than I expected, so I missed the last two sessions. Below is my summary of the notes but I&rsquo;ll come back and view again when the video is available.
&#x2014;

<a id="orgb726845"></a>

# Scoping Data to a User and Role

- We did this on the frontend with the key and filtering the links but that doesn&rsquo;t protect us if the data is already in the browser.

- We can use the JWT to easily query the data that belongs to specific users.

- The payload contains the \`sub\` which is often the user ID.

- We can trust the data which means we don&rsquo;t have to make a DB call to check on the validity - so we reduce the load on the db

- We have to make two checks, one for the signature verification and one for the role in the token payload. This will often be handled by middleware.

<a id="orga008f84"></a>

# Lazy Loading Protected Routes

- Once the code is in the browser, you have no control.

- We can lazy load components that are authenticated.

- This isn&rsquo;t possible with Next - without using getInitialProps I guess. We could check in there?
