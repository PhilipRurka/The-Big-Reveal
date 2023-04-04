# Goalden
This is a Goal tracking project designed to help people define and track their goals and their frequency.

Production Domain: [goalden.club](https://goalden.club)

## Environment Variables
If you haven't already, install [Vercel CLI](https://vercel.com/docs/cli).
```
npm i -g vercel
```

Once installed, you will need to authenticate yourself.
```
vercel login
```
Once complete you will be able to pull in the environment variables via vercel.
```
vercel env pull
```

## Node Version Manager
Version: v19.0.0

You can have your projects .nvmrc file automatically install or change. That way you won't have to make any adjustments to your node version when CD'ing into a project that contains a .nvmrc (Like this project for example).
All you must do is add this to your `bash_profile` or `.zshrc`.

```
# Changes node version depending on the project
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
```

## Package Scripts
There are descriptions of each scripts at the bottom of the `package.json` file. You can have a list of the available scripts show up on your terminal with their description by globally instaling and using [ntl](https://www.npmjs.com/package/ntl). I personally recomend it.

## Patterns and Structure
We are using the Container Pattern combined with other Patterns types.
Essentially, the folder structures are comprised of 3 major file types, `container`, `styled` and `jsx`.

For example, here is the folder structure for the Header.
```
scr/components/header

  ├── index.ts                    export { default } from './Header.container'
  ├── Header.component.tsx        Handles all of the logic
  ├── Header.tsx                  Takes in props and renders the JSX (No logic)
  ├── Header.styled.tsx           Where all of the Styled Component are stored and managed
  └── Header.type.ts              Used to store types (Only used if there are many)
  ```

## Comments
In this project, there are two types of comments, `//` and `/* */`.
They each have their utilities and meaning.

`//`: Temporary comment, meant to be removed at some point. In most cases, they should not survive the PR/MR stage.

`/* */`: These are permanant. Designed to provide information.

## Github Branch Structure
We are using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as our workflow.

If you are using a Git GUI likew me (GitKraken), you may want to look into how to perform the workflow on it. GitKraken has a Gitflow integration that makes it very easy to create, manage and delete branches. I assume other Git GUI also have such intergration.

## Trello
We have a [Trello board](https://trello.com/invite/b/lG5uOxCP/ATTId6e6003095ad6ae63068d53323cd21f244790C77/goalden), jump in, assign yourself to a task and walk it through to victory (Done & Live).

## Are we missing anything?
If you see anything we aree missing that could be of value to integrate, please let us know! Lets have a discusion around it!

If you see anything you don't like in terms of ... well any thing, bring it up. Who knows we may change it for the better of our project.

## Have fun!
The ultimate purpose of this project is to learn, share and have fun!