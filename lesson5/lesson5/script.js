function Chess() {
	let main = document.querySelector('.container');
	let row;
	let block;
  
	let blackFigs8 = ['Т', 'К', 'О', 'Ф', 'К', 'О', 'К', 'Т'];
	let blackFigs7 = ['П', 'П', 'П', 'П', 'П', 'П', 'П', 'П'];
	let whiteFigs2 = ['П', 'П', 'П', 'П', 'П', 'П', 'П', 'П'];
	let whiteFigs1 = ['Т', 'К', 'О', 'Ф', 'К', 'О', 'К', 'Т'];
/* 	
	 //шахматные фигуры
		let blackFigs8 = ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];
		let blackFigs7 = ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;'];
		let whiteFigs1 = ['&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'];
		let whiteFigs2 = ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;'];
*/


	for (let i = 0; i < 8; i++) {
		row = document.createElement('div');
		row.className = "row row" + [i];
		for (let j = 0; j < 8; j++) {
			block = document.createElement('div');
			block.className = "item item" + [i] + '-' + [j];
			main.appendChild(row);
			row.appendChild(block);
		}
	}



	for (let i = 0; i < blackFigs8.length; i++) {
		blackFigs8.forEach(function (item, i, blackFigs8) {

			for (let j = 0; j < blackFigs8.length; j++) {

				document.querySelector('.item0-' + j).innerHTML = (blackFigs8[j]);
			}
		});
	}
	for (let i = 0; i < blackFigs7.length; i++) {
		blackFigs7.forEach(function (item, i, blackFigs7) {
			for (let j = 0; j < blackFigs7.length; j++) {
				document.querySelector('.item1-' + j).innerHTML = (blackFigs7[j]);
			}
		});
	}
	for (let i = 0; i < whiteFigs2.length; i++) {
		whiteFigs2.forEach(function (item, i, whiteFigs2) {
			for (let j = 0; j < whiteFigs2.length; j++) {
				document.querySelector('.item6-' + j).innerHTML = (whiteFigs2[j]);

			}
		});
	}
	for (let i = 0; i < whiteFigs1.length; i++) {

		whiteFigs1.forEach(function (item, i, whiteFigs1) {
			for (let j = 0; j < whiteFigs1.length; j++) {
			document.querySelector('.item7-' + j).innerHTML = (whiteFigs1[j]);

			}
		});
	}
}
Chess();

function list() {
	let main = document.querySelector('.container');
	let list;
	let liItem;
	let Number = ['8', '7', '6', '5', '4', '3', '2', '1'];
	let Letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


	for (let i = 0; i < 2; i++) {
		list = document.createElement('ul');
		list.className = "list" + "-" + [i];
		for (let j = 0; j < 8; j++) {
			liItem = document.createElement('li');
			liItem.className = "itemLi" + [j];
			main.appendChild(list);
			list.appendChild(liItem);
		}
	}
	for (let i = 0; i < Number.length; i++) {
		Number.forEach(function (item, i, Number) {
			for (let j = 0; j < Number.length; j++) {
				document.querySelector('.list-0 .itemLi' + j).innerHTML = (Number[j]);

			}
		});
	}

	for (let i = 0; i < Letter.length; i++) {
		Letter.forEach(function (item, i, Letter) {
			for (let j = 0; j < Letter.length; j++) {
				document.querySelector('.list-1 .itemLi' + j).innerHTML = (Letter[j]);

			}
		});
	}

}
list();
