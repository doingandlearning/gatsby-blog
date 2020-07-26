- tags:: [[egghead]], [[course]]

# Desired results

## Goals

- Make clear decisions about when this solution would be appropriate and have the skills to implement it.

## Big ideas

- Most instances of headless CMS end up with heavily templated solutions. This doesn't have to be the only way.
- Statically generated sites are more secure, are cheap to host and scale very easily.
- Wordpress is a well-known and powerful CMS solution and allows content editors to confidently do their work.
- Creating flexible tools for content editors can free developers up to focus on other problems.
- Having a component driven editing experience, rather than a template driven one, can allow editors to be innovative even while the end experience is consistent and coherent.

## Essential questions

- What are the benefits of a Gatsby end product?
- What are the benefits of a Wordpress CMS solution?
- What clues would I look for to decide between a templated vs more flexible solution?

## Knowledge and skills

- Wordpress setup with ACF
  - High level using Local
  - Not too concerned at this point about VCS and portability
  - Using the Pro version of ACF ... maybe need to think about that?
- Gatsby component switcher
  - This is the key to making it all work - a mapping component that parses the page content and then pushes props to the relevant React components.
- PHP and JS
