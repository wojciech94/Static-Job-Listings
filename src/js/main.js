const header = document.querySelector('.header')

//Filter
//  ---filter__group
//      ---filter__group__item
//          span.filter__group__item__text (get json)
//          button.filter__group__item__btn (x)
//  ---button.btn.filter__clear-btn (Clear)

let activeFilter = ['Frontend', 'Senior']
let test

const genFilter = () => {
	const filter = document.createElement('div')
	filter.classList.add('filter')
	document.body.appendChild(filter)
	const filterGroup = document.createElement('div')
	filterGroup.classList.add('filter__group')
	filter.appendChild(filterGroup)
	const clearBtn = document.createElement('button')
	clearBtn.classList.add('btn', 'filter__clear-btn')
	clearBtn.textContent = 'Clear'
	clearBtn.addEventListener('click', clearFilter)
	filter.appendChild(clearBtn)
	for (let i = 0; i < activeFilter.length; i++) {
		const filterGroupItem = document.createElement('div')
		filterGroupItem.classList.add('filter__group__item')
		const filterText = document.createElement('span')
		filterText.classList.add('filter__group__item__text')
		filterText.textContent = activeFilter[i]
		const filterBtn = document.createElement('button')
		filterBtn.classList.add('filter__group__item__btn')
		filterBtn.textContent = 'x'
		filterGroup.appendChild(filterGroupItem)
		filterGroupItem.append(filterText, filterBtn)
		filterBtn.addEventListener('click', updateFilter)
	}
}

const addFilterItem = e => {
	console.log(e.target)
	//add element to filter group based on e.target.textContent
}

const updateFilter = e => {
	let parentElement = e.target.parentElement
	let text = parentElement.querySelector('.filter__group__item__text')
	if (text != null) {
		for (let i = 0; i < activeFilter.length; i++) {
			if (text.textContent === activeFilter[i]) {
				activeFilter.splice(i, 1)
				break
			}
		}
	}
	parentElement.remove()
	if (activeFilter == null || activeFilter.length == 0) {
		document.querySelector('.filter').remove()
	}
}

const clearFilter = () => {
	activeFilter = []
	document.querySelector('.filter').remove()
}

document.addEventListener('DOMContentLoaded', genFilter)
