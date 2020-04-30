---
title: Protecting Credentials
date: '2019-02-13T23:46:37.121Z'
description: Keeping credentials out of the webroot
layout: post
featured: false
draft: false
path: '/posts/protecting-credentials'
category: 'DevOps'
tags:
  - 'Security'
  - 'DevOps'
  - 'Drupal'
  - 'Ansible'
author: Kevin
---

When working with any web application that requires a database for persistence, having access to the relevant credentials is vital.

Keeping those same credentials in plain-text in a code repository is insecure and having them accessible in the web-root can also pose security risks.

To get round this, I've used the following approach on the last two projects I've worked on which may be useful to you. This has been a Drupal 7 and a Drupal 8 project and the approach has worked identically with both.

At the moment, we provision the servers for our clients using Ansible and use those same scripts to provision our local VMs. We're currently investigating Docker for our development so this may well change.

Create a template file that is going to hold your credentials and abstract the `$database` array and any other sensitive code to this file.

`database.settings.php.j2`

Use Ansible's template command to copy this file to the relevant place:

```
  - name: Write the database settings file
    template:
      src: templates/database.settings.php.j2
      dest: {{configuration_path}}/database.settings.php
      owner: www-data
      group: www-data
      mode: 0440
```

Make sure all of the usernames, passwords and other sensitive data are abstracted to a vault file and encrypted.

Update your `settings.php` file to remove the credentials you have just abstracted and replace it with an `include_once` instruction.

```
/**
 * Include the db settings that are stored outside of the webroot
 */
if (file_exists('/your/path/here/database.settings.php')) {
  include_once '/your/path/here/database.settings.php';
}
```

Make sure you run the provisioning script to allow the file to be in place and then deploy your code as normal.

Now, the sensitive credentials are encrypted in your codebase and not available from your webroot.

Why not update your database password while you're at it!
