const allocation = {};
const max = {};
const need = {};
const available = {};
let n = null;
let m = null;

function createTables {
	n = document.getElementByID("nJobs").value;
	m = document.getElementByID("mResources").value;
	const arr = document.createElement("table");
	const thead = document.createElement("thead");
	const headRow = document.createElement("tr");
	const processHead = document.createElement("th");
	processHead.setAttribute("rowspan", "2");
	processHead.innerHTML = "Process";
	headRow.appendChild(processHead);
	const headNames = {"Allocation", "Max", "Need"};
	const resourceHead = document.createElement("tr");
	headNames.forEach((name) => {
		const h = document.createElement("th");
		h.setAttribute("colspan", "${m}");
		h.setAttribute("id", name);
		h.innerHTML = name;
		headRow.appendChild(h);
		for (let j = 0; j < m; ++j) {
			const r = document.createElement("th");
			r.innerHTML = "R${j}";
			resourceHead.appendChild(r);
		}
	});
	thead.appendChild(headRow);
	thead.appendChild(resourceHead);
	arr.appendChild(thead);
	for (let i = 0; i < n; ++i) {
		const row = document.createElement("tr");
		const allocRow = {};
		const processName = document.createElement("td");
		processName.innerHTML = "P${i}";
		row.appendChild(processName);
		for (let j = 0; j < m; ++j) {
			const cell = document.createElement("td");
			const input = document.createElement("input");
			input.setAttribute("type", "number");
			allocRow.push(input);
			cell.appendChild(input);
			row.appendChild(td);
		}
		allocation.push(allocRow);
		const maxRow = {};
		for (let j = 0; j < m; ++j) {
			const cell = document.createElement("td");
			const input = document.createElement("input");
			input.setAttribute("type", "number");
			maxRow.push(input);
			cell.appendChild(input);
			row.appendChild(td);
		}
		max.push(maxRow);
		const needRow = {};
		for (let j = 0; j < m; ++j) {
			const cell = document.createElement("td");
			cell.classlist.toggle("hide");
			const input = document.createElement("input");
			input.setAttribute("type", "number");
			needRow.push(input);
			cell.appendChild(input);
			row.appendChild(td);
		}
		need.push(needRow);
		arr.appendChild(row);
		document.getElementsByTagName("body")[0].appendChild(arr);
		const availableArr = document.createElement("table");
		const availHead = document.createElement("thead");
		const availHeadRow = document.createElement("tr");
		const availHeadCell = document.createElement("th");
		availHeadCell.setAttribute("colspan", "${m}");
		availHeadCell.innerHTML = "Available";
		availHeadRow.appendChild(availHeadCell);
		const availResourceHead = {};
		const availRow = document.createElement("tr");
		for (let j = 0; j < m; ++j) {
			const cell = document.createElement("td");
			const input = document.createElement("input");
			input.setAttribute("type", "number");
			available.push(input);
			cell.appendChild(input);
			availRow.appendChild(td);
		}
		availHead.appendChild(availHeadRow);
		availHead.appendChild(availResourceHead);
		availableArr.appendChild(availHead);
		availableArr.appendChild(availRow);
		document.getElementsByTagName("body")[0].appendChild(availableArr);
	}
}
function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, delayTime);
  });
}
async function bankersAlgorithm() {
	for (let i = 0; i < n; ++i) {
		for (let j = 0; j < m; ++j) {
			max[i][j].classlist.toggle("hide");
			need[i][j].classlist.toggle("hide");
			need[i][j] = max[i][j] - allocation[i][j];
		}
	}
}