---
title: 'Advanced SQL Workshop'
date: '2020-02-27T17:30:27+0000'
layout: post
draft: false
path: '/posts/advanced-sql/'
category: 'SQL'
tags:
  - 'Workshop'
  - 'SQL'
  - 'Tyler Clark'
  - 'egghead.io'
description: 'workshop on Advanced SQL'
---

A few weeks ago, I attended a workshop on Advanced SQL given by Tyler Clark. It was a really interesting evening. Here were some of the things I learnt.

> I do plan on returning to this and updating it - it might end up being in the wiki section when it comes online though.

## How to do bulk csv imports from the SQL prompt

Postgres uses the COPY and FROM keywords.

```sql
copy users(user_handle,first_name,last_name,email) FROM '/Users/kevin/code/sql-advanced/sql-advanced-users.csv' DELIMITER ',' CSV HEADER;
```

The order of parameters isn't important but certain params are only relevant and accepted with others (CSV and header); **If you’re having trouble with copy, check the options.**

- Boom! Lesson 2 - On conflict. - SELECT/UPDATE/INSERT to make sure identity of the person in the app is consistent. - On conflict - can do nothing or
- Lesson 3 - casting
- Lesson 4 - custom type - Create to avoid misspelling - enums are great - there are lots of other but 95% of use cases are enums. - you can create your own types - these persist across sessions - helpful to keep data consistent
- Lesson 5 - query planner explain analyse - explain - cost (cost=SETUP..TOTAL) - explain.depesz.com -> visualise what’s going on - Heavy seq scan might mean an index - Trial and error a few things and continue to profile - explain gives a guess - explain analyse - guess and runs the query
- Break
- This is a speedy, informative and fascinating workshop. Egghead work hard in their lessons to cut out the bits around the edges - the intros and other aspects which are less informative. Tyler has that in his teaching style - each activity and section is cut down and really clear and helpful.
- Lesson 6 CTEs - distinct on (column) vs distinct - return \* with CTE - WITH keyword - Don’t close with a semicolon - You can name it
- Lesson 7 filtering groups data - where filtering before - having filtering after - The having comes after the group
- Lesson 8 - **Defining variables with Do / Declare** - do \$\$ // starts a code block - declare // optional setup - handle uuid := ‘asdasdasasd’; - `<variable_name>` `<variable_type>` := `<variable_value>`; - handle uuid; - `<variable_name>` `<variable_type>`; // declaring undefined variable - Lots of stuff around conditionals
- He’s definitely guiding the eyes
- Lesson 9 - **Conditional Returns with case - when - then - else - end** - case when status is null then ‘member’ else status end - case when `<check>` then `<return>` else `<return>` end
- Lesson 10 - **Perform Multiple Steps in One with Transactions** - rollback is the default if an error happens - rollback, begin, save point
- Bonus - **Pattern matching** - like (case sensitive) - ilike (case insensitive) - %t (all the users that have something before a t) - t% - _y_ \_ \_
