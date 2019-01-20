window.onload = fn_CreateChess();

function fn_CreateChess() {
	let arr_name = ['a', 'b', 'c', 'd', 'i', 'f', 'g', 'h'];
	let div_chess = document.querySelector('#chess');
	let table = document.createElement('table');
	for (let i=0; i<10; i++){
		let tr = document.createElement('tr');
		for (let j=0; j<10; j++){
			let td = document.createElement('td');
			if ((j === 0 || j === 9) && i>0) td.textContent = arr_name[i-1];
			if (i === 0 || i === 9) {
				if (j > 0 && j < 9) td.textContent = j;
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	div_chess.appendChild(table);
}