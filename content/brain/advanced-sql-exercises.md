# Table of Contents

1.  [Setup](#orge387908)
2.  [01 - Import Data](#org3fbb3c7)
3.  [02 - Cast INT to String](#orgf15e805)
4.  [03 - Enum](#orgb6bf05d)
    1.  [1: You&rsquo;ve got this data to import - here are the files and there is the db structure](#orga69ce78)
    2.  [2: The user id is currently an int, the front end needs it as a string, construct the query for this.](#orgc1b04ef)
5.  [04 - Profile Queries](#org89c9394)
6.  [05 CTE](#orgb6f1870)
7.  [06 - Filter Data](#org48ceff7)
    1.  [First fiddle:](#orgabff8a3)
    2.  [Answer](#org21d3925)
    3.  [Brief attempt to play with CTEs for it](#org9c53dc1)
    4.  [Again - there&rsquo;s a bit of ambiguity with the next bit. Better if you gave an example product. We&rsquo;re doing more marketing on Product x - what&rsquo;s the demographic breakdown?](#org439eb13)
8.  [07 - Transactions](#orgca4f5c7)
9.  [Overall thoughts:](#org4c49313)

- **tags:** [[egghead]], [[SQL]]

<a id="orge387908"></a>

# Setup

Really clear setup - I&rsquo;d done the workshop before so I had to drop the tables but that was fine. :)

<a id="org3fbb3c7"></a>

# 01 - Import Data

I&rsquo;m confused - I understand the goal but this exercise is asking me to import data without a link to the data I&rsquo;m required to import<sup><a id="fnr.1" class="footref" href="#fn.1">1</a></sup>. That would be helpful here. I get that these were running alongside the lessons and I don&rsquo;t know how they&rsquo;ll be surfaced when done but for me landing in this repo this was a bit baffling.

- I clicked through to the linked lesson
- I clicked through to the code repo
- I see 3 csv files and I&rsquo;m not sure if I need to do all or just one of them.
- Flicking back to the exercise shows I need to import all three

- The columns in the CSV are labelled differently from the columns we defined in the setup. The original linked lesson doesn&rsquo;t deal with mapping incoming columns to current columns with different names. This is actually fine if you just call out the columns in the correct order as per the lesson.

🧠 To describe a table `\d+ <table_name>`

- The setup had us define the user_handle column as an integer but the data has the user_handle as a UUID. I dropped the users table, replaced int for uuid and Bob&rsquo;s your Uncle :)
- The purchases table has the same problem in setup. user_handle and sku should both be UUIDs

```sql
create table purchases (
  date date,
  user_handle uuid,
  sku uuid,
  quantity int
);
```

```sql
    copy purchases (date, user_handle, sku, quantity) from '/Users/kevin/code/egghead/sql-advanced/sql-advanced-purchases.csv' DELIMITER ',' CSV HEADER;
```

- I can&rsquo;t find the products CSV anywhere.

<a id="orgf15e805"></a>

# 02 - Cast INT to String

Hmm - this exercise could be clearer. Is there a specific context I need to cast the Int to string? The description [here](https://github.com/twclark0/sql-advanced/blob/master/03_casting-types/notes.md) is slightly more helpful but again doesn&rsquo;t seem to tell me what is required. I&rsquo;m not clear if the goal of these exercises is to be as generic as possible but this feels like a riddle rather than an exercise.

Anyway, I did:

```sql
select cast (user_handle as text) from users;
```

and

```sql
select user_handle::text from users;
```

Though this is casting a UUID to a string I&rsquo;m taking it :)

<a id="orgb6bf05d"></a>

# 03 - Enum

Okay - I understand this exercise :) Actually, this is really good - I like the presentation as an actual user problem - could all the exercises be cast in this light?

<a id="orga69ce78"></a>

## 1: You&rsquo;ve got this data to import - here are the files and there is the db structure

<a id="orgc1b04ef"></a>

## 2: The user id is currently an int, the front end needs it as a string, construct the query for this.

- create type role as enum (&rsquo;buyer&rsquo;, &rsquo;seller&rsquo;, &rsquo;admin&rsquo;);
- alter table users add column role role;
- \d+ users;

Nice! :)

<a id="org89c9394"></a>

# 04 - Profile Queries

Again, love the problem statement! <sup><a id="fnr.2" class="footref" href="#fn.2">2</a></sup>

```sh
=postgres=# explain analyze select * from users where age < 40;
                                             QUERY PLAN

---

 Seq Scan on users  (cost=0.00..15.12 rows=137 width=168) (actual time=0.013..0.031 rows=39 loops=1)
   Filter: (age < 40)
   Rows Removed by Filter: 62
 Planning Time: 0.051 ms
 Execution Time: 0.051 ms
(5 rows)

postgres=# explain analyze select * from users where age > 40;
                                            QUERY PLAN

---

 Seq Scan on users  (cost=0.00..3.26 rows=60 width=54) (actual time=0.012..0.030 rows=60 loops=1)
   Filter: (age > 40)
   Rows Removed by Filter: 41
 Planning Time: 0.242 ms
 Execution Time: 0.048 ms
(5 rows)=
```

<a id="orgb6f1870"></a>

# 05 CTE

🧠 postgres doesn&rsquo;t like &ldquo;&rdquo; only &rsquo;&rsquo;

```sql
select user_handle, sku,
(select avg(quantity) from Purchases
  where user_handle = p.user_handle and sku = p.sku
) from Purchases p
group by user_handle, sku;
```

Attempted refactor:

```sql
with average_purchases as (
  select user_handle, sku, avg(quantity) from purchases group by user_handle, sku
)
select * from average_purchases;
```

Is this better? It is probably reuseable but I don&rsquo;t know if it is what the exercise is asking for.

I&rsquo;m struggling to parse the second part of this exercise. I&rsquo;m going with:
On average how much does a user purchase of every product?

Two possible thoughts:

- Total of product sold/total of users who bought it
- Avg of product bought/total of user who bought it

I think the second on is what is possibly being asked because we are reusing the averages function but it feels like an average of an average and I&rsquo;m worried we&rsquo;re going to cause the next financial crisis :)

```sql
with average_purchases as (
  select user_handle, sku, avg(quantity) from purchases group by user_handle, sku
)
select sku, avg(avg) from average_purchases group by sku;
```

No idea if that&rsquo;s right but I&rsquo;m still not sure I understand the question 🙃

<a id="org48ceff7"></a>

# 06 - Filter Data

I can totally imagine a team asking for this :)

<a id="orgabff8a3"></a>

## First fiddle:

```sql
select purchases.user_handle, sum(purchases.quantity) as total from purchases group by user_handle having sum(purchases.quantity) > 100;
```

<a id="org21d3925"></a>

## Answer

```sql
select email, users.user_handle, age, sum(quantity) as total from users join purchases on (users.user_handle = purchases.user_handle) where age > 19 and age < 30 group by users.user_handle having sum(quantity) > 100;
```

<a id="org9c53dc1"></a>

## Brief attempt to play with CTEs for it

```sql
with over_100_purchases (
select user_handle, sum(quantity) as total from purchases group by user_handle having sum(quantity) > 100
)

select users.email, users.age, over_100_purchases.total FROM users, over_100_purchases where users.user_handle=over_100_purchases.user_handle;
```

<a id="org439eb13"></a>

Again - there&rsquo;s a bit of ambiguity with the next bit. Better if you gave an example product. We&rsquo;re doing more marketing on Product x - what&rsquo;s the demographic breakdown?

- Pick a product: 18302880 | Pepper - Pablano | \$5.28

- What is the average age and gender % for this product?

  ```sh
  postgres=# select email, users.user_handle, age, gender, sum(quantity) as total from users join purchases on (users.user_handle = purchases.user_handle) where sku=18302880 group by users.user_handle;
         email          | user_handle | age | gender | total
  ------------------------<del>-------------</del>-----<del>--------</del>--&#x2013;&#x2014;
  atanslief@berkeley.edu | 16 | 19 | Male | 12
  (1 row)
  ```

Just the one - give that guy a special offer :) Though that&rsquo;s a lot of peppers for 1 19 yo dude!

<a id="orgca4f5c7"></a>

# 07 - Transactions

The products table doesn&rsquo;t have a stock level quantity - which would be required for this exercise.

I can see how I&rsquo;d do this - something like this:

```sql
start transaction;
do $$
declare
    creditCard int := '12341234';
    productName text := 'Wine - Winzer Krems Gruner';
begin
    if ((select stock_level from product where product = productName) = 0) then rollback;
    end if;
end $$;
update users set credit_card = 12341234 WHERE user_handle = 1;
insert into purchases values (now(), 1,18302897,5);
commit;
```

<a id="org4c49313"></a>

# Overall thoughts:

- I did this workshop and course a while a go and it was great to revisit it. I think the tasks could use a bit more clarity and structure. I think there are interesting ways they could be presented and I&rsquo;d love to be able to help with that if there was room :)
- Some element of real world tasks is helpful (potentially) - not so much as to be patronising, but enough for the real need for this material to be obvious.

# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> Okay - I&rsquo;ve just found the **actual** data I needed to find in the repo exercise directory! Whoops! The challenge for me here was that I was in the context of the 01-exercise.md file and was going forward from there to find the data rather than going up to the parent directory. All of my imports are wrong because I&rsquo;m using different data but I&rsquo;m going to keep going :)

<sup><a id="fn.2" href="#fnr.2">2</a></sup> Okay! Now I need the actual data for these exercises :)

```

```
