function pluginFunction1(){
  return pluginApi.pluginFunction1("1")
}
function renderUi(){
  
  const elem = React.createElement('div', null, 'Sandboxed Iframe remote Ui')
  const elem2 = React.createElement('button', {onClick:pluginFunction1}, 'plugin function 1')  
  console.log(elem)
  return [elem, elem2]
}

renderUi()
