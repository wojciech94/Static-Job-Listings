const header = document.querySelector('.header')
const container = document.querySelector('.container')
const filterButtons = document.querySelectorAll('.job-item__tools__element-btn')

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

let activeFilter = []
let activeCompanies = []
let companies = []

const getData = () => {
	fetch('data.json')
		.then(response => response.json())
		.then(data => {
			data.forEach(element => activeCompanies.push(new Company(element)))
			generateJobItems()
		})
}

const generateJobItems = () => {
	activeCompanies.forEach(company => {
		const jobItem = document.createElement('div')
		jobItem.dataset.id = company.id
		jobItem.classList.add('job-item')
		const jobLogo = document.createElement('img')
		jobLogo.classList.add('job-item__logo')
		jobLogo.setAttribute('src', company.logo.replace('/images', '/src/img'))
		jobLogo.setAttribute('alt', company.company)
		const header = createJobHeader(company)
		const jobRole = document.createElement('div')
		const roleSpan = document.createElement('span')
		jobRole.appendChild(roleSpan)
		jobRole.classList.add('job-item__role')
		roleSpan.classList.add('job-item__role__span')
		roleSpan.textContent = company.position
		const jobDetails = createJobDetails(company)
		const jobTools = createJobTools(company)
		jobItem.append(jobLogo, header, jobRole, jobDetails, jobTools)
		container.append(jobItem)
	})
}

//Create elements
function createJobHeader(company) {
	const itemHeader = document.createElement('div')
	itemHeader.classList.add('job-item__header')
	const headerCompany = document.createElement('div')
	headerCompany.classList.add('job-item__header__company')
	const companyText = document.createElement('span')
	companyText.textContent = company.company
	headerCompany.appendChild(companyText)
	itemHeader.appendChild(headerCompany)
	if (company.new == true || company.featured == true) {
		const preferencesGroup = document.createElement('div')
		preferencesGroup.classList.add('job-item__header__preference')
		if (company.new == true) {
			const preferenceNew = document.createElement('div')
			preferenceNew.classList.add('job-item__header__preference--default', 'job-item__header__preference--new')
			const newSpan = document.createElement('span')
			newSpan.textContent = 'NEW!'
			preferenceNew.appendChild(newSpan)
			preferencesGroup.appendChild(preferenceNew)
		}
		if (company.featured == true) {
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
		itemHeader.append(preferencesGroup)
	}
	return itemHeader
}

function createJobDetails(company) {
	const detailsBox = document.createElement('div')
	detailsBox.classList.add('job-item__details')
	const createdDetails = document.createElement('span')
	createdDetails.classList.add('job-item__details__element', 'job-item__details--create-time')
	createdDetails.textContent = company.postedAt
	const contractDetails = document.createElement('span')
	contractDetails.classList.add('job-item__details__element', 'job-item__details--contract')
	contractDetails.textContent = company.contract
	const locationDetails = document.createElement('span')
	locationDetails.classList.add('job-item__details__element', 'job-item__details--location')
	locationDetails.textContent = company.location
	detailsBox.append(createdDetails, contractDetails, locationDetails)
	return detailsBox
}

function createJobTools(company) {
	const toolsBox = document.createElement('div')
	toolsBox.classList.add('job-item__tools')
	const roleElement = createJobElement(company.role)
	const levelElement = createJobElement(company.level)
	toolsBox.append(roleElement, levelElement)
	company.languages.forEach(language => {
		const langElement = createJobElement(language)
		toolsBox.appendChild(langElement)
	})
	company.tools.forEach(tool => {
		const toolElement = createJobElement(tool)
		toolsBox.appendChild(toolElement)
	})
	return toolsBox
}

function createJobElement(text) {
	const toolsElement = document.createElement('div')
	toolsElement.classList.add('job-item__tools__element')
	const elementButton = document.createElement('button')
	elementButton.classList.add('btn', 'job-item__tools__element-btn')
	elementButton.textContent = text
	elementButton.addEventListener('click', addFilter)
	toolsElement.appendChild(elementButton)
	return toolsElement
}

//Filter functions
const genFilter = () => {
	const filter = document.createElement('div')
	filter.classList.add('filter', 'filter--disabled')
	filter.id = 'filter'
	document.body.appendChild(filter)
	const filterGroup = document.createElement('div')
	filterGroup.classList.add('filter__group')
	filter.appendChild(filterGroup)
	const clearBtn = document.createElement('button')
	clearBtn.classList.add('btn', 'filter__clear-btn')
	clearBtn.textContent = 'Clear'
	clearBtn.addEventListener('click', clearFilter)
	filter.appendChild(clearBtn)
	const beforeElement = document.querySelector('.attribution')
	document.body.insertBefore(filter, beforeElement)
}

function createFilterItem(text) {
	const filterGroup = document.querySelector('.filter__group')
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
		filterBtn.addEventListener('click', removeFilter)
	}
}

const removeFilter = e => {
	let parentElement = e.target.parentElement
	let text = parentElement.querySelector('.filter__group__item__text')
	if (text != null) {
		for (let i = 0; i < activeFilter.length; i++) {
			if (text.textContent === activeFilter[i]) {
				activeFilter.splice(i, 1)
				updateRemoveFilter()
				break
			}
		}
	}
	parentElement.remove()
	if (activeFilter == null || activeFilter.length == 0) {
		document.querySelector('.filter').classList.add('filter--disabled')
		container.style.marginTop = '0px'
	}
}

function updateRemoveFilter() {
	for (let i = companies.length - 1; i >= 0; i--) {
		let show = true
		const arrayToFilter = [companies[i].role, companies[i].level, ...companies[i].languages, ...companies[i].tools]
		for (const filter of activeFilter) {
			const available = el => el === filter
			if (arrayToFilter.some(available)) {
				continue
			}
			show = false
		}
		if (show) {
			const comp = companies.splice(i, 1)
			const element = document.querySelector(`.job-item--disabled[data-id="${comp[0].id}"]`)
			element.classList.remove('job-item--disabled')
			activeCompanies.push(comp[0])
		}
	}
}

function updateAddFilter(text) {
	for (let i = activeCompanies.length - 1; i >= 0; i--) {
		const role = activeCompanies[i].role
		const level = activeCompanies[i].level
		const languages = activeCompanies[i].languages
		const tools = activeCompanies[i].tools
		let next = false
		if (role === text) {
			continue
		}
		if (level === text) {
			continue
		}
		for (const language of languages) {
			if (language === text) {
				next = true
				break
			}
		}
		if (next) {
			continue
		}
		for (const tool of tools) {
			if (tool === text) {
				next = true
				break
			}
		}
		if (next) {
			continue
		}
		const comp = activeCompanies.splice(i, 1)
		const element = document.querySelector(`.job-item[data-id="${comp[0].id}"]`)
		element.classList.add('job-item--disabled')
		companies.push(comp[0])
	}
}

const clearFilter = () => {
	activeFilter = []
	const filterGroupItems = document.querySelectorAll('.filter__group__item')
	filterGroupItems.forEach(fg => {
		fg.remove()
	})
	document.querySelector('.filter').classList.add('filter--disabled')
	container.style.marginTop = '0px'
	const disabledCompanies = document.querySelectorAll('.job-item--disabled')
	for (const company of disabledCompanies) {
		company.classList.remove('job-item--disabled')
	}
	activeCompanies.push(...companies)
	companies = []
}

const addFilter = e => {
	const text = e.target.textContent
	if (!activeFilter.includes(text)) {
		if (activeFilter.length == 0) {
			document.querySelector('.filter').classList.remove('filter--disabled')
			container.style.marginTop = ''
		}
		activeFilter.push(text)
		createFilterItem(text)
		updateAddFilter(text)
	} else {
		console.log('Filter allready exsist')
	}
}

const setButtonsListeners = () => {
	filterButtons.forEach(btn => {
		btn.addEventListener('click', addFilter)
	})
}

//Initial listeners
document.addEventListener('DOMContentLoaded', genFilter)
document.addEventListener('DOMContentLoaded', setButtonsListeners)
document.addEventListener('DOMContentLoaded', getData)
