const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const wikiPath = '/wiki'

  const toNotesPath = node => {
    const { dir } = path.parse(node.parent.relativePath)
    return path.join(wikiPath, dir, node.parent.name)
  }

  const postTemplate = path.resolve('./src/templates/post-template.jsx')
  const pageTemplate = path.resolve('./src/templates/page-template.jsx')
  const weekNoteTemplate = path.resolve(
    './src/templates/week-note-template.jsx'
  )
  const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
  const categoryTemplate = path.resolve('./src/templates/category-template.jsx')

  const Note = require.resolve('./src/templates/note')
  const Topics = require.resolve('./src/templates/topics-template')

  const result = await graphql(`
    {
      allMdx(limit: 1000, filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                base
                relativePath
                sourceInstanceName
              }
            }
            fields {
              slug
            }
            frontmatter {
              tags
              layout
              category
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw new Error(`Could not query pages`, result.errors)
  }

  const { allMdx } = result.data

  const notes = allMdx.edges.filter(
    ({ node }) => node.parent.sourceInstanceName === 'wiki'
  )

  // Create notes pages
  notes.forEach(({ node }) => {
    createPage({
      path: toNotesPath(node),
      context: {
        ...node,
        topic: node.parent.name,
      },
      component: Note,
    })
  })

  const notesUrls = notes.map(({ node }) => toNotesPath(node))

  const groupedNotes = notes.reduce((acc, { node }) => {
    const { dir } = path.parse(node.parent.relativePath)

    if (!dir) {
      return acc
    }

    acc[dir] = acc[dir] || []
    acc[dir].push({
      pagePath: path.join(wikiPath, dir),
      url: toNotesPath(node),
      ...node,
    })

    return acc
  }, {})

  Object.entries(groupedNotes).map(([key, value]) => {
    const breadcrumbs = key.split(path.sep).reduce((acc, dir) => {
      return [
        ...acc,
        {
          name: dir,
          url: path.join(wikiPath, dir),
        },
      ]
    }, [])
    createPage({
      path: path.join(wikiPath, key),
      context: {
        breadcrumbs,
        urls: value.map(v => v.url),
      },
      component: Topics,
    })
  })

  createPage({
    path: wikiPath,
    context: {
      urls: notesUrls,
      groupedNotes,
    },
    component: Topics,
  })

  _.each(result.data.allMdx.edges, edge => {
    if (_.get(edge, 'node.frontmatter.layout') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(pageTemplate),
        context: { slug: edge.node.fields.slug },
      })
    } else if (_.get(edge, 'node.frontmatter.layout') === 'weeknotes') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(weekNoteTemplate),
        context: { slug: edge.node.fields.slug },
      })
    } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(postTemplate),
        context: { slug: edge.node.fields.slug },
      })

      let tags = []
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }

      tags = _.uniq(tags)
      _.each(tags, tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`
        createPage({
          path: tagPath,
          component: tagTemplate,
          context: { tag },
        })
      })

      let categories = []
      if (_.get(edge, 'node.frontmatter.category')) {
        categories = categories.concat(edge.node.frontmatter.category)
      }

      categories = _.uniq(categories)
      _.each(categories, category => {
        const categoryPath = `/categories/${_.kebabCase(category)}/`
        createPage({
          path: categoryPath,
          component: categoryTemplate,
          context: { category },
        })
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (node.internal.type === 'Mdx' && typeof node.slug === 'undefined') {
    const fileNode = getNode(node.parent)
    let slug = (fileNode && fileNode.fields && fileNode.fields.slug) || ''
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
