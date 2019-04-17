const h = React.createElement

let hdSubPath

function pluginFunction1(){
  return pluginApi.pluginFunction1(hdSubPath)
}
function pluginFunction2(){
  return pluginApi.pluginFunction2(hdSubPath, "test")
}


function renderUi(){
  let elems = []
  elems.push( h('div', null, 'Sandboxed Iframe remote Ui') )
  elems.push( h('input', {
	  key: "input1",
	  className: 'inputform',
	  placeholder: "hdSubPath",
	  onChange: e => {
	    hdSubPath = e.target.value
	  },
  }) )  
  elems.push(h('button', {onClick:pluginFunction1, key:"button1"}, 'plugin function 1') )
  elems.push(h('button', {onClick:pluginFunction2, key:"button2"}, 'plugin function 2') )
  return elems
}

renderUi()
