---
title: 'Getting around in SQL'
date: '2020-02-10T14:23:36+0000'
layout: post
draft: false
path: '/posts/basic-sql-navigation/'
category: 'SQL'
tags:
  - 'MySQL'
  - 'PostgreSQL'
  - 'CLI'
description: 'Basic navigation in MySQL and PostgreSQL'
---

On Thursday evening, I'll be taking part in another [egghead.io](egghead.io) workshop. This time the workshop will be delivered by [Tyler Clark](https://tylerclark.life/) and will be on Advanced SQL ([there is still time to sign up here](https://ti.to/egghead-live-online-events/advanced-sql-with-tyler-clark-2020-02-13/discount/early)).

In preparation, I watched Tyler's first course on SQL that is hosted on egghead. It was really interesting and, though I knew most of it, I appreciated the clarity and focused nature of Tyler's delivery.

Almost all of my experience with SQL has been with MySQL. Tyler delivers his course using PostgreSQL which is almost entirely new to me. I realised that while a lot of the syntax is the same between the two implementations, there are some basic differences when it comes to navigation between databases and tables.

I put together a quick screencast to show these and I thought I'd share the screencast and a summary table.

`youtube:https://www.youtube.com/watch?v=dD_omqx1H_I`

| Intention               | MySQL                        | PostgreSQL                   |
| ----------------------- | ---------------------------- | ---------------------------- |
| List databases          | `SHOW DATABASES;`            | `\l`                         |
| Connect to database     | `USE <db_name>`              | `\c <db_name>`               |
| List tables in database | `SHOW TABLES`                | `\dt`                        |
| List rows in table      | `SELECT * FROM <table_name>` | `SELECT * FROM <table_name>` |
