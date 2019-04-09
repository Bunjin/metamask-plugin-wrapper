const h = React.createElement

let formInput1

function pluginFunction1(){
  return pluginApi.pluginFunction1(formInput1)
}
function pluginFunction2(){
  return pluginApi.pluginFunction2("1'/2", "test")
}

function renderUi(){

  const elem = h('div', null, 'Sandboxed Iframe remote Ui')
  const elem2 = h('input', {
	  key: "input1",
	  className: 'inputform',
	  placeholder: "input1",
	  onChange: e => {
	    formInput1 = e.target.value
	  },
	})  
  const elem3 = React.createElement('button', {onClick:pluginFunction1, key:"button1"}, 'plugin function 1')
  const elem4 = React.createElement('button', {onClick:pluginFunction2, key:"button2"}, 'plugin function 2')    
  return [elem, elem2, elem3, elem4]
}

renderUi()
