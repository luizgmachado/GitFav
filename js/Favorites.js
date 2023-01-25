//classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
	constructor(root) {
		this.root = document.querySelector(root)
		this.load()
	}

	load() {
		this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
	}

	delete(user) {
		//Higher-order functions (map, filter, find, reduce)
		const filteredEntreies = this.entries
		 .filter(entry => entry.login !== user.login)

		this.entries = filteredEntreies
		this.update()
	}
}


// classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
	constructor(root) {
		super(root)

		this.tbody = this.root.querySelector('table tbody')

		this.update()
	}

	update() {
		this.removeAllTr(),

		this.entries.forEach( user => {
			const row = this.createRow()
			
			row.querySelector('.user img').src = `https://github.com/${user.login}.png`
			row.querySelector('.user img').alt = `Imagem de ${user.name}`
			row.querySelector('.user p').textContent = user.name
			row.querySelector('.user span').textContent = user.login
			row.querySelector('.user span').textContent = user.login
			row.querySelector('.repositories').textContent = user.public_repos
			row.querySelector('.followers').textContent = user.followers

			row.querySelector('.remove').onclick = () => {
				const isOK = confirm(`Tem certeza que deseja deletar ${user.login}?`)
				if(isOK) {
					this.delete(user)
				}
			}
		

			this.tbody.append(row)

		})
	}

	createRow() {
		const tr = document.createElement('tr')

		tr.innerHTML = `
        
        <td class="user">
                <img src="https://github.com/luizgmachado.png" alt="">
                <a href="https://github.com/luizgmachado" target="_blank">
                    <p></p>
                    <span></span>
                </a>
        </td>
        <td class="repositories"></td>
        <td class="followers"></td>
        <td>
            <button class="remove">
                <svg 
                    fill="#ff0000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/>
                    </svg>
            </button>
        </td>
        `
		return tr
	}

	removeAllTr() {
		this.tbody.querySelectorAll('tr')
			.forEach(function (tr) {
				tr.remove()
			})
	}
}   
