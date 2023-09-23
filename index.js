let inputBtn = document.getElementById("input-btn")

let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
deleteBtn.addEventListener("click", function() {
    console.log("double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

// 1. Create a variable, listItems, to hold all the HTML for the list items
// Assign it to an empty string to begin with
function render(leads){
let listItems = ""
for (let i = 0; i < leads.length; i++) {
    // 2. Add the item to the listItems variable instead of the ulEl.innerHTML
    listItems += `<li>
                    <a target = '_blank' href ='${leads[i]}'>
                    ${leads[i]}
                    </a> 
                </li>`
}
// 3. Render the listItems inside the unordered list using ulEl.innerHTML
ulEl.innerHTML = listItems
}
