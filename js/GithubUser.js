export class GithubUser {
  static search(username) {
      const endpoint = `https://api.github.com/users/${username}`

      return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers }) => ({
          login,
          name,
          public_repos,
          followers
      }))
  }
}

/*export class GithubUser {
  static async search(username) {
      const endpoint = `https://api.github.com/users/${username}`

      const data = await fetch(endpoint)
      const { login, name, public_repos, followers } = await data.json()
      return ({
          login,
          name,
          public_repos,
          followers
      })
  }
}*/