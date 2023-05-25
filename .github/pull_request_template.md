# Before and after checklist!
Delete this section before creating your PR. Use this as a checklist to make nothing is forgotten.

## Before
1. Make sure your Develop branch is up to date. If it isn't, pull in the changes and update your branch.
2. Remove any // comments, console.dir, console.table or debugger that shouldn't be there?
3. `yarn build` and resolve any warnings or errors
4. If there are any migration files in your PR, make sure you do the following
  a. Run `supabase db reset` to see if the migration file was created well.
  b. Run `yarn update-types` to generate any new database types.
Revisit adjusted files in VScode and check for any unused imports, function and variables.

## After
1. Make sure that the `develop` branch successfully deployed after your PR was merged in via Vercel (If you have access to the Vercel project).
2. Make sure the Git Actions succeffully migrated the changes onto the develop database.
3. Clean up any old branches by deleting them locally and remotely. If you want to keep a local version, you are welcome too.
---
&nbsp;

# Trello Task
**Primary task:** `Name of task` => issue `00`
</br>
**Seconday task:** `Name of task` => issue `00`

# Context
`Write a bit of context, if required`
