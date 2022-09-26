const header = document.querySelector('.header')
const filterButtons = document.querySelectorAll('.job-item__tools__element-btn')

//Filter
//  ---filter__group
//      ---filter__group__item
//          span.filter__group__item__text (get json)
//          button.filter__group__item__btn (x)
//  ---button.btn.filter__clear-btn (Clear)

class Company {
	constructor(obj) {
		this.id = obj.id
		this.company = obj.company
		this.logo = obj.logo
		this.new = obj.new
		this.featured = obj.featured
		this.position = obj.position
		this.role = obj.role
		this.level = obj.level
		this.postedAt = obj.postedAt
		this.contract = obj.contract
		this.location = obj.location
		this.languages = obj.languages
		this.tools = obj.tools
	}
}

let activeFilter = ['Frontend', 'Senior']
let test
let companies = []

const getCompanies = () => {
	fetch('data.json')
		.then(response => response.json())
		.then(data => {
			data.forEach(element => companies.push(new Company(element)))
		})
}

const generateJobItem = () => {
	createHeaderJob(companies[0])
}

function createHeaderJob(company) {
	test = company
	if (company.new == true || company.featured == true) {
		const itemHeader = document.createElement('div')
		itemHeader.classList.add('job-item__header')
		const headerCompany = document.createElement('div')
		headerCompany.classList.add('job-item__header__company')
		const companyText = document.createElement('span')
		companyText.textContent = company.company
		const preferencesGroup = document.createElement('div')
		preferencesGroup.classList.add('job-item__header__preference')
		if (company.new == true) {
			console.log('new')
			const preferenceNew = document.createElement('div')
			preferenceNew.classList.add('job-item__header__preference--default', 'job-item__header__preference--new')
			const newSpan = document.createElement('span')
			newSpan.textContent = 'NEW!'
			preferenceNew.appendChild(newSpan)
			preferencesGroup.appendChild(preferenceNew)
		}
		if (company.featured == true) {
			console.log('featured')
			const preferenceFeatured = document.createElement('div')
			preferenceFeatured.classList.add(
				'job-item__header__preference--default',
				'job-item__header__preference--featured'
			)
			const featuredSpan = document.createElement('span')
			featuredSpan.textContent = 'FEATURED'
			preferenceFeatured.appendChild(featuredSpan)
			preferencesGroup.appendChild(preferenceFeatured)
		}
		headerCompany.appendChild(companyText)
		itemHeader.append(headerCompany, preferencesGroup)
		test = itemHeader
		return itemHeader
	}
}

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

function createFilterItem(text) {
	const filterGroup = document.querySelector('.filter__group')
	test = filterGroup
	if (filterGroup != null) {
		const filterGroupItem = document.createElement('div')
		filterGroupItem.classList.add('filter__group__item')
		const filterText = document.createElement('span')
		filterText.classList.add('filter__group__item__text')
		filterText.textContent = text
		const filterBtn = document.createElement('button')
		filterBtn.classList.add('filter__group__item__btn')
		filterBtn.textContent = 'x'
		filterGroup.appendChild(filterGroupItem)
		filterGroupItem.append(filterText, filterBtn)
		filterBtn.addEventListener('click', updateFilter)
	}
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
		document.querySelector('.filter').classList.add('filter--disabled')
	}
}

const clearFilter = () => {
	activeFilter = []
	const filterGroupItems = document.querySelectorAll('.filter__group__item')
	filterGroupItems.forEach(fg => {
		fg.remove()
	})
	document.querySelector('.filter').classList.add('filter--disabled')
}

const addFilter = e => {
	const text = e.target.textContent
	if (!activeFilter.includes(text)) {
		if (activeFilter.length == 0) {
			document.querySelector('.filter').classList.remove('filter--disabled')
		}
		activeFilter.push(text)
		createFilterItem(text)
	} else {
		console.log('Filter allready exsist')
	}
}

const setButtonsListeners = () => {
	filterButtons.forEach(btn => {
		btn.addEventListener('click', addFilter)
	})
}

document.addEventListener('DOMContentLoaded', genFilter)
document.addEventListener('DOMContentLoaded', setButtonsListeners)
document.addEventListener('DOMContentLoaded', getCompanies)
//document.addEventListener('DOMContentLoaded', generateJobItem)
